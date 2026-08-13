#!/usr/bin/env bash
# Build the exampleSite demo into a static output directory.
#
# Usage: scripts/build.sh [destination]
#   destination defaults to <repo-root>/public
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT_DIR/src/exampleSite"
DEST_DIR="${1:-$ROOT_DIR/public}"

if ! command -v hugo >/dev/null 2>&1; then
  echo "error: hugo not found on PATH" >&2
  exit 1
fi

"$ROOT_DIR/scripts/check-identity.sh"
"$ROOT_DIR/scripts/sync-brand-assets.py"
"$ROOT_DIR/scripts/check-brand-provenance.py"
"$ROOT_DIR/scripts/validate-contract.py"

rm -rf "$DEST_DIR"

hugo \
  --source "$SITE_DIR" \
  --destination "$DEST_DIR" \
  --gc \
  --minify

"$ROOT_DIR/scripts/build-product-artifacts.py" "$DEST_DIR"

echo "Built site into ${DEST_DIR}"
