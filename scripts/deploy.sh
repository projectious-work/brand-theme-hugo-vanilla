#!/usr/bin/env bash
# Guarded local GitHub Pages publication. No GitHub Actions are used.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-gh-pages}"
REMOTE="${DEPLOY_REMOTE:-origin}"
EXPECTED_REMOTE="https://github.com/projectious-work/brand-theme-hugo-vanilla.git"
DRY_RUN=false
ALLOW_DIRTY=false
ALLOW_NON_MAIN=false
ALLOW_UNTAGGED=false

usage() {
  cat <<'EOF'
Usage: scripts/deploy.sh [options]

  --dry-run          Build, verify, and show the proposed Pages diff only
  --remote NAME      Git remote (default: origin)
  --branch NAME      Deployment branch (must be gh-pages)
  --allow-dirty      Permit tracked source changes (emergency override)
  --allow-non-main   Permit a source branch other than main
  --allow-untagged   Permit HEAD without an exact SemVer tag
EOF
}

while (($#)); do
  case "$1" in
    --dry-run) DRY_RUN=true ;;
    --remote) REMOTE="${2:?missing remote}"; shift ;;
    --branch) BRANCH="${2:?missing branch}"; shift ;;
    --allow-dirty) ALLOW_DIRTY=true ;;
    --allow-non-main) ALLOW_NON_MAIN=true ;;
    --allow-untagged) ALLOW_UNTAGGED=true ;;
    -h|--help) usage; exit 0 ;;
    *) echo "error: unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

cd "$ROOT_DIR"
SOURCE_SHA="$(git rev-parse HEAD)"
SOURCE_BRANCH="$(git symbolic-ref --quiet --short HEAD || true)"
REMOTE_URL="$(git remote get-url "$REMOTE" 2>/dev/null || true)"
SOURCE_TAG="$(git describe --tags --exact-match HEAD 2>/dev/null || true)"
BUILD_DIR="$ROOT_DIR/.deploy/build"
WORKTREE_DIR="$ROOT_DIR/.deploy/$BRANCH"

[[ "$BRANCH" == "gh-pages" ]] || {
  echo "error: deployment target must be gh-pages" >&2; exit 1;
}
[[ -n "$SOURCE_BRANCH" ]] || {
  echo "error: detached HEAD cannot be deployed" >&2; exit 1;
}
if [[ "$SOURCE_BRANCH" != "main" && "$ALLOW_NON_MAIN" != true ]]; then
  echo "error: deploy from main or pass --allow-non-main" >&2; exit 1
fi
if [[ -n "$(git status --porcelain --untracked-files=no)" && "$ALLOW_DIRTY" != true ]]; then
  echo "error: tracked source tree is dirty; commit changes first" >&2; exit 1
fi
[[ "$REMOTE_URL" == "$EXPECTED_REMOTE" ]] || {
  echo "error: remote '$REMOTE' is '$REMOTE_URL', expected '$EXPECTED_REMOTE'" >&2
  exit 1
}
if [[ ! "$SOURCE_TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ && "$ALLOW_UNTAGGED" != true ]]; then
  echo "error: HEAD must have an exact SemVer tag or use --allow-untagged" >&2
  exit 1
fi
case "$BUILD_DIR" in "$ROOT_DIR/.deploy/"*) ;; *) exit 1 ;; esac
case "$WORKTREE_DIR" in "$ROOT_DIR/.deploy/"*) ;; *) exit 1 ;; esac

echo "==> Source revision: $SOURCE_SHA"
echo "==> Source branch:   $SOURCE_BRANCH"
echo "==> Source tag:      ${SOURCE_TAG:-untagged override}"
echo "==> Destination:     $REMOTE_URL ($BRANCH)"
echo "==> Mode:            $([[ "$DRY_RUN" == true ]] && echo dry-run || echo publish)"

echo "==> Running release verification"
"$ROOT_DIR/scripts/verify.sh"

echo "==> Building site"
"$ROOT_DIR/scripts/build.sh" "$BUILD_DIR"
"$ROOT_DIR/scripts/check-product-outputs.py" "$BUILD_DIR"
ARTIFACT_SHA="$(find "$BUILD_DIR" -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1)"

echo "==> Preparing local worktree for '$BRANCH'"
mkdir -p "$ROOT_DIR/.deploy"
git fetch "$REMOTE" "$BRANCH" 2>/dev/null || true
if [[ ! -e "$WORKTREE_DIR/.git" ]]; then
  git worktree remove --force "$WORKTREE_DIR" 2>/dev/null || true
  rm -rf "$WORKTREE_DIR"
  if git show-ref --verify --quiet "refs/remotes/$REMOTE/$BRANCH"; then
    git worktree add -B "$BRANCH" "$WORKTREE_DIR" "$REMOTE/$BRANCH"
  else
    git worktree add --detach "$WORKTREE_DIR"
    git -C "$WORKTREE_DIR" checkout --orphan "$BRANCH"
    git -C "$WORKTREE_DIR" rm -rf . >/dev/null 2>&1 || true
  fi
fi

echo "==> Syncing generated output"
find "$WORKTREE_DIR" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
cp -a "$BUILD_DIR/." "$WORKTREE_DIR/"
touch "$WORKTREE_DIR/.nojekyll"

git -C "$WORKTREE_DIR" add -A
echo "==> Proposed branch changes"
git -C "$WORKTREE_DIR" diff --cached --stat
echo "==> Artifact SHA-256: $ARTIFACT_SHA"

if [[ "$DRY_RUN" == true ]]; then
  echo "==> Dry run complete; no commit or push performed"
  exit 0
fi

if git -C "$WORKTREE_DIR" diff --cached --quiet; then
  echo "==> Nothing changed, skipping commit/push"
else
  git -C "$WORKTREE_DIR" commit -m \
    "Deploy ${SOURCE_TAG:-$SOURCE_SHA} (artifact $ARTIFACT_SHA)"
  git -C "$WORKTREE_DIR" push "$REMOTE" "HEAD:refs/heads/$BRANCH"
  echo "==> Pushed generated output to $REMOTE/$BRANCH"
fi

if command -v gh >/dev/null 2>&1; then
  gh api "repos/projectious-work/brand-theme-hugo-vanilla/pages" >/dev/null
fi

echo "==> Deployed source: $SOURCE_SHA"
echo "==> Artifact hash:  $ARTIFACT_SHA"
echo "==> URL: https://projectious-work.github.io/brand-theme-hugo-vanilla/"
