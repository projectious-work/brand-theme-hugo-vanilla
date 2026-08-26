+++
title = "Dependencies and SBOM"
description = "Understand build tools, browser runtimes, bundled assets, versions and licences."
weight = 80
icon = "list"
+++

The theme has no server runtime. Hugo produces static files. Dependencies fall into
build-time tools, browser-loaded libraries and bundled assets.

## Direct dependency inventory

| Component | Version | Delivery | Purpose | Licence |
|---|---:|---|---|---|
| Hugo | 0.128.0 minimum; verified with 0.165.0 | Build tool | Static-site generation and asset pipeline | Apache-2.0 |
| Go | 1.22 module declaration | Build tool | Hugo Module resolution | BSD-3-Clause |
| `@tailwindcss/cli` | 4.3.3 locked | npm development dependency | Compile utility CSS from Hugo build statistics | MIT |
| Playwright test | 1.62.1 locked | npm development dependency | Browser behavior and visual regression tests | Apache-2.0 |
| Tabler Icons | 3.31.0 locked | npm development dependency mounted into Hugo assets | Complete outline icon catalogue | MIT |
| IBM Plex Mono font package | 5.3.0 locked | npm development source for bundled WOFF2 cuts | Code and syntax typography | SIL OFL 1.1 |
| FlexSearch | 0.8.143 | Bundled browser asset | Local full-text search | Apache-2.0 |
| [KaTeX](https://katex.org/docs/) | 0.18.4 | Pinned CDN or self-hosted | Mathematics rendering | MIT |
| [Mermaid](https://mermaid.js.org/intro/) | 11.16.1 | Pinned CDN or self-hosted | Diagram rendering | MIT |
| [D3](https://d3js.org/) | 7.9.0 | Pinned CDN or self-hosted | Plot data parsing and scales | ISC |
| [Observable Plot](https://observablehq.com/plot/) | 0.6.17 | Pinned CDN or self-hosted | High-level interactive charts | ISC |
| [JSXGraph](https://jsxgraph.org/) | 1.13.2 | Pinned CDN or self-hosted | Interactive mathematical constructions | MIT or LGPL-3.0-or-later |
| [WaveDrom](https://wavedrom.com/) | 3.6.2 | Pinned CDN or self-hosted | Digital timing diagrams | MIT |
| [SMILES Drawer](https://github.com/reymond-group/smilesDrawer) | 2.4.1 | Pinned CDN or self-hosted | Lightweight chemical structures | MIT |
| [pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js) | 2.4.1 | Pinned CDN or self-hosted | Algorithms as semantic HTML | MIT |
| asciinema-player | 3.17.0 | Pinned CDN or self-hosted | Terminal recording playback | Apache-2.0 |
| nbconvert | 7.16.6 | Optional pinned Python tool | Convert Jupyter notebooks to Markdown | BSD-3-Clause |
| Bundled fallback icons | 38 theme glyphs | Bundled assets | Offline interface fallback | MIT |

[D2](https://d2lang.com/tour/intro/),
[Graphviz](https://graphviz.org/documentation/) and
[Typst](https://typst.app/docs/) are optional build tools. The graphics
pre-renderer calls only a backend used by uncached content, so a consuming
project installs the subset it needs. Their versions should be pinned in that
project's build image; they are not mandatory theme dependencies.

See [Installation](installation.md) for the required core toolchain, optional
renderer commands and offline/self-hosted setup.

Exact browser-runtime URLs are maintained in `src/data/cdn.yaml`; exact npm
transitives and integrity values are in `package-lock.json`; Python conversion pins
are in `scripts/requirements.txt`.

## Bundled fonts and icons

Plus Jakarta Sans, Source Sans 3 and IBM Plex Mono are bundled as WOFF2 under the
SIL Open Font License 1.1. IBM Plex Mono includes normal and italic cuts at 400,
500, 600 and 700 so syntax roles use real faces rather than browser-synthesized
weight or oblique. Licence texts ship under `src/static/fonts/licenses/`.
The theme's fallback SVG set follows Tabler geometry. The exact Tabler dependency
is mounted from `node_modules` during the example build; consuming sites may use
the same mount or rely on the fallback set. See
[Icons and Tabler](developer-guide.md#icons-and-tabler). FlexSearch's licence ships
under `src/static/licenses/flexsearch/`.

## SBOM scope and maintenance

This page is the human-readable software bill of materials for v0.3.x. Before each
release, maintainers must compare it with `package-lock.json`, `requirements.txt`,
`data/cdn.yaml`, bundled asset directories and Hugo/Go declarations. Generated
CycloneDX or SPDX output may supplement this page, but must not replace checked-in
licence files or the exact lockfiles.

Run `npm audit --json` for the Node graph. CDN and bundled assets require separate
release-note and advisory review because npm audit cannot see them.
