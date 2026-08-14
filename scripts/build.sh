#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT_DIR/src/content"
DEST_DIR="${1:-$ROOT_DIR/public}"

if [[ "$DEST_DIR" != /* ]]; then
  DEST_DIR="$ROOT_DIR/$DEST_DIR"
fi

command -v hugo >/dev/null 2>&1 || {
  echo "error: Hugo is required" >&2
  exit 1
}
[[ -x "$ROOT_DIR/node_modules/.bin/tailwindcss" ]] || {
  echo "error: Tailwind dependencies are missing; run npm install" >&2
  exit 1
}
[[ -f "$SITE_DIR/hugo.toml" ]] || {
  echo "error: example site not found at $SITE_DIR" >&2
  exit 1
}

build_site() {
  PATH="$ROOT_DIR/node_modules/.bin:$PATH" hugo \
    --source "$SITE_DIR" \
    --destination "$DEST_DIR" \
    --cacheDir "$ROOT_DIR/.deploy/cache" \
    --cleanDestinationDir \
    --gc \
    --minify \
    "$@"
}

# The first pass writes Hugo's class inventory for Tailwind. The second pass
# consumes that inventory and produces the complete, reproducible stylesheet.
build_site --quiet
build_site

echo "Built example site into $DEST_DIR"
