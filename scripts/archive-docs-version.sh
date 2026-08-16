#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${1:-}"
DEST_DIR="${2:-}"
SOURCE_DIR="$ROOT_DIR/.deploy/worktrees/docs-$VERSION"
BASE_URL="https://projectious-work.github.io/brand-theme-hugo-vanilla/$VERSION/"
ARCHIVE_CONFIG="$SOURCE_DIR/src/content/hugo.toml,$ROOT_DIR/scripts/docs-versions.toml"

[[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || {
  echo "usage: scripts/archive-docs-version.sh vX.Y.Z destination" >&2
  exit 2
}
[[ -n "$DEST_DIR" ]] || {
  echo "usage: scripts/archive-docs-version.sh vX.Y.Z destination" >&2
  exit 2
}
[[ "$DEST_DIR" == /* ]] || DEST_DIR="$ROOT_DIR/$DEST_DIR"
git rev-parse -q --verify "refs/tags/$VERSION" >/dev/null || {
  echo "error: documentation tag $VERSION does not exist" >&2
  exit 1
}

if [[ -e "$SOURCE_DIR/.git" ]]; then
  git worktree remove --force "$SOURCE_DIR"
fi
git worktree add --detach "$SOURCE_DIR" "$VERSION" >/dev/null
cleanup() { git worktree remove --force "$SOURCE_DIR" >/dev/null 2>&1 || true; }
trap cleanup EXIT
ln -s "$ROOT_DIR/node_modules" "$SOURCE_DIR/node_modules"

build_archive() {
  HUGO_PARAMS_VERSION="$VERSION" \
    PATH="$ROOT_DIR/node_modules/.bin:$PATH" hugo \
    --source "$SOURCE_DIR/src/content" \
    --destination "$DEST_DIR" \
    --baseURL "$BASE_URL" \
    --config "$ARCHIVE_CONFIG" \
    --cacheDir "$ROOT_DIR/.deploy/cache/docs-$VERSION" \
    --cleanDestinationDir \
    --gc \
    --minify \
    "$@"
}

build_archive --quiet
build_archive
echo "Built archived documentation $VERSION into $DEST_DIR"
