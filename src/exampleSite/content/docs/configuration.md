---
title: "Configuration"
description: "Menus, search, comments, social links, code highlighting, and site metadata."
weight: 3
---

## Site parameters

| Parameter | Purpose |
|---|---|
| `params.description` | Default description for metadata and search results. |
| `params.search.placement` | `header` or `none`. |
| `params.giscus.repo` | Repository used for comments; empty disables comments. |
| `params.social` | Footer links with `name` and `url`. |
| `params.fonts` | `bundled` (default) or network-free `system`. |
| `params.accessibility.*` | Opt-in accessibility attributes — see below. |
| Page `comments` | Set `false` to suppress comments on one page. |

## Accessibility attributes

The brand system ships its accessibility layer as opt-in attributes on
`<html>`. The theme enables the three that new work is expected to set, and
each one is configurable.

```toml {filename="hugo.toml"}
[params.accessibility]
auto = true             # data-a11y="auto" — follow OS motion, contrast, transparency
focus = "strong"        # data-focus="strong" — the WCAG 1.4.11 conforming ring
linkUnderline = true    # data-link-underline="on" — link identity is not colour alone
```

Set `focus = ""` to fall back to the brand system's documented default ring.
That ring measures ~1.2:1 and does not meet WCAG 1.4.11, so leave `strong`
in place unless you have a reason not to.

Readers can layer the remaining attributes themselves —
`data-font-size`, `data-contrast`, `data-text-spacing` and `data-theme` all
work against the theme because the token sheet is mirrored verbatim from the
brand system.

## Fonts

The default `params.fonts = "bundled"` profile serves the pinned brand WOFF2
files locally. Set `params.fonts = "system"` to select platform sans-serif and
monospace stacks without requesting the bundled files. Components always use
the semantic `--font-heading`, `--font-body`, and `--font-code` tokens.

## Main navigation

```toml {filename="hugo.toml"}
[[menus.main]]
name = "Docs"
pageRef = "/docs"
weight = 10
```

Use `pageRef` for internal destinations so Hugo resolves language and base URL
correctly. Keep labels in sentence case.

## Search output

```toml {filename="hugo.toml"}
[outputs]
home = ["HTML", "SearchIndex"]

[outputFormats.SearchIndex]
mediaType = "application/json"
baseName = "search-index"
isPlainText = true
```

## Syntax highlighting

Set `markup.highlight.noClasses = false`. The theme's Chroma role mapping then
applies the brand syntax palette to fenced code blocks.
