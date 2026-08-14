+++
title = "Configuration"
description = "Site parameters the theme reads, and what each one changes."
weight = 30
tags = ["reference"]
+++

## Parameters

| Parameter | Effect |
|---|---|
| `params.version` | Label shown in the version selector and the footer |
| `params.versions` | List of `{label, url, note}` entries for the selector |
| `params.editURL` | Prefix for edit-on-GitHub links; the page path is appended |
| `params.github` | Repository link in the header |
| `params.search` | `false` removes the index, the header box and `/search` |
| `params.feedback` | `false` hides the page feedback widget |
| `params.feedbackEndpoint` | POST target for feedback votes; omitted means local only |
| `params.accessibilityMenu` | `false` hides the accessibility selector |
| `params.math` | `true` loads KaTeX site-wide instead of per page |
| `params.build.tailwind` | `false` skips the Tailwind CLI step |
| `params.darkSurface` | Server-rendered default before JS runs; `"navy"` matches the menu default |

## Front matter

| Key | Effect |
|---|---|
| `weight` | Sidebar and prev/next order |
| `description` | Lede paragraph, meta description, search index |
| `icon` | Icon on section index cards |
| `toc` | `false` hides the table of contents |
| `math` | `true` loads KaTeX for this page |
| `private` | `true` keeps the page out of the search index |
| `layout` | `search` renders the search results page |

## Versioned documentation

The selector is a list of URLs, so each version is a separate build published
under its own prefix. Nothing in the theme rewrites links between versions.

{{< callout type="note" >}}
Keep the newest version at the site root and archive older ones under
`/v0.2/`, `/v0.1/`. That keeps canonical URLs stable for search engines.
{{< /callout >}}
