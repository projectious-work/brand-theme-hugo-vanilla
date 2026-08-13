---
title: "Content model"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/content-model/"
description: "How sections, front matter, menus, Markdown, and render hooks fit together."
---


## Sections and layouts

| Content path | Theme layout | Use it for |
|---|---|---|
| `content/_index.md` | Landing | Hero, calls to action, overview content |
| `content/docs/` | Documentation | Ordered guides with sidebar and table of contents |
| `content/blog/` | Blog | Dated article index and long-form posts |
| `content/changelog/` | Changelog | Versioned release timeline |
| Any other section | Default | Pages and card-based section indexes |

## Front matter

```yaml {filename="content/docs/example.md"}
---
title: "Example guide"
description: "A one-sentence summary used in navigation and metadata."
weight: 20
comments: false
---
```

Blog posts also use `date` and `tags`. Changelog entries use `date` and
`version`. The landing page accepts `eyebrow`, `tagline`, and a `cta` list.

## Markdown first

Headings, lists, links, tables, quotes, and fenced code remain ordinary
Markdown. Theme render hooks add stable heading links, external-link treatment,
code-block headers, filenames, and copy controls. Use a shortcode only when the
content has component semantics that Markdown cannot express.

## Assets and overrides

Put project assets in your site's `assets/` or `static/` directory. Hugo's
lookup order lets a site override any theme template by creating the same path
locally. Prefer a partial override over copying the entire theme.

## Stylesheet structure

The theme ships two stylesheets and concatenates them into one bundle.

| File | What it is |
|---|---|
| `assets/css/tokens.css` | Verbatim mirror of the brand system's `colors_and_type.css` — every token, the base element styles, the opt-in accessibility layer |
| `assets/css/main.css` | The theme's component layer. Composes tokens; declares none |

Token values are generated upstream from `brand.yaml`. Re-sync `tokens.css` by
copying the file; never edit a value in place, and never redeclare one in
`main.css`. A component that needs a colour the brand system does not have is
a signal to change the brand system, not the theme.

Scale steps and semantic triples swap with the colour mode. Anything painted
onto a surface that does not swap — the midnight hero, dark panels, the
terminal — uses the mode-pinned ramps (`--midnight-light-*`,
`--midnight-dark-*`, `--terminal-*`) so it reads the same in both modes.

