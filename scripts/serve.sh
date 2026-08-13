#!/usr/bin/env bash
# Local watch/serve loop for the exampleSite demo, bound to 0.0.0.0 so the
# port can be forwarded from the dev container to the host.
#
# Env overrides: PORT (default 1313), BASE_URL (default http://localhost:$PORT/)
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT_DIR/src/exampleSite"
PORT="${PORT:-1313}"
BASE_URL="${BASE_URL:-http://localhost:${PORT}/}"

if ! command -v hugo >/dev/null 2>&1; then
  echo "error: hugo not found on PATH" >&2
  exit 1
fi

echo "Serving on ${BASE_URL} (bound to 0.0.0.0:${PORT}) — forward this port to your host to preview."

exec hugo server \
  --source "$SITE_DIR" \
  --bind 0.0.0.0 \
  --port "$PORT" \
  --baseURL "$BASE_URL" \
  --appendPort=false \
  --disableFastRender \
  --navigateToChanged \
  --buildDrafts \
  --buildFuture \
  --watch
