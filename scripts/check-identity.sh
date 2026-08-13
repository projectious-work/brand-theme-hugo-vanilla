#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CANONICAL="github.com/projectious-work/brand-theme-hugo-vanilla"
OBSOLETE="hugo-theme-""projectious"

cd "$ROOT_DIR"

if rg -n "$OBSOLETE" \
  --glob '!context/**' \
  --glob '!input/**' \
  --glob '!.git/**' \
  --glob '!CHANGELOG.md'; then
  echo "error: obsolete product identity found" >&2
  exit 1
fi

rg -q "^module $CANONICAL$" go.mod
rg -q "^module ${CANONICAL}/content$" src/content/go.mod
rg -q "path = \"$CANONICAL\"" src/content/hugo.toml
rg -q "$CANONICAL" README.md
rg -q "$CANONICAL" src/content/content/docs/getting-started.md

echo "Product identity is consistent: $CANONICAL"
