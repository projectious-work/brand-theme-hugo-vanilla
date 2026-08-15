#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${1:-}"

[[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || {
  echo "usage: scripts/package-release.sh vX.Y.Z" >&2
  exit 2
}

ARCHIVE_DIR="$ROOT_DIR/.deploy/release"
STAGE_DIR="$ARCHIVE_DIR/brand-theme-hugo-vanilla-$VERSION"
ARCHIVE="$ARCHIVE_DIR/brand-theme-hugo-vanilla-$VERSION.tar.gz"

rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR" "$ARCHIVE_DIR"
cp -a "$ROOT_DIR/src" "$STAGE_DIR/"
rm -rf "$STAGE_DIR/src/content/public" \
  "$STAGE_DIR/src/content/resources"
rm -f "$STAGE_DIR/src/content/.hugo_build.lock" \
  "$STAGE_DIR/src/content/hugo_stats.json"
cp "$ROOT_DIR/LICENSE" "$ROOT_DIR/README.md" "$ROOT_DIR/CHANGELOG.md" \
  "$ROOT_DIR/go.mod" "$ROOT_DIR/hugo.toml" "$ROOT_DIR/theme.toml" \
  "$ROOT_DIR/package.json" "$ROOT_DIR/package-lock.json" "$STAGE_DIR/"
mkdir -p "$STAGE_DIR/scripts"
cp "$ROOT_DIR/scripts/check-theme-update.sh" "$STAGE_DIR/scripts/"
tar -C "$ARCHIVE_DIR" -czf "$ARCHIVE" \
  "brand-theme-hugo-vanilla-$VERSION"
sha256sum "$ARCHIVE" > "$ARCHIVE.sha256"

echo "$ARCHIVE"
