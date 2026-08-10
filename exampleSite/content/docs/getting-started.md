---
title: "Getting started"
description: "Install the theme and run the dev server."
weight: 1
---

Install the theme as a Hugo module or git submodule, then run the dev server.

{{< terminal >}}
$ git submodule add https://github.com/projectious-work/hugo-theme-projectious.git themes/hugo-theme-projectious
$ hugo server
✓ Watching for changes
● Web Server is available at http://localhost:1313/
{{< /terminal >}}

{{< callout type="info" >}}
Set `theme = "hugo-theme-projectious"` in your `hugo.toml`.
{{< /callout >}}

## Configuration

Copy the `[outputs]`, `[outputFormats.SearchIndex]`, and `[markup]` blocks from `exampleSite/hugo.toml` into your own site config — they power search and syntax highlighting.

## Writing content

Sections named `docs`, `blog`, and `changelog` pick up their dedicated layouts automatically. Everything else falls back to a plain page. Front matter stays minimal — `weight` orders docs pages, `date`/`tags` drive the blog, `version` labels a changelog entry.
