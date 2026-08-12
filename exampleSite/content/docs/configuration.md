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
| Page `comments` | Set `false` to suppress comments on one page. |

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
