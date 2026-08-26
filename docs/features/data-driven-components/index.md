# Data-driven components

> Compose badges, card collections and data tables from Hugo data.


The theme exposes stable partials for layouts and matching content shortcodes
for Markdown authors. Both accept structured data without copying internal
markup. Sources can be:

- inline CSV, JSON, TOML, YAML or XML inside a paired shortcode;
- a file in `assets/` or beside `index.md` in a page bundle; or
- an HTTP(S) URL fetched and cached by Hugo during the build.

Remote data is a build dependency, not a browser request. Pin a durable URL and
keep a local fallback when reproducibility matters.

## Badge

`badge.html` accepts `label`, optional `variant = "accent"`, and optional
`href`. A badge communicates compact metadata such as lifecycle, availability
or compatibility. It should not replace a button or carry a long sentence.

{{< badge label="Ready" variant="accent" >}}

```go-html-template
{{ partial "badge.html" (dict "label" "Ready" "variant" "accent") }}
```

For a list controlled by data, put this in `assets/data/component-badges.yaml`:

```yaml
- label: Stable
  variant: accent
- label: Accessible
- label: Build-time data
  href: /docs/features/data-driven-components/
```

Then render the file from Markdown:

{{< data-badges src="data/component-badges.yaml" >}}{{< /data-badges >}}

```md
{{</* data-badges src="data/component-badges.yaml" */>}}{{</* /data-badges */>}}
```

For remote YAML, replace `src` with `url` and state the format because remote
servers do not always send a useful content type:

```md
{{</* data-badges url="https://example.org/statuses.yaml" format="yaml" */>}}{{</* /data-badges */>}}
```

## Card list

`card-list.html` accepts `items`. Each item may contain `eyebrow`, `title`,
`description`, `status = { label, variant }`, and `href`. For example,
`assets/data/roadmap.json` contains a top-level `phases` array:

```json
{
  "phases": [
    {
      "eyebrow": "Now",
      "title": "Graphics foundations",
      "description": "Accessible SVG, bitmap figures and CSV charts.",
      "status": { "label": "Ready", "variant": "accent" },
      "href": "/docs/features/diagrams/"
    }
  ]
}
```

{{< card-list src="data/roadmap.json" key="phases" >}}{{< /card-list >}}

```md
{{</* card-list src="data/roadmap.json" key="phases" */>}}{{</* /card-list */>}}
```

In a layout template, load the same global resource explicitly:

```go-html-template
{{ $roadmap := resources.Get "data/roadmap.json" | transform.Unmarshal }}
{{ partial "card-list.html" (dict "items" $roadmap.phases) }}
```

`site.Data.roadmap.phases` is also valid when the source is JSON, YAML, TOML or
XML at `data/roadmap.*`; CSV belongs in `assets/` and is unmarshaled as shown
above. A remote array uses the same shortcode with `url`, `format` and optional
`key` arguments.

## Data table

`data-table.html` accepts row objects, column definitions and an accessible
label. The shortcode's compact `columns="key:Label,…"` syntax maps source fields
to headers. It remains the simplest choice for a static table:

```csv
version,date,status,downloads,size_mb,featured,notes
v0.3.6,2026-08-16,Stable,18420,2.46,true,/changelog/release-v0-3-6/
v0.3.5,2026-08-03,Supported,12705,2.31,false,/changelog/release-v0-3-5/
v0.3.4,2026-07-14,Archived,9341,2.18,false,/changelog/release-v0-3-4/
```

For typed formatting and interaction, define the columns separately in
`assets/data/release-columns.yaml`. This example demonstrates every supported
type:

```yaml
- key: version
  label: Version
  type: string
  sortable: true
  filter: text
- key: date
  label: Released
  type: date
  format: 02 Jan 2006
  sortable: true
  filter: date-range
- key: status
  label: Status
  type: status
  sortable: true
  filter: select
  variants:
    stable: accent
- key: downloads
  label: Downloads
  type: int
  format: "%d"
  align: right
  sortable: true
  filter: range
- key: size_mb
  label: Size
  type: float
  format: "%.1f MB"
  align: right
  sortable: true
- key: featured
  label: Featured
  type: bool
  trueLabel: Yes
  falseLabel: No
  align: center
  sortable: true
  filter: boolean
- key: notes
  label: Notes
  type: url
  linkLabel: Read notes
  align: right
  searchable: false
```

{{< data-table src="data/releases.csv"
    columns-src="data/release-columns.yaml"
    search=true sort=true filter=true
    label="Theme releases" >}}{{< /data-table >}}

```md
{{</* data-table src="data/releases.csv"
    columns-src="data/release-columns.yaml"
    search=true sort=true filter=true
    label="Theme releases" */>}}{{</* /data-table */>}}
```

`search`, `sort` and `filter` are independent and optional. Hugo always emits
the complete accessible table. When an option is enabled, the page loads a
small progressive-enhancement script that adds controls, typed sorting and a
live result count. With JavaScript unavailable, readers still receive every
row and formatted value.

Column `type` controls both rendering and comparisons:

| Type | Formatting |
|---|---|
| `string` | Optional printf string such as `Item: %s` |
| `int` | Integer printf verbs such as `%d` or `%06d` |
| `float` | Float verbs such as `%.2f` or `€ %.2f` |
| `bool` | `trueLabel` and `falseLabel` |
| `date` | Hugo/Go date layout, or `:date_medium` by default |
| `url` | Safe link with an optional `linkLabel` |
| `status` | Badge with an optional lowercase `variants` map |

`align` accepts `left`, `center` or `right`. `searchable: false` excludes a
column from global search. Filters may be `text`, `select`, `range`,
`date-range` or `boolean`; select choices are derived from the rendered rows.
Sorting uses raw typed values rather than their formatted labels.

The original compact form continues to work:

```md
{{</* data-table src="data/releases.csv"
    columns="version:Version,date:Released,status:Status"
    label="Theme releases" */>}}{{</* /data-table */>}}
```

Inline data uses the paired body and an explicit format:

```md
{{</* data-table format="csv"
    columns="version:Version,date:Released" label="Theme releases" */>}}
version,date
v0.3.6,2026-08-16
v0.3.5,2026-08-03
{{</* /data-table */>}}
```

The complete template equivalent is:

```go-html-template
{{ $source := resources.Get "data/releases.csv" }}
{{ $rows := transform.Unmarshal
    (dict "format" "csv" "targetType" "map") $source.Content }}
{{ partial "data-table.html" (dict
  "page" .
  "label" "Releases"
  "rows" $rows
  "search" true
  "sort" true
  "filter" true
  "columns" (slice
    (dict "key" "version" "label" "Version" "sortable" true)
    (dict "key" "date" "label" "Released" "type" "date"
      "format" "02 Jan 2006" "filter" "date-range")
    (dict "key" "downloads" "label" "Downloads" "type" "int"
      "align" "right" "filter" "range"))) }}
```

Use `url="https://example.org/releases.json" format="json"` to fetch a remote
table at build time. The rendered table is identical; only the source changes.

## Changelog badges

Changelog badges let readers scan release maturity or category before reading
the notes. Put the array in the front matter of the changelog content file—for
example `content/en/changelog/release-v1-4-0.md`. Hugo makes it available as
`.Params.badges`; the theme's changelog list and single layouts pass each entry
to `badge.html` automatically.

{{< badge label="stable" variant="accent" >}}
{{< badge label="security" >}}

```toml
+++
title = "v1.4.0"
date = 2026-08-25

[[badges]]
label = "stable"
variant = "accent"

[[badges]]
label = "security"
+++
```

No shortcode is needed on the changelog page. For other content types, use the
single `badge` or data-backed `data-badges` shortcodes shown above.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/features/data-driven-components/index.md
