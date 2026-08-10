---
title: "Configuration"
description: "Theme behavior, controlled from hugo.toml."
weight: 2
---

Theme behavior is controlled through `hugo.toml` params — no theme fork required.

| Param | Purpose |
|---|---|
| `params.description` | Default meta description, used when a page has none. |
| `params.search.placement` | `"header"` (default) or `"none"` to hide the search box. |
| `params.giscus.repo` | GitHub repo for comments. Leave empty to disable comments site-wide. |
| `params.social` | List of `{name, url}` links rendered in the footer. |
| `comments` (page front matter) | Set to `false` on a docs or blog page to hide comments there. |

{{< callout type="info" >}}
Menus come from `[[menus.main]]` in `hugo.toml`, using `pageRef` for internal links so they stay valid across languages.
{{< /callout >}}
