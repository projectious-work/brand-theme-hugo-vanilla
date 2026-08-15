#!/usr/bin/env bash
# Convert Jupyter notebooks to Markdown partials the theme can embed.
#
# Rendering .ipynb in a template is the wrong shape: the format is JSON with
# embedded base64 images and ANSI-coloured stream output. nbconvert already does
# this correctly, so this runs as a pre-build step and the theme only ever sees
# Markdown and image files.
#
#   content/docs/analysis.ipynb  ->  content/docs/_notebooks/analysis.md
#                                    static/notebooks/analysis/*.png
#
# Then in a page:  {{< notebook "analysis" >}}
#
# Requires: python3 -m pip install nbconvert
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="${1:-src/content/content}"
OUT_MD="$SRC/_notebooks"
OUT_IMG="src/content/static/notebooks"

command -v jupyter >/dev/null || { echo "jupyter not found: python3 -m pip install nbconvert" >&2; exit 1; }

mkdir -p "$OUT_MD" "$OUT_IMG"
found=0
while IFS= read -r -d '' nb; do
  found=1
  base="$(basename "$nb" .ipynb)"
  printf '\033[36mnotebook %s\033[0m\n' "$base"
  mkdir -p "$OUT_IMG/$base"
  jupyter nbconvert "$nb" \
    --to markdown \
    --output "$base" \
    --output-dir "$OUT_MD" \
    --NbConvertApp.output_files_dir="$OUT_IMG/$base" \
    --TemplateExporter.exclude_input_prompt=True \
    --TemplateExporter.exclude_output_prompt=True
  # nbconvert writes image paths relative to the markdown file; rewrite them to
  # the published static path so the theme's image hook can resolve them.
  sed -i.bak "s#$OUT_IMG/$base#/notebooks/$base#g" "$OUT_MD/$base.md"
  rm -f "$OUT_MD/$base.md.bak"
done < <(find "$SRC" -name '*.ipynb' -not -path '*/.ipynb_checkpoints/*' -print0)

[ "$found" = 1 ] || echo "No notebooks found under $SRC"
printf '\033[36mDone. Embed with {{< notebook \"name\" >}}\033[0m\n'
