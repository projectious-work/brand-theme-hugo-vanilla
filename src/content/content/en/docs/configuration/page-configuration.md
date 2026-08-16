+++
title = "Page configuration (front matter)"
description = "Control navigation, cards, tables of contents and optional page capabilities."
weight = 20
icon = "file-settings"
+++

Front matter is the TOML block between `+++` delimiters at the beginning of a
Markdown file. These values affect only that page or section.

```toml
+++
title = "API reference"       # Required page title.
linkTitle = "API"             # Optional shorter navigation label.
description = "HTTP API."     # Summary, metadata and search excerpt.
weight = 20                    # Navigation and previous/next order.
icon = "code"                 # Icon on a generated child-page card.
toc = true                     # Show the right-hand table of contents.
cards = true                   # Generate cards for child pages on a section.
hidden = false                 # Include this child in generated cards.
math = false                   # Load KaTeX only when this page needs it.
private = false                # Include the page in search and sitemap.
cover = "/img/api.png"         # Optional blog cover image.
coverAlt = "API response"      # Required alternative text for the cover.
+++
```

## Complete key reference

| Key | Type and default | Effect |
|---|---|---|
| `title` | string, required | Page title and default navigation label |
| `linkTitle` | string, title | Shorter navigation label |
| `description` | string, empty | Lede, SEO description and search excerpt |
| `weight` | integer, `0` | Sidebar, card and previous/next order |
| `icon` | Tabler name, page icon | Generated overview-card icon |
| `toc` | boolean, `true` | Show or hide heading navigation |
| `cards` | boolean, `true` | Generate cards for children of a section |
| `hidden` | boolean, `false` | Exclude a child from generated cards |
| `math` | boolean, `false` | Load KaTeX on this page |
| `private` | boolean, `false` | Exclude from search and sitemap when true |
| `cover` | path, unset | Blog cover image |
| `coverAlt` | string, empty | Alternative text for the cover image |

Use quotes for strings, plain integers for weights, and `true` or `false` for
booleans. The values shown in the type column are defaults, not placeholders.
