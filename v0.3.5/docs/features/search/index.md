# Search

> How the generated search index, header search and command palette work.


Search is local and requires no hosted service. Hugo writes `/index.json`; the
browser loads the bundled FlexSearch runtime only on pages where search is enabled.
Each page contributes its title, description, breadcrumb, tags, content and H2/H3
headings, so a heading result links directly to its anchor.

## Reader experience

- Type in the header field or press `/` to focus it.
- Press `Ctrl`/`Cmd`+`K` for the command palette.
- Filter the dedicated search page by top-level section.
- Use arrow keys and Enter to select a result.

## Configuration

Copy the `SearchIndex` output format and add it to `outputs.home`, as shown in
[Configuration](../configuration/site-wide.md#output-formats). Create `content/search.md`
with `layout = "search"`. Set `params.search = false` to remove the header field,
index and search page integration.

Set `private = true` on a page to omit it from search and the sitemap. This is
publication control, not access control: do not put secrets in a static site.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/features/search/index.md
