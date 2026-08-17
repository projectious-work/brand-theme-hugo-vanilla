+++
title = "Links"
description = "Create base-path-safe links within and between Hugo pages."
weight = 170
icon = "link"
+++

Ordinary Markdown links resolve against the deployment base path. Prefer
Hugo-aware content references when a moved target should fail the build:

```md
[Configuration](../configuration/_index.md)
[Output formats](../configuration/site-wide.md#output-formats)
[Link within a page](#links)
```

External links open in a new tab with safe relationship attributes and an icon.
See the [content authoring guide](../guides/_index.md#link-within-and-between-pages)
for fragment and cross-language examples.
