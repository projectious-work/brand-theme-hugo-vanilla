#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT_DIR/src/content"
PORT="${HUGO_PORT:-1312}"

command -v hugo >/dev/null 2>&1 || {
  echo "error: Hugo is required" >&2
  exit 1
}
[[ -x "$ROOT_DIR/node_modules/.bin/tailwindcss" ]] || {
  echo "error: dependencies are missing; run npm install" >&2
  exit 1
}

exec env PATH="$ROOT_DIR/node_modules/.bin:$PATH" hugo server \
  --source "$SITE_DIR" \
  --cacheDir "$ROOT_DIR/.deploy/cache" \
  --bind 0.0.0.0 \
  --port "$PORT" \
  --disableFastRender \
  --navigateToChanged
