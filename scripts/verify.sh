#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERIFY_DIR="$(mktemp -d /tmp/brand-theme-v030-verify.XXXXXX)"
trap 'rm -rf "$VERIFY_DIR"' EXIT

cd "$ROOT_DIR"
if [[ -d "$ROOT_DIR/.github/workflows" ]] && \
  find "$ROOT_DIR/.github/workflows" -type f -print -quit | rg -q .; then
  echo "error: GitHub workflow files are prohibited; use local scripts" >&2
  exit 1
fi

rg -q 'version: "0\.18\.4"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'katex@0\.18\.4/dist' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'version: "11\.16\.1"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'mermaid@11\.16\.1/dist' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'version: "3\.17\.0"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'asciinema-player@3\.17\.0/dist' "$ROOT_DIR/src/data/cdn.yaml"
if rg -n 'static/vendor|scripts/vendor\.sh|@latest|mermaid@11/dist' \
  "$ROOT_DIR/src/layouts" >/dev/null; then
  echo "error: local, floating, or stale runtime asset reference found" >&2
  exit 1
fi
"$ROOT_DIR/scripts/build.sh" "$VERIFY_DIR/build-a"
"$ROOT_DIR/scripts/build.sh" "$VERIFY_DIR/build-b"
"$ROOT_DIR/scripts/archive-docs-version.sh" v0.3.1 "$VERIFY_DIR/archive-v0.3.1"

for required in index.html index.json docs/index.html search/index.html; do
  [[ -s "$VERIFY_DIR/build-a/$required" ]] || {
    echo "error: missing generated file $required" >&2
    exit 1
  }
done

rg -q 'katex@0\.18\.4' "$VERIFY_DIR/build-a/docs/features/mathematics/index.html"
rg -q 'mermaid@11\.16\.1' "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'asciinema-player@3\.17\.0' \
  "$VERIFY_DIR/build-a/docs/shortcodes/index.html"
rg -q '/brand-theme-hugo-vanilla/casts/theme-tour\.cast' \
  "$VERIFY_DIR/build-a/docs/shortcodes/index.html"
rg -q "'projectious-light'" "$ROOT_DIR/src/assets/js/asciinema.js"
rg -q '/js/asciinema\.[a-f0-9]+\.js' \
  "$VERIFY_DIR/build-a/docs/shortcodes/index.html"
if rg -q 'ZgotmplZ' "$VERIFY_DIR/build-a/docs/features/tokens/index.html"; then
  echo "error: token swatches were rejected by Hugo contextual escaping" >&2
  exit 1
fi
bash -n "$ROOT_DIR/scripts/check-theme-update.sh"
bash -n "$ROOT_DIR/scripts/archive-docs-version.sh"
rg -q '^v0\.3\.1$' "$ROOT_DIR/scripts/docs-archives.txt"
rg -q 'label = "v0\.3\.2"' "$ROOT_DIR/scripts/docs-versions.toml"
rg -q 'partial "hooks/styles-end.html" .' "$ROOT_DIR/src/layouts/partials/styles.html"
rg -q 'partial "hooks/scripts-end.html" .' "$ROOT_DIR/src/layouts/partials/scripts.html"
[[ -f "$ROOT_DIR/src/layouts/partials/hooks/styles-end.html" ]]
[[ -f "$ROOT_DIR/src/layouts/partials/hooks/scripts-end.html" ]]
rg -q 'css/site(\.min)?\.[a-f0-9]+\.css[^>]+integrity=' "$VERIFY_DIR/build-a/index.html"
rg -q 'js/site\.[a-f0-9]+\.js[^>]+integrity=' "$VERIFY_DIR/build-a/index.html"
rg -q 'role=menuitemradio[^>]*>v0\.3\.1' "$VERIFY_DIR/build-a/index.html"
rg -q '/brand-theme-hugo-vanilla/v0\.3\.1/css/' "$VERIFY_DIR/archive-v0.3.1/index.html"
rg -q 'role=menuitemradio[^>]*aria-checked=true[^>]*>v0\.3\.1' \
  "$VERIFY_DIR/archive-v0.3.1/index.html"
rg -q 'href=https://projectious-work.github.io/brand-theme-hugo-vanilla/[^>]*role=menuitemradio[^>]*>v0\.3\.2' \
  "$VERIFY_DIR/archive-v0.3.1/index.html"
[[ -s "$VERIFY_DIR/archive-v0.3.1/docs/features/versioning/index.html" ]]

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

"$ROOT_DIR/node_modules/.bin/playwright" test

echo "Verification passed (artifact $HASH_A)"
