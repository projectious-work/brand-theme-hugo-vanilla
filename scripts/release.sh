#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${1:-}"
REMOTE="${RELEASE_REMOTE:-origin}"
REPO="projectious-work/brand-theme-hugo-vanilla"

[[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || {
  echo "usage: scripts/release.sh vX.Y.Z" >&2
  exit 2
}

cd "$ROOT_DIR"
[[ "$(git branch --show-current)" == "main" ]] || {
  echo "error: releases must run from protected main after the release PR" >&2
  exit 1
}
[[ -z "$(git status --porcelain)" ]] || {
  echo "error: source tree is dirty" >&2
  exit 1
}
git fetch "$REMOTE" main --tags
[[ "$(git rev-parse HEAD)" == "$(git rev-parse "$REMOTE/main")" ]] || {
  echo "error: local main must exactly match $REMOTE/main" >&2
  exit 1
}
PACKAGE_VERSION="$(node -p "require('./package.json').version")"
[[ "v$PACKAGE_VERSION" == "$VERSION" ]] || {
  echo "error: package.json version is v$PACKAGE_VERSION, expected $VERSION" >&2
  exit 1
}
rg -q "^## \[$VERSION\] — [0-9]{4}-[0-9]{2}-[0-9]{2}$" CHANGELOG.md || {
  echo "error: CHANGELOG.md has no dated $VERSION section" >&2
  exit 1
}

./scripts/verify.sh
ARCHIVE="$(./scripts/package-release.sh "$VERSION")"
NOTES="$ROOT_DIR/.deploy/release/$VERSION-notes.md"
awk -v version="$VERSION" '
  $0 ~ "^## \\[" version "\\]" { found=1; next }
  found && /^## \[/ { exit }
  found { print }
' CHANGELOG.md > "$NOTES"
[[ -s "$NOTES" ]] || {
  echo "error: extracted release notes are empty" >&2
  exit 1
}

if git rev-parse -q --verify "refs/tags/$VERSION" >/dev/null; then
  [[ "$(git rev-list -n 1 "$VERSION")" == "$(git rev-parse HEAD)" ]] || {
    echo "error: existing tag $VERSION points to another commit" >&2
    exit 1
  }
else
  git tag -a "$VERSION" -m "$VERSION"
fi
git push "$REMOTE" main
git push "$REMOTE" "refs/tags/$VERSION"
if ! gh release view "$VERSION" --repo "$REPO" >/dev/null 2>&1; then
  gh release create "$VERSION" "$ARCHIVE" "$ARCHIVE.sha256" \
    --repo "$REPO" \
    --title "$VERSION" \
    --notes-file "$NOTES" \
    --latest
fi
gh release view "$VERSION" --repo "$REPO" >/dev/null
./scripts/deploy.sh

echo "Release $VERSION published, verified, and deployed"
