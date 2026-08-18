+++
title = "Header and navigation"
description = "Configure primary links, repository actions, search and header controls."
weight = 100
icon = "menu-2"
+++

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
  name = "Change log"
  pageRef = "/changelog"
  weight = 20
```

Prefer `pageRef` for site pages and `url` for external destinations. Ordering is by
`weight`.

Set `params.activeSection` on a menu entry when it owns an entire section. This
prevents a direct shortcut and its parent section from both appearing active:

```toml
[[menus.main]]
  name = "Documentation"
  pageRef = "/docs"
  [menus.main.params]
    activeSection = "docs"
```

Below 30rem the wordmark collapses automatically while the linked brand mark and
accessible name remain available.

## Sidebar groups

Documentation section groups are collapsed on a reader's first visit. Configure
the number of initially open levels below `[params]`:

```toml {filename="hugo.toml"}
[params]
  sidebarOpenDepth = 0 # 0 closes all; 1 opens top-level groups.
```

The small **Expand all** or **Collapse all** button beside the sidebar title
changes every group at once. Opening or closing an individual group stores the
complete tree state in browser-local storage, scoped to the site and language.
That reader state takes precedence over `sidebarOpenDepth` on later page loads,
so following links does not reset the tree. Filtering opens matching groups only
temporarily and restores the stored state when the query is cleared.

## Header icons and links

`params.github` adds the bundled GitHub icon with an accessible label. For another
service, add an icon SVG below `assets/icons/` and extend `partials/header.html`
with an `.iconbtn` link using `partials/icon.html`. Keep the link at least 44 by 44
CSS pixels and provide an `aria-label`.

See [Bundled icons](../developer-guide.md#bundled-icons) for the complete icon list.
