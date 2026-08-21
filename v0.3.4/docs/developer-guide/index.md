# Developer guide

> Adapt the theme, swap bundled assets, run tests and contribute changes safely.


Theme consumers should override files through Hugo Modules or their project layout
instead of editing a cached module. Contributors to this repository work below
`src/`; release and deployment scripts intentionally remain outside that tree.

## Repository structure

```text
src/assets/       CSS, JavaScript and inline SVG icons
src/layouts/      Hugo templates, partials, render hooks and shortcodes
src/i18n/         interface translations
src/data/         glossary and pinned runtime metadata
src/static/       fonts, logos and licences
src/content/      executable multilingual example site
scripts/          local build, verification, release and deployment commands
tests/browser/    Playwright behavior and visual baselines
```

## Override or adapt a template

Hugo's lookup order gives the consuming site's `layouts/` precedence over module
templates. Copy only the partial or template you need to change and preserve its
public parameters. This limits the merge work required during upgrades.

CSS variables in `brand-tokens.css` are the stable styling surface. Put site-level
overrides in a later stylesheet rather than changing component selectors whenever
possible.

### Append site-owned CSS and JavaScript

Do not override the theme's complete `styles.html` or `scripts.html` pipelines.
Create `layouts/partials/hooks/styles-end.html` or
`layouts/partials/hooks/scripts-end.html` in your site instead. The theme calls
these public, empty-by-default hooks after its own assets in both Tailwind and
Hugo-only builds.

For example, compile `assets/scss/site.scss`, then fingerprint it and emit SRI:

```go-html-template
{{ with resources.Get "scss/site.scss" }}
  {{ $built := . | css.Sass (dict "targetPath" "css/site.css") | minify | fingerprint "sha384" }}
  <link rel="stylesheet" href="{{ $built.RelPermalink }}"
    integrity="{{ $built.Data.Integrity }}" crossorigin="anonymous">
{{ end }}
```

Build and protect `assets/js/site.js` the same way:

```go-html-template
{{ with resources.Get "js/site.js" }}
  {{ $built := . | js.Build (dict "minify" hugo.IsProduction "target" "es2018") | fingerprint "sha384" }}
  <script src="{{ $built.RelPermalink }}" integrity="{{ $built.Data.Integrity }}"
    crossorigin="anonymous" defer></script>
{{ end }}
```

The complete public contract is in the root `API.md`.

## Icons and Tabler

The theme currently bundles this small offline fallback set:

`accessible`, `alert-circle`, `alert-triangle`, `arrow-left`, `arrow-right`,
`book`, `brand-github`, `check`, `chevron-down`, `chevron-left`, `chevron-right`,
`chevron-up`, `circle-check`, `clock`, `copy`, `device-desktop`, `external-link`,
`file`, `file-code`, `folder`, `info-circle`, `language`, `list`, `menu-2`, `moon`,
`pencil`, `player-play`, `printer`, `search`, `star`, `sun`, `tag`, `thumb-down`,
`thumb-up`, `versions` and `x`.

The fallback source files are in
[`src/assets/icons/fallback/`](https://github.com/projectious-work/brand-theme-hugo-vanilla/tree/main/src/assets/icons/fallback).
Use a name with `{{</* icon "search" */>}}` or front-matter `icon = "search"`.
The resolver checks a site override, the mounted Tabler outline library and then
the bundled fallback. Install the pinned library and mount it in `hugo.toml`:

```sh
npm install --save-exact @tabler/icons@3.31.0
```

```toml
[[module.mounts]]
  source = "node_modules/@tabler/icons/icons/outline"
  target = "assets/tabler-icons/outline"
```

Every [Tabler outline icon](https://tabler.io/icons) is then available by its
filename without `.svg`. A site can still override or add a glyph at
`assets/icons/<name>.svg`. See the root `ICONS.md` for resolution order, naming and
MIT attribution.

This icon is resolved from the mounted full library rather than the fallback set:

{{< icon name="rocket" class="ico--lg" label="Rocket from Tabler Icons" >}}

```md
{{</* icon name="rocket" class="ico--lg" label="Rocket from Tabler Icons" */>}}
```

## Tailwind in site templates

Content Markdown should not contain presentation classes. Site-owned layouts and
shortcodes may use the theme's Tailwind namespaces and CSS tokens. See
[Tailwind and design tokens](features/tailwind.md) for the complete mapped utility
surface, token categories and a working component example.

## Swap fonts or runtime assets

Font faces live in `src/static/fonts/`; declarations live in `fonts.css`. Replace
both files and licence documents together, then test layout at 200% text size.

KaTeX, Mermaid and asciinema pins live in `src/data/cdn.yaml`. For offline hosting,
mirror the exact file structure below `static/vendor/` and enable
`params.selfHostAssets`. See [Dependencies and SBOM](dependencies.md).

## Build and test

```sh
npm install
./scripts/build.sh
./scripts/verify.sh
./scripts/serve-watch.sh start
```

`build.sh` performs two Hugo passes because Tailwind consumes Hugo's generated
class inventory. `verify.sh` compares two output trees, validates base-path links
and runs Playwright at desktop and mobile sizes.

When an intentional visual change fails a snapshot, inspect the actual and diff
images first. Only then run `npx playwright test --update-snapshots` and review the
new files.

## Contribute

Create a short-lived branch from `main`, use Conventional Commits, add tests for
behavior changes, run verification locally and open a pull request referencing its
work item. Do not add GitHub Actions: this repository's release policy is explicitly
local-only. See the root `CONTRIBUTING.md` for the complete workflow.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.4/docs/developer-guide/index.md
