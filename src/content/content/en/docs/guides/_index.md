+++
title = "Content authoring guide"
linkTitle = "Guides"
overviewTitle = "Content authoring guide"
description = "Write pages, links, code, diagrams, recordings and notebook output with Hugo-friendly Markdown."
weight = 40
icon = "book"
+++

This guide is the authoritative walkthrough for authors. It uses examples from the
theme itself rather than an invented product or command-line interface.

## Create and order pages

Create a Markdown file below `content/docs/`. Use a leaf bundle when the page owns
images or downloads:

```text
content/docs/operations/
├── index.md
├── architecture.png
└── terminal.cast
```

The common front matter is deliberately small:

```toml
+++
title = "Operations"
description = "How to operate the service."
weight = 30
icon = "book"
+++
```

`weight` controls sidebar, overview-card and previous/next order. A section's child
cards are generated from `title`, `description`, `icon` and `weight`.

## Link within and between pages

Hugo generates heading IDs from heading text. Link to a heading on the current page
with a fragment:

```md
[Jump to recordings](#terminal-recordings)
```

For another page, use the Markdown filename plus the heading fragment:

```md
[Output formats](../configuration/site-wide.md#output-formats)
[Search configuration](../features/search.md#configuration)
```

The theme's link render hook resolves Markdown paths through Hugo page objects. If
the target page moves, the build fails instead of silently publishing a broken
link. Use ordinary `https://` links for external sites.

## Code and terminal output

Use fenced code for source that readers may copy. Add `filename`, line numbers or
highlighted lines through fence attributes. Use the terminal shortcode for a
captured command interaction:

{{< terminal title="local preview" >}}
$ hugo --minify
✓ Content validated
✓ Search index generated
⚠ Review two external links
Build completed in 284 ms
{{< /terminal >}}

```md
{{</* terminal title="local preview" */>}}
$ hugo --minify
✓ Content validated
✓ Search index generated
⚠ Review two external links
Build completed in 284 ms
{{</* /terminal */>}}
```

Language fences show syntax colours without a shortcode. This is the common form
most authors need:

```python {filename="report.py"}
from pathlib import Path

pages = list(Path("content").rglob("*.md"))
print(f"{len(pages)} pages ready")
```

````md
```python {filename="report.py"}
from pathlib import Path

pages = list(Path("content").rglob("*.md"))
print(f"{len(pages)} pages ready")
```
````

```toml {filename="hugo.toml"}
[params]
  codeTheme = "adaptive"
  sidebarOpenDepth = 1
```

````md
```toml {filename="hugo.toml"}
[params]
  codeTheme = "adaptive"
  sidebarOpenDepth = 1
```
````

For line numbers, highlighted lines, anchors and site-wide defaults, see the
[Code blocks feature guide](../features/code-blocks.md).

## Diagrams and mathematics

Use a `mermaid` fence for a diagram and enable `math = true` when a page needs
KaTeX. See [Diagrams](../features/diagrams.md) and
[Mathematics](../features/mathematics.md) for live previews, raw Markdown,
configuration, and colour-mode behaviour.

## Terminal recordings

Embed a `.cast` file with the `asciinema` shortcode. See
[Terminal recordings](../features/terminal-recordings.md) for recording,
storage, player options, and a live preview.

## Jupyter notebooks

Embed a converted notebook with the `notebook` shortcode. See
[Jupyter notebooks](../features/jupyter-notebooks.md) for the conversion
environment, source restrictions, lookup rules, and a live preview.
