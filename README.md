# brand-theme-hugo-vanilla — v0.3.2

A Hugo theme implementing the **projectious.work** brand system for documentation,
change logs, taxonomy and marketing pages. Content authors write Markdown and shortcodes;
the theme owns every piece of markup.

Requires Hugo **0.128.0+**. Node is needed only for the Tailwind v4 step.

## Install

```toml
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build]
  [build.buildStats]
    enable = true   # Tailwind v4 reads Hugo's class inventory
```

```sh
npm install       # @tailwindcss/cli, used through css.TailwindCSS
hugo server
```

No Node available? Set `params.build.tailwind = false`. Hugo then serves the brand
tokens plus the theme's component CSS unprocessed — utility classes stop resolving,
every page in the theme still renders.

Copy the `[outputFormats]`, `[outputs]` and `[markup]` blocks from
`src/content/hugo.toml`: the `SearchIndex` format powers search, `Print` powers the
whole-section print view, and `[markup]` enables Chroma classes, the table of
contents and math passthrough.

## What it does

| Feature | Where it lives |
|---|---|
| Light / dark / system mode | `assets/js/theme.js`, `partials/mode-menu.html` |
| Two darks in the mode menu | Light · Dark navy (default) · Dark deep · System — `assets/js/theme.js` sets `data-theme` + `data-surface` |
| Auto-generated hierarchical sidebar | `partials/sidebar.html`, `sidebar-tree.html` (ordered by `weight`) |
| Table of contents, active-heading tracking | `partials/toc.html` + IntersectionObserver in `interactions.js` |
| Breadcrumbs, prev/next, heading permalinks | `partials/breadcrumbs.html`, `pager.html`, `_markup/render-heading.html` |
| Full-text search | `layouts/index.searchindex.json` → `assets/js/search.js` (FlexSearch, vendored) |
| Search page | `content/search.md` with `layout = "search"` |
| Multilingual + language selector | `i18n/`, `partials/lang-menu.html` |
| Version selector | `params.versions`, `partials/version-menu.html` — keeps the reader's path across versions |
| Structured data + social cards | `partials/schema.html` — TechArticle, BlogPosting, WebSite and breadcrumbs |
| Change log, taxonomy, landing, 404 | `layouts/changelog/`, `_default/terms.html`, `term.html`, `index.html`, `404.html` |
| Multilingual edit links + feedback | `partials/edit-link.html`, `feedback.html` |
| Print a whole docs section | `Print` output format → `_default/list.print.html` + `assets/css/print.css` |
| Jupyter notebooks | `scripts/notebooks.sh` (nbconvert) → `{{< notebook "name" >}}` |
| robots.txt · sitemap · hreflang | `layouts/robots.txt`, `sitemap.xml`, `partials/seo.html` |
| Syntax highlighting | Chroma classes mapped to the ten brand syntax roles in `assets/css/syntax.css`; fence options are preserved |
| Accessibility selectors | `partials/a11y-menu.html` driving the brand system's `data-*` switches |
| Icons | Tabler 3.31.0 mount with `assets/icons/fallback/*.svg` offline fallback; inlined by `partials/icon.html` |
| Child-page card grids | `partials/child-cards.html` — generated from title, description, icon and weight |
| RTL layout | Set the language direction to `rtl`; navigation and structural rails mirror automatically |

## Content components

`callout` · `cards`/`card` · `tabs`/`tab` · `steps`/`step` · `details` ·
`filetree`/`folder`/`file` · `icon` · `badge` · `button` · `terminal` · `term` ·
`mermaid` · `math` · `asciinema` · `notebook`

The [Features](https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/features/)
section is the live gallery: every component has a rendered example, copyable
Markdown and usage guidance. Fenced code blocks get a filename bar, language label
and copy button with no shortcode:

    ```yaml {filename="pipeline.yaml"}
    name: onboarding-audit
    ```

Terminology comes from `data/glossary.yaml`, so `{{< term "policy" >}}` stays a
one-word edit in Markdown.

## Structure

```
src/archetypes/   new-content templates (default, docs, release)
src/assets/css/   main.css (Tailwind entry) · brand-tokens · fonts · theme-layer · syntax · components
src/assets/icons/ bundled fallback glyphs; the full Tabler set is mounted at build time
src/assets/js/    theme.js · interactions.js · search.js · vendor/flexsearch
src/data/         glossary.yaml · pinned CDN versions in cdn.yaml
src/i18n/         en.toml · de.toml · fr.toml
src/layouts/      _default · docs · changelog · index · 404 · search index
src/static/       fonts (WOFF2, OFL) · logo
src/content/      example site (module replace back to the repo root)
```

## Third-party runtime assets

KaTeX 0.18.4, Mermaid 11.16.1 and asciinema-player 3.17.0 load from
exact version URLs declared in `src/data/cdn.yaml`. Set
`params.selfHostAssets = true` and mirror those files under
`static/vendor/<package>/` for deployments that prohibit public CDNs. Nothing
is downloaded or locally bundled by the theme build.

These CDN resources do not claim Subresource Integrity: KaTeX and asciinema are
multi-file runtimes that fetch sibling assets, so hashing only an entry file
would not provide complete integrity. Theme-owned CSS and JavaScript are
fingerprinted with integrity metadata by Hugo Pipes.

The bundled icon and font assets do not make third-party requests.

See [TESTING.md](TESTING.md) for the upstream assertion checklist and known
version-matrix gap. [CONTRACT-feedback.md](CONTRACT-feedback.md) defines the
optional feedback endpoint; client-side throttling is not a security control.

The example documentation includes the complete [feature
catalogue](src/content/content/en/docs/features/_index.md), [maintenance and
upgrade guide](src/content/content/en/docs/maintenance.md), [developer
guide](src/content/content/en/docs/developer-guide.md), and a human-readable
[dependency inventory and SBOM](src/content/content/en/docs/dependencies.md).
Project policies live in [CONTRIBUTING.md](CONTRIBUTING.md),
[SECURITY.md](SECURITY.md), [SUPPORT.md](SUPPORT.md),
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [LICENSE](LICENSE).

Consuming sites can copy `scripts/check-theme-update.sh` from a release. It checks
their installed Hugo Module against upstream SemVer tags without changing files;
the explicit `--update` mode updates and tidies the module after release notes have
been reviewed.

## Notes and deliberate deviations

- **Active-heading tracking uses IntersectionObserver, not Bootstrap ScrollSpy.**
  ScrollSpy would pull Bootstrap's JS and CSS reset in alongside Tailwind; the
  observer is ~20 lines and behaves the same.
- **KaTeX, Mermaid and asciinema-player load only on pages that use them.**
  Their versions are centralized in `src/data/cdn.yaml`.
- **Fonts are bundled** as version-pinned WOFF2 (SIL OFL 1.1, licences under
  `static/fonts/licenses/`). Generated pages make no font-CDN request.
- **Icons** resolve from a site override, the pinned Tabler Icons 3.31.0 outline
  mount and then 38 bundled fallback glyphs. See [ICONS.md](ICONS.md).
- **Notebooks convert before the build.** `scripts/notebooks.sh` uses the pinned
  environment in `scripts/requirements.txt`; the theme consumes only the
  resulting Markdown and images.
