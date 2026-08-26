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
rg -q 'version: "7\.9\.0"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'd3@7\.9\.0/dist' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'version: "0\.6\.17"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q '@observablehq/plot@0\.6\.17/dist' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'version: "1\.13\.2"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'jsxgraph@1\.13\.2/distrib' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'version: "3\.6\.2"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'wavedrom@3\.6\.2' "$ROOT_DIR/src/data/cdn.yaml"
test "$(rg -c 'version: "2\.4\.1"' "$ROOT_DIR/src/data/cdn.yaml")" -eq 2
rg -q 'smiles-drawer@2\.4\.1/dist' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'pseudocode@2\.4\.1/build' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'version: "3\.17\.0"' "$ROOT_DIR/src/data/cdn.yaml"
rg -q 'asciinema-player@3\.17\.0/dist' "$ROOT_DIR/src/data/cdn.yaml"
if rg -n 'static/vendor|scripts/vendor\.sh|@latest|mermaid@11/dist' \
  "$ROOT_DIR/src/layouts" >/dev/null; then
  echo "error: local, floating, or stale runtime asset reference found" >&2
  exit 1
fi
"$ROOT_DIR/scripts/build.sh" "$VERIFY_DIR/build-a"
"$ROOT_DIR/scripts/build.sh" "$VERIFY_DIR/build-b"
"$ROOT_DIR/scripts/archive-docs-version.sh" v0.3.4 "$VERIFY_DIR/archive-v0.3.4"
"$ROOT_DIR/scripts/archive-docs-version.sh" v0.3.5 "$VERIFY_DIR/archive-v0.3.5"
"$ROOT_DIR/scripts/archive-docs-version.sh" v0.3.2 "$VERIFY_DIR/archive-v0.3.2"
"$ROOT_DIR/scripts/archive-docs-version.sh" v0.3.1 "$VERIFY_DIR/archive-v0.3.1"

for required in index.html index.json docs/index.html search/index.html; do
  [[ -s "$VERIFY_DIR/build-a/$required" ]] || {
    echo "error: missing generated file $required" >&2
    exit 1
  }
done

for alias in \
  blog/index.html \
  docs/shortcodes/index.html \
  de/blog/index.html \
  de/docs/shortcodes/index.html \
  fr/blog/index.html \
  fr/docs/shortcodes/index.html; do
  [[ -s "$VERIFY_DIR/build-a/$alias" ]] || {
    echo "error: missing compatibility redirect $alias" >&2
    exit 1
  }
done
[[ ! -e "$VERIFY_DIR/build-a/de/de" ]]
[[ ! -e "$VERIFY_DIR/build-a/fr/fr" ]]
rg -q '"@type":"CollectionPage"' \
  "$VERIFY_DIR/build-a/changelog/index.html"
rg -q '"@type":"Article"' \
  "$VERIFY_DIR/build-a/changelog/release-v0-3-2/index.html"
if rg -q 'BlogPosting' "$VERIFY_DIR/build-a/changelog"; then
  echo "error: change log output still contains blog schema" >&2
  exit 1
fi

rg -q 'katex@0\.18\.4' "$VERIFY_DIR/build-a/docs/features/mathematics/index.html"
rg -q 'mermaid@11\.16\.1' "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
[[ -s "$VERIFY_DIR/build-a/docs/installation/index.html" ]]
rg -q 'Optional graphics tools' "$VERIFY_DIR/build-a/docs/installation/index.html"
rg -q 'logo/icon-dark\.svg' "$VERIFY_DIR/build-a/index.html"
rg -q 'class="chart chart--bar"' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'class="chart chart--line"' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'class="chart chart--dot"' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'aria-labelledby="chart-[0-9]+-title chart-[0-9]+-desc"' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'graphics/request-flow\.mmd' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'id=trusted-inline-svg' \
  "$VERIFY_DIR/build-a/docs/features/images/index.html"
rg -q 'class=graphic' "$VERIFY_DIR/build-a/docs/features/images/index.html"
rg -q 'id=bitmap-images' "$VERIFY_DIR/build-a/docs/features/images/index.html"
rg -q 'href=#charts-from-csv' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'class=plot data-plot data-type=heatmap' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q 'd3@7\.9\.0/dist/d3\.min\.js' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
rg -q '@observablehq/plot@0\.6\.17/dist/plot\.umd\.min\.js' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
for backend in d2 dot; do
  rg -q "data-graphic-backend=$backend" \
    "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
done
test "$(rg -o 'data-graphic-backend=d2' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html" | wc -l)" -eq 3
test "$(rg -o 'graphic__media graphic__media--inline' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html" | wc -l)" -eq 4
if rg -q 'graphic--generated[^<]*<img' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"; then
  echo "error: generated diagrams must be inline SVG, not img documents" >&2
  exit 1
fi
for source in network-topology aws-nested-infrastructure; do
  rg -q "graphics/$source\.d2" \
    "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
done
for pin in \
  'jsxgraph@1.13.2' 'wavedrom@3.6.2' \
  'smiles-drawer@2.4.1' 'pseudocode@2.4.1'; do
  rg -q "$pin" "$VERIFY_DIR/build-a/docs/features/diagrams/index.html"
done
test "$(rg -o 'data-graphic-backend=typst' \
  "$VERIFY_DIR/build-a/docs/features/typst-graphics/index.html" | wc -l)" -eq 13
for example in \
  karls-picture neural-network cetz-geometry primaviz-bars \
  alchemist-molecule timeliney-plan finite-automaton fletcher-flow \
  lovelace-search physica-notation staunton-position genotypst-tree \
  circuiteria-block; do
  rg -q "graphics/$example\.typ" \
    "$VERIFY_DIR/build-a/docs/features/typst-graphics/index.html"
done
while read -r generated; do
  [[ -s "$VERIFY_DIR/build-a/$generated" ]] || {
    echo "error: missing generated graphic $generated" >&2
    exit 1
  }
done < <(rg --no-filename -o '_generated/graphics/[a-f0-9]+\.svg' \
  "$VERIFY_DIR/build-a/docs/features/diagrams/index.html" \
  "$VERIFY_DIR/build-a/docs/features/typst-graphics/index.html" | sort -u)
rg -q 'class="changelog__badges data-badges"' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
rg -q 'class="cards cards--stacked"' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
rg -q 'aria-label="Theme releases"' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
rg -q 'class="data-table data-table--interactive"' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
rg -q '>16 Aug 2026<' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
rg -q 'data-value=2\.46[^>]*>2\.5 MB<' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
rg -q '/js/data-table\.' \
  "$VERIFY_DIR/build-a/docs/features/data-driven-components/index.html"
node --check "$ROOT_DIR/src/assets/js/data-table.js"
node --check "$ROOT_DIR/src/assets/js/domain-graphics.js"
node --check "$ROOT_DIR/scripts/render-graphics.mjs"
rg -q 'asciinema-player@3\.17\.0' \
  "$VERIFY_DIR/build-a/docs/features/terminal-recordings/index.html"
rg -q '/brand-theme-hugo-vanilla/casts/theme-tour\.cast' \
  "$VERIFY_DIR/build-a/docs/features/terminal-recordings/index.html"
rg -q "'projectious-light'" "$ROOT_DIR/src/assets/js/asciinema.js"
rg -q '/js/asciinema\.[a-f0-9]+\.js' \
  "$VERIFY_DIR/build-a/docs/features/terminal-recordings/index.html"
if rg -q 'ZgotmplZ' "$VERIFY_DIR/build-a/docs/features/tokens/index.html"; then
  echo "error: token swatches were rejected by Hugo contextual escaping" >&2
  exit 1
fi
bash -n "$ROOT_DIR/scripts/check-theme-update.sh"
bash -n "$ROOT_DIR/scripts/archive-docs-version.sh"
rg -q '^v0\.3\.4$' "$ROOT_DIR/scripts/docs-archives.txt"
rg -q '^v0\.3\.2$' "$ROOT_DIR/scripts/docs-archives.txt"
rg -q '^v0\.3\.1$' "$ROOT_DIR/scripts/docs-archives.txt"
rg -q 'label = "v0\.3\.6"' "$ROOT_DIR/scripts/docs-versions.toml"
rg -q 'partial "hooks/styles-end.html" .' "$ROOT_DIR/src/layouts/partials/styles.html"
rg -q 'partial "hooks/scripts-end.html" .' "$ROOT_DIR/src/layouts/partials/scripts.html"
[[ -f "$ROOT_DIR/src/layouts/partials/hooks/styles-end.html" ]]
[[ -f "$ROOT_DIR/src/layouts/partials/hooks/scripts-end.html" ]]
rg -q 'css/site(\.min)?\.[a-f0-9]+\.css[^>]+integrity=' "$VERIFY_DIR/build-a/index.html"
rg -q 'js/site\.[a-f0-9]+\.js[^>]+integrity=' "$VERIFY_DIR/build-a/index.html"
rg -q 'role=menuitemradio[^>]*>v0\.3\.2' "$VERIFY_DIR/build-a/index.html"
rg -q 'role=menuitemradio[^>]*>v0\.3\.5' "$VERIFY_DIR/build-a/index.html"
rg -q 'role=menuitemradio[^>]*>v0\.3\.4' "$VERIFY_DIR/build-a/index.html"
rg -q 'role=menuitemradio[^>]*>v0\.3\.1' "$VERIFY_DIR/build-a/index.html"
rg -q '/brand-theme-hugo-vanilla/v0\.3\.2/css/' "$VERIFY_DIR/archive-v0.3.2/index.html"
rg -q 'role=menuitemradio[^>]*aria-checked=true[^>]*>v0\.3\.2' \
  "$VERIFY_DIR/archive-v0.3.2/index.html"
rg -q 'href=https://projectious-work.github.io/brand-theme-hugo-vanilla/[^>]*role=menuitemradio[^>]*>v0\.3\.5' \
  "$VERIFY_DIR/archive-v0.3.2/index.html"
rg -q 'v0\.3\.1/[^>]*role=menuitemradio[^>]*>v0\.3\.1' \
  "$VERIFY_DIR/archive-v0.3.2/index.html"
rg -q '/brand-theme-hugo-vanilla/v0\.3\.1/css/' "$VERIFY_DIR/archive-v0.3.1/index.html"
rg -q 'role=menuitemradio[^>]*aria-checked=true[^>]*>v0\.3\.1' \
  "$VERIFY_DIR/archive-v0.3.1/index.html"
rg -q 'href=https://projectious-work.github.io/brand-theme-hugo-vanilla/[^>]*role=menuitemradio[^>]*>v0\.3\.5' \
  "$VERIFY_DIR/archive-v0.3.1/index.html"
rg -q 'v0\.3\.2/[^>]*role=menuitemradio[^>]*>v0\.3\.2' \
  "$VERIFY_DIR/archive-v0.3.1/index.html"
[[ -s "$VERIFY_DIR/archive-v0.3.2/docs/features/versioning/index.html" ]]
[[ -s "$VERIFY_DIR/archive-v0.3.1/docs/features/versioning/index.html" ]]
[[ -s "$VERIFY_DIR/archive-v0.3.4/docs/features/versioning/index.html" ]]
[[ -s "$VERIFY_DIR/archive-v0.3.5/docs/features/versioning/index.html" ]]

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
