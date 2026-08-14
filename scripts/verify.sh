#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERIFY_DIR="$(mktemp -d /tmp/brand-theme-v030-verify.XXXXXX)"
trap 'rm -rf "$VERIFY_DIR"' EXIT

cd "$ROOT_DIR"
"$ROOT_DIR/scripts/build.sh" "$VERIFY_DIR/build-a"
"$ROOT_DIR/scripts/build.sh" "$VERIFY_DIR/build-b"

for required in index.html index.json docs/index.html search/index.html; do
  [[ -s "$VERIFY_DIR/build-a/$required" ]] || {
    echo "error: missing generated file $required" >&2
    exit 1
  }
done

hash_tree() {
  find "$1" -type f -print0 \
    | sort -z \
    | xargs -0 sha256sum \
    | sed "s#$1/##" \
    | sha256sum \
    | cut -d' ' -f1
}

HASH_A="$(hash_tree "$VERIFY_DIR/build-a")"
HASH_B="$(hash_tree "$VERIFY_DIR/build-b")"
[[ "$HASH_A" == "$HASH_B" ]] || {
  echo "error: repeated builds are not deterministic" >&2
  exit 1
}

if rg -n 'href="/(?!brand-theme-hugo-vanilla)' \
  "$VERIFY_DIR/build-a" --glob '*.html' --pcre2 >/dev/null; then
  echo "error: generated HTML contains a root-relative link outside the Pages base path" >&2
  exit 1
fi

echo "Verification passed (artifact $HASH_A)"
