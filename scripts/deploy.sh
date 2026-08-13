#!/usr/bin/env bash
# Manual deploy to this repository's GitHub Pages, driven entirely from the
# dev container — no GitHub Actions / workflows involved.
#
# Builds src/exampleSite and force-pushes the static output to the gh-pages
# branch via a local git worktree, then makes sure GitHub Pages is
# configured to serve from that branch (requires `gh` auth with repo admin
# access; skipped automatically if `gh` isn't available or lacks access).
#
# Env overrides: DEPLOY_BRANCH (default gh-pages), DEPLOY_REMOTE (default origin)
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-gh-pages}"
REMOTE="${DEPLOY_REMOTE:-origin}"
WORKTREE_DIR="$ROOT_DIR/.deploy/$BRANCH"

cd "$ROOT_DIR"

if [[ -z "$(git remote get-url "$REMOTE" 2>/dev/null || true)" ]]; then
  echo "error: git remote '$REMOTE' not configured" >&2
  exit 1
fi

echo "==> Building site"
"$ROOT_DIR/scripts/build.sh" "$ROOT_DIR/.deploy/build"

echo "==> Preparing worktree for '$BRANCH'"
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

echo "==> Syncing build output into worktree"
find "$WORKTREE_DIR" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
cp -a "$ROOT_DIR/.deploy/build/." "$WORKTREE_DIR/"
touch "$WORKTREE_DIR/.nojekyll"

cd "$WORKTREE_DIR"
git add -A
if git diff --cached --quiet; then
  echo "==> Nothing changed, skipping commit/push"
else
  git commit -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ) from $(git -C "$ROOT_DIR" rev-parse --short HEAD)"
  git push "$REMOTE" "HEAD:refs/heads/$BRANCH"
  echo "==> Pushed to $REMOTE/$BRANCH"
fi
cd "$ROOT_DIR"

if command -v gh >/dev/null 2>&1; then
  if ! gh api "repos/{owner}/{repo}/pages" >/dev/null 2>&1; then
    echo "==> GitHub Pages not yet enabled, enabling from '$BRANCH' branch"
    gh api "repos/{owner}/{repo}/pages" -X POST \
      -f "source[branch]=$BRANCH" -f "source[path]=/" >/dev/null \
      && echo "==> GitHub Pages enabled" \
      || echo "warning: could not enable GitHub Pages automatically; enable it manually in repo Settings > Pages (branch: $BRANCH, path: /)" >&2
  fi
else
  echo "note: 'gh' not found — verify GitHub Pages is configured to serve from '$BRANCH' in repo Settings > Pages"
fi

echo "==> Done"
