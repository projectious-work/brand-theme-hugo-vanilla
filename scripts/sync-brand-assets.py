#!/usr/bin/env python3
"""Reproduce the theme token derivative from the pinned brand mirror."""

import argparse
from pathlib import Path
import shutil
import sys


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "input/projectious.work Design System/colors_and_type.css"
TARGET = ROOT / "src/assets/css/tokens.css"
LOGO_SOURCE = ROOT / "input/projectious.work Design System/assets/logo"
LOGO_TARGET = ROOT / "src/static/logo"

REMOTE_HEADER = """ * change values upstream, then re-sync. Base element styles below are local.
 * Self-contained: includes Google Font @import for the three brand families. */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
"""

LOCAL_FONTS = """ * change values upstream, then re-sync. Base element styles below are local.
 * Font delivery is a documented theme transformation: bundled, pinned WOFF2
 * files replace the upstream Google Fonts import. */

@font-face { font-family: 'Plus Jakarta Sans'; font-style: normal; font-weight: 400; font-display: swap; src: url('../fonts/plus-jakarta-sans/plus-jakarta-sans-latin-400-normal.woff2') format('woff2'); }
@font-face { font-family: 'Plus Jakarta Sans'; font-style: normal; font-weight: 500; font-display: swap; src: url('../fonts/plus-jakarta-sans/plus-jakarta-sans-latin-500-normal.woff2') format('woff2'); }
@font-face { font-family: 'Plus Jakarta Sans'; font-style: normal; font-weight: 600; font-display: swap; src: url('../fonts/plus-jakarta-sans/plus-jakarta-sans-latin-600-normal.woff2') format('woff2'); }
@font-face { font-family: 'Plus Jakarta Sans'; font-style: normal; font-weight: 700; font-display: swap; src: url('../fonts/plus-jakarta-sans/plus-jakarta-sans-latin-700-normal.woff2') format('woff2'); }
@font-face { font-family: 'Plus Jakarta Sans'; font-style: normal; font-weight: 800; font-display: swap; src: url('../fonts/plus-jakarta-sans/plus-jakarta-sans-latin-800-normal.woff2') format('woff2'); }
@font-face { font-family: 'Source Sans 3'; font-style: normal; font-weight: 400; font-display: swap; src: url('../fonts/source-sans-3/source-sans-3-latin-400-normal.woff2') format('woff2'); }
@font-face { font-family: 'Source Sans 3'; font-style: normal; font-weight: 500; font-display: swap; src: url('../fonts/source-sans-3/source-sans-3-latin-500-normal.woff2') format('woff2'); }
@font-face { font-family: 'Source Sans 3'; font-style: normal; font-weight: 600; font-display: swap; src: url('../fonts/source-sans-3/source-sans-3-latin-600-normal.woff2') format('woff2'); }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url('../fonts/ibm-plex-mono/ibm-plex-mono-latin-400-normal.woff2') format('woff2'); }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 500; font-display: swap; src: url('../fonts/ibm-plex-mono/ibm-plex-mono-latin-500-normal.woff2') format('woff2'); }
"""

SYSTEM_PROFILE = """

/* Network-free fallback profile. Bundled font faces remain declared but are
   never selected, so browsers do not request their files. */
[data-fonts="system"] {
  --font-heading: system-ui, sans-serif;
  --font-body: system-ui, sans-serif;
  --font-code: ui-monospace, SFMono-Regular, Consolas, monospace;
}
"""

LOGOS = (
    "apple-touch-icon-180.png",
    "favicon-32.png",
    "icon-dark.svg",
    "icon-light.svg",
)


def generated_tokens() -> str:
    upstream = SOURCE.read_text(encoding="utf-8")
    if REMOTE_HEADER not in upstream:
        raise RuntimeError("pinned font-import block not found in token source")
    return upstream.replace(REMOTE_HEADER, LOCAL_FONTS, 1).rstrip() + SYSTEM_PROFILE


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    expected = generated_tokens()

    if args.write:
        TARGET.write_text(expected, encoding="utf-8")
        for name in LOGOS:
            shutil.copyfile(LOGO_SOURCE / name, LOGO_TARGET / name)
        print("Synchronized token derivative and brand logo assets")
        return 0

    if TARGET.read_text(encoding="utf-8") != expected:
        print("error: token derivative is stale", file=sys.stderr)
        return 1
    for name in LOGOS:
        if (LOGO_SOURCE / name).read_bytes() != (LOGO_TARGET / name).read_bytes():
            print(f"error: logo derivative is stale: {name}", file=sys.stderr)
            return 1
    print("Brand derivatives match their pinned input sources")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
