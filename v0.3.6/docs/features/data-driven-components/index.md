# Data-driven components

> Compose badges, card collections, data tables and application shells from Hugo data.


The theme exposes stable partials for project layouts that render structured
data. Pass dictionaries to the partials instead of copying internal markup.

## Badge

`badge.html` accepts `label`, optional `variant = "accent"`, and optional
`href`. The content shortcode delegates to the same partial.

```go-html-template
{{ partial "badge.html" (dict "label" "Ready" "variant" "accent") }}
```

## Card list

`card-list.html` accepts `items`. Each item may contain `eyebrow`, `title`,
`description`, `status = { label, variant }`, and `href`. Callers may preserve
their own group headings and reverse their data before passing each group.

```go-html-template
{{ partial "card-list.html" (dict "items" site.Data.roadmap.phases) }}
```

## Data table

`data-table.html` accepts `rows`, `columns = [{ key, label }]`, and an
accessible `label`. It uses the same responsive wrapper as Markdown tables.

```go-html-template
{{ partial "data-table.html" (dict
  "label" "Releases"
  "rows" site.Data.releases
  "columns" (slice
    (dict "key" "version" "label" "Version")
    (dict "key" "date" "label" "Released"))) }}
```

## Application shell

`app-shell.html` promotes the reference dashboard shell to a public partial.
It accepts `page`, `brand`, `navLabel`, `navGroups`, optional `footer`, and
rendered `content`. Navigation groups contain `label` and `items`; each item
accepts `label`, `url`, optional `icon`, and optional `active`.

```go-html-template
{{ partial "app-shell.html" (dict
  "page" .
  "brand" "Operations"
  "navGroups" site.Data.dashboard.navigation
  "footer" "<strong>Production</strong>"
  "content" .Content) }}
```

## Changelog badges

Changelog pages accept a front-matter `badges` array. Both list and single
layouts render it through the public badge partial.

```toml
[[badges]]
label = "stable"
variant = "accent"
```


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/docs/features/data-driven-components/index.md
