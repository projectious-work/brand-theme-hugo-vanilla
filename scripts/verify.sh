#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERIFY_DIR="$(mktemp -d /tmp/brand-theme-verify.XXXXXX)"
trap 'rm -rf "$VERIFY_DIR"' EXIT

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
git diff --check

echo "Local verification passed"
