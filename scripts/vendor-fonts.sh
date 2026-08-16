#!/bin/sh
# Fetch and validate the locally hosted brand font files.
set -eu

DEST="$(dirname "$0")/../src/static/fonts"
BASE="https://cdn.jsdelivr.net/fontsource/fonts"

fetch() {
  fam="$1"; dir="$2"; weight="$3"; style="$4"
  out="$DEST/$dir/$dir-latin-$weight-$style.woff2"
  mkdir -p "$DEST/$dir"
  if [ -f "$out" ]; then echo "have  $out"; return; fi
  echo "fetch $out"
  curl -fsSL "$BASE/$fam@latest/latin-$weight-$style.woff2" -o "$out"
}

for weight in 400 500 600 700 800; do fetch plus-jakarta-sans plus-jakarta-sans "$weight" normal; done
for weight in 400 500 600; do fetch source-sans-3 source-sans-3 "$weight" normal; done
for weight in 400 500 600 700; do fetch ibm-plex-mono ibm-plex-mono "$weight" normal; done
for weight in 400 500 600 700; do fetch ibm-plex-mono ibm-plex-mono "$weight" italic; done

grep -o 'url("[^"]*")' "$(dirname "$0")/../src/assets/css/fonts.css" |
  sed 's|url("../fonts/||;s|")||' |
  while read -r file; do
    [ -f "$DEST/$file" ] || { echo "MISSING $file"; exit 1; }
  done
echo "All declared font files are present."
