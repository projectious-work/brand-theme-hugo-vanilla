#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERIFY_DIR="$(mktemp -d /tmp/brand-theme-verify.XXXXXX)"
SERVER_PID=""
cleanup() {
  if [[ -n "$SERVER_PID" ]]; then kill "$SERVER_PID" 2>/dev/null || true; fi
  rm -rf "$VERIFY_DIR"
}
trap cleanup EXIT

cd "$ROOT_DIR"

scripts/check-identity.sh
scripts/sync-brand-assets.py
scripts/check-brand-provenance.py
scripts/validate-contract.py

scripts/build.sh "$VERIFY_DIR/example-a"
scripts/check-product-outputs.py "$VERIFY_DIR/example-a"
scripts/check-site.py "$VERIFY_DIR/example-a"

scripts/build.sh "$VERIFY_DIR/example-b"
for relative in index.json llms.txt llms-full.txt .product-mcp/contract.json \
  .product-mcp/pages.json .product-mcp/tokens.json; do
  cmp "$VERIFY_DIR/example-a/$relative" "$VERIFY_DIR/example-b/$relative"
done

hugo --source tests/minimal-consumer \
  --destination "$VERIFY_DIR/minimal" \
  --cacheDir "$VERIFY_DIR/cache" \
  --gc --minify
test -s "$VERIFY_DIR/minimal/index.html"
test -s "$VERIFY_DIR/minimal/index.json"

python3 -m unittest tests/test_product_mcp.py

if [[ ! -x node_modules/.bin/playwright ]]; then
  echo "error: browser dependencies missing; run npm ci and npx playwright install chromium" >&2
  exit 1
fi
mkdir -p "$VERIFY_DIR/webroot"
ln -s "$VERIFY_DIR/example-a" "$VERIFY_DIR/webroot/brand-theme-hugo-vanilla"
python3 -m http.server 4187 --bind 127.0.0.1 \
  --directory "$VERIFY_DIR/webroot" >/dev/null 2>&1 &
SERVER_PID=$!
PLAYWRIGHT_BASE_URL="http://127.0.0.1:4187/brand-theme-hugo-vanilla/" \
  npm run test:browser

git diff --check

echo "Local verification passed"
