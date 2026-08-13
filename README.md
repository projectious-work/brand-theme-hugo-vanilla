# brand-theme-hugo-vanilla

A lean, idiomatic Hugo theme implementing the projectious.work brand system. No npm, no build step beyond `hugo`/`hugo server` — styling and scripting run entirely through Hugo Pipes (`resources.Get` → `minify` → `fingerprint`).

## Install

Git submodule:

```
git submodule add https://github.com/projectious-work/brand-theme-hugo-vanilla.git themes/brand-theme-hugo-vanilla
```

or as a Hugo Module in your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"
```

Then set `theme = "brand-theme-hugo-vanilla"` (submodule). Hugo Modules need
no `theme` key.

Copy the settings from `src/exampleSite/hugo.toml` into your own site config:
the `[outputs]`/`[outputFormats.SearchIndex]` block (powers search) and the
`[markup]` block (syntax highlighting + table of contents). The example site
consumes the theme as a Hugo Module with a `replace` directive back to the
repository root (see its `go.mod`); run `scripts/serve.sh` from the theme root
to preview it.

## Content types

- **Docs** (`content/docs/`) — sidebar tree (by `weight`), breadcrumbs, table of contents, prev/next.
- **Blog** (`content/blog/`) — tags, RSS (built in), pagination, reading time.
- **Changelog** (`content/changelog/`) — timeline list; give each entry a `version` param.
- **Everything else** — plain pages via `_default/single.html` and `_default/list.html`.

Section templates are picked automatically from a page's section name — no front matter switch needed.

## Shortcodes

`callout`, `card`/`cards`, `button`, `terminal`, `stat`/`stats`, `quote`, `tag`,
`badge`, `steps`/`step`. See `src/exampleSite/content/docs/shortcodes.md` for
live usage of each. Code fences get syntax highlighting, a copy button, and
an optional filename automatically — no shortcode needed:

````
```go {filename="main.go"}
...
```
````

## Search

A ~100-line hand-rolled inverted-index search in `src/assets/js/search.js`
reads a generated `/index.json`. No Lunr/Algolia/Pagefind — kept
dependency-free and auditable. Trigger it from the header search box,
`Cmd/Ctrl+K`, or `/`. Swap in a different engine by replacing `search.js` and
the `SearchIndex` output format if your content library outgrows this.

## AI-readable documentation and MCP

The example site publishes Markdown alternatives, `/llms.txt`, and a bounded
`/llms-full.txt` from the versioned product contract. A dependency-free,
read-only stdio MCP server projects the same generated contract, pages, tokens,
and provenance without exposing repository files. See
`mcp/product-mcp/README.md` and the example site's **AI discovery and product
MCP** guide.

## Light/dark mode

Driven by `[data-theme="dark"]` on `<html>`, matching the brand system's own token overrides in `colors_and_type.css`. Defaults to `prefers-color-scheme`; the header toggle persists an explicit choice to `localStorage`.

## Brand provenance and fonts

The theme pins `projectious-work/brand` v2.1.1 and records source revisions,
transformations, licences, and SHA-256 hashes in
`src/data/brand-provenance.json`. Run `scripts/check-brand-provenance.py` to
detect unexplained drift.

Brand fonts are bundled as version-pinned WOFF2 files; generated pages make no
font-CDN requests. Set `params.fonts = "system"` to use the network-free system
font profile. Full provenance and regeneration instructions are available in
the example site's **Brand provenance and fonts** guide.

## Comments

Set `params.giscus.repo` (+ `repoId`, `categoryId`) in `hugo.toml` to enable giscus on docs/blog pages. Leave `repo` empty to omit comments entirely. Disable per-page with `comments: false` in front matter.

## i18n

`src/i18n/en.toml` and `src/i18n/de.toml` ship as a working example — add more
languages the normal Hugo way (`languages.xx` in config + `i18n/xx.toml`).

## Building & deploying the demo site

All local, no GitHub Actions:

- `scripts/verify.sh` — canonical local verification: identity, provenance,
  contract, deterministic outputs, full example, minimal consumer, local links,
  semantics, and product MCP tests.
- `scripts/serve.sh` — watch/serve `src/exampleSite` at
  `http://0.0.0.0:1313` (override with `PORT`/`BASE_URL`). Forward the port
  from the dev container to your host to preview.
- `scripts/build.sh [dest]` — production build of `src/exampleSite` into
  `public/` (or `dest`).
- `scripts/deploy.sh` — builds, then force-pushes the output to the `gh-pages` branch via a local git worktree and enables GitHub Pages on that branch if it isn't already (needs `gh` auth with repo admin access).

Contributor workflow, versioning, releases, and hotfixes are documented in
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## What's deliberately not included

No JS framework, no CSS preprocessor, no icon font/CDN dependency (a small
hand-drawn SVG icon set lives in `src/layouts/partials/icon.html`), no
analytics. Add these yourself if you need them — kept out to keep the theme
lean.
