+++
title = "Tags"
description = "Use Hugo taxonomies for related-content and release-note metadata."
weight = 20
icon = "tag"
+++

Tags are ordinary Hugo taxonomy terms. Add them to front matter:

```toml
tags = ["release", "accessibility"]
```

The theme renders tags in page metadata and generates Hugo's term and taxonomy
pages. Tags are also included in the search index. The example site deliberately
does not place a Tags link in the primary header; link to a curated term from your
content when it helps readers, or add `/tags/` to your own menu.

Configure a different taxonomy through Hugo's `[taxonomies]` table and provide the
corresponding templates if its presentation differs from tags.
