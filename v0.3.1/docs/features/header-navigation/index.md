# Header and navigation

> Configure primary links, repository actions, search and header controls.


The header contains the brand link, primary menu, search, version and language
menus, accessibility and colour controls, and an optional repository link. On wide
screens it aligns with the documentation shell; on narrow screens documentation
navigation moves into a drawer.

## Primary links

Use Hugo menus in `hugo.toml`:

```toml
[[menus.main]]
  name = "Documentation"
  pageRef = "/docs"
  weight = 10

[[menus.main]]
  name = "Blog"
  pageRef = "/blog"
  weight = 20
```

Prefer `pageRef` for site pages and `url` for external destinations. Ordering is by
`weight`.

## Header icons and links

`params.github` adds the bundled GitHub icon with an accessible label. For another
service, add an icon SVG below `assets/icons/` and extend `partials/header.html`
with an `.iconbtn` link using `partials/icon.html`. Keep the link at least 44 by 44
CSS pixels and provide an `aria-label`.

See [Bundled icons](../developer-guide.md#bundled-icons) for the complete icon list.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/docs/features/header-navigation/index.md
