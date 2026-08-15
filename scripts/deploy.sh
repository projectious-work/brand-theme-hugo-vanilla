#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE="${DEPLOY_REMOTE:-origin}"
BRANCH="${DEPLOY_BRANCH:-gh-pages}"
BUILD_DIR="$ROOT_DIR/.deploy/build"
WORKTREE_DIR="$ROOT_DIR/.deploy/worktrees/gh-pages"
EXPECTED_REMOTE="https://github.com/projectious-work/brand-theme-hugo-vanilla.git"
ALLOW_UNTAGGED=false

if [[ "${1:-}" == "--allow-untagged" ]]; then
  ALLOW_UNTAGGED=true
elif [[ $# -gt 0 ]]; then
  echo "usage: scripts/deploy.sh [--allow-untagged]" >&2
  exit 2
fi

cd "$ROOT_DIR"
SOURCE_SHA="$(git rev-parse HEAD)"
SOURCE_BRANCH="$(git symbolic-ref --quiet --short HEAD || true)"
SOURCE_TAG="$(git describe --tags --exact-match HEAD 2>/dev/null || true)"
REMOTE_URL="$(git remote get-url "$REMOTE")"

[[ "$BRANCH" == "gh-pages" ]] || {
  echo "error: deployment target must be gh-pages" >&2
  exit 1
}
[[ "$REMOTE_URL" == "$EXPECTED_REMOTE" ]] || {
  echo "error: unexpected deployment remote $REMOTE_URL" >&2
  exit 1
}
[[ "$SOURCE_BRANCH" == "main" ]] || {
  echo "error: deploy only from protected main" >&2
  exit 1
}
[[ -z "$(git status --porcelain)" ]] || {
  echo "error: source tree is dirty" >&2
  exit 1
}
if [[ ! "$SOURCE_TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ && "$ALLOW_UNTAGGED" != true ]]; then
  echo "error: HEAD must have an exact SemVer tag" >&2
  exit 1
fi

"$ROOT_DIR/scripts/verify.sh"
"$ROOT_DIR/scripts/build.sh" "$BUILD_DIR"

ARTIFACT_SHA="$(find "$BUILD_DIR" -type f -print0 \
  | sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1)"

mkdir -p "$(dirname "$WORKTREE_DIR")"
git fetch "$REMOTE" "$BRANCH"
if [[ ! -e "$WORKTREE_DIR/.git" ]]; then
  git worktree add -B "$BRANCH" "$WORKTREE_DIR" "$REMOTE/$BRANCH"
fi

find "$WORKTREE_DIR" -mindepth 1 -maxdepth 1 -not -name .git \
  -exec rm -rf {} +
cp -a "$BUILD_DIR/." "$WORKTREE_DIR/"
touch "$WORKTREE_DIR/.nojekyll"

git -C "$WORKTREE_DIR" add -A
if git -C "$WORKTREE_DIR" diff --cached --quiet; then
  echo "No deployment changes"
else
  git -C "$WORKTREE_DIR" commit -m \
    "Deploy ${SOURCE_TAG:-$SOURCE_SHA} (artifact $ARTIFACT_SHA)"
  git -C "$WORKTREE_DIR" push "$REMOTE" HEAD:refs/heads/gh-pages
fi

echo "Deployed $SOURCE_SHA to gh-pages"
echo "Artifact SHA-256: $ARTIFACT_SHA"
echo "URL: https://projectious-work.github.io/brand-theme-hugo-vanilla/"
