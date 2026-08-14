# brand-theme-hugo-vanilla — v0.3.0

A Hugo theme implementing the **projectious.work** brand system for documentation,
blog, taxonomy and marketing pages. Content authors write Markdown and shortcodes;
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
| Version selector | `params.versions`, `partials/version-menu.html` |
| Blog, taxonomy, landing, 404 | `layouts/blog/`, `_default/terms.html`, `term.html`, `index.html`, `404.html` |
| Edit-on-GitHub + feedback widget | `partials/page-footer.html`, `feedback.html` |
| Print a whole docs section | `Print` output format → `_default/list.print.html` |
| Syntax highlighting | Chroma classes mapped to the ten brand syntax roles in `assets/css/syntax.css` |
| Accessibility selectors | `partials/a11y-menu.html` driving the brand system's `data-*` switches |
| Icons | `assets/icons/*.svg`, inlined by `partials/icon.html` — bundled, no CDN |

## Shortcodes

`callout` · `cards`/`card` · `tabs`/`tab` · `steps`/`step` · `details` ·
`filetree`/`folder`/`file` · `icon` · `badge` · `button` · `terminal` · `term` ·
`mermaid` · `math`

`src/content/content/docs/shortcodes.md` is the live gallery — every shortcode with
the Markdown that produces it. Fenced code blocks get a filename bar, language
label and copy button with no shortcode:

    ```yaml {filename="pipeline.yaml"}
    name: onboarding-audit
    ```

Terminology comes from `data/glossary.yaml`, so `{{< term "policy" >}}` stays a
one-word edit in Markdown.

## Structure

```
src/archetypes/   new-content templates (default, docs, blog)
src/assets/css/   main.css (Tailwind entry) · brand-tokens · fonts · theme-layer · syntax · components
src/assets/icons/ bundled stroke icon set
src/assets/js/    theme.js · interactions.js · search.js · vendor/flexsearch
src/data/         glossary.yaml
src/i18n/         en.toml · de.toml
src/layouts/      _default · docs · blog · index · 404 · search index
src/static/       fonts (WOFF2, OFL) · logo
src/content/      example site (module replace back to the repo root)
```

## Notes and deliberate deviations

- **Active-heading tracking uses IntersectionObserver, not Bootstrap ScrollSpy.**
  ScrollSpy would pull Bootstrap's JS and CSS reset in alongside Tailwind; the
  observer is ~20 lines and behaves the same.
- **KaTeX and Mermaid load from jsDelivr**, per page, only when used. Vendor them
  into `assets/` if the site must issue no third-party requests.
- **Fonts are bundled** as version-pinned WOFF2 (SIL OFL 1.1, licences under
  `static/fonts/licenses/`). Generated pages make no font-CDN request.
- **Icons** are authored on Tabler's conventions (24 px grid, 1.5 px stroke, round
  caps) and ship in-repo; drop Tabler's `icons/outline/*.svg` into
  `assets/icons/` to swap in the full MIT set.
- **Not included yet:** Jupyter notebook rendering and the Asciinema player were
  marked optional and are out of this cut.
