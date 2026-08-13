---
title: "Shortcode reference"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/shortcodes/"
description: "Every shortcode shipped by the theme, with syntax and rendered examples."
---


Shortcodes are semantic additions to Markdown. Prefer Markdown for ordinary
prose, lists, tables, links, quotes, and code.

## Callout

Parameters: `type` is `info`, `success`, `warning`, or `danger`.

```go-html-template
{{</* callout type="warning" */>}}Back up the configuration first.{{</* /callout */>}}
```

{{< callout type="info" >}}Use information for relevant context.{{< /callout >}}
{{< callout type="success" >}}The build completed.{{< /callout >}}
{{< callout type="warning" >}}Review the migration before applying it.{{< /callout >}}
{{< callout type="danger" >}}Deployment is blocked.{{< /callout >}}

## Button

Parameters: `href`, `variant` (`primary`, `accent`, `outline`, `ghost`, or
`danger`), and optional `external`.

```go-html-template
{{</* button href="/docs/" variant="accent" */>}}Read the docs{{</* /button */>}}
```

{{< button href="#" variant="primary" >}}Primary{{< /button >}}
{{< button href="#" variant="accent" >}}Accent{{< /button >}}
{{< button href="#" variant="outline" >}}Outline{{< /button >}}
{{< button href="#" variant="ghost" >}}Ghost{{< /button >}}

## Cards and grid

`cards` is the automatic card collection. `grid columns="2|3|4"` is the more
general responsive grid used with cards, panels, or metrics.

```go-html-template
{{</* cards */>}}
{{</* card title="Getting started" meta="Guide" href="/docs/getting-started/" */>}}
Install and run the theme.
{{</* /card */>}}
{{</* /cards */>}}

{{</* grid columns="2" */>}}
{{</* card title="Configuration" meta="Guide" href="/docs/configuration/" */>}}
Control theme behavior without a fork.
{{</* /card */>}}
{{</* /grid */>}}
```

{{< grid columns="2" >}}
{{< card title="Flat card" meta="Brand recipe" >}}Raised white surface, visible border, no default shadow.{{< /card >}}
{{< panel variant="accent" title="Accent panel" >}}Use the accent for decisions, not decoration.{{< /panel >}}
{{< /grid >}}

## Panel

Parameters: optional `title`; `variant` is `default`, `accent`, or `dark`.

```go-html-template
{{</* panel variant="dark" title="System output" */>}}Content{{</* /panel */>}}
```

{{< panel variant="dark" title="System output" >}}
The audit trail is append-only and the latest run passed.
{{< /panel >}}

## Metrics and stats

Use `metric` in a `grid` for dashboard summaries. Use `stats` with nested
`stat` for centered editorial statistics.

```go-html-template
{{</* grid columns="3" */>}}
{{</* metric value="12" label="active agents" */>}}
{{</* metric value="99.8%" label="success rate" */>}}
{{</* /grid */>}}

{{</* stats */>}}
{{</* stat value="3" label="practice areas" */>}}
{{</* stat value="273" label="design tokens" */>}}
{{</* /stats */>}}
```

{{< grid columns="3" >}}
{{< metric value="12" label="active agents" >}}
{{< metric value="99.8%" label="success rate" >}}
{{< metric value="42s" label="average audit" >}}
{{< /grid >}}

{{< stats >}}
{{< stat value="3" label="practice areas" >}}
{{< stat value="273" label="design tokens" >}}
{{< /stats >}}

## Status

Variants: `healthy`, `success`, `running`, `info`, `warning`, `pending`,
`failed`, `danger`, and `idle`.

```go-html-template
{{</* status variant="running" */>}}Running{{</* /status */>}}
```

{{< status variant="healthy" >}}Healthy{{< /status >}}
{{< status variant="running" >}}Running{{< /status >}}
{{< status variant="warning" >}}Warning{{< /status >}}
{{< status variant="failed" >}}Failed{{< /status >}}
{{< status variant="idle" >}}Idle{{< /status >}}

## Field

Parameters: `label`, optional `type`, `value`, `placeholder`, and `hint`.
This is appropriate for demonstrations and simple forms; production forms
still need a real submission endpoint and validation.

```go-html-template
{{</* field label="Project name" value="Documentation site"
hint="Shown in page metadata." */>}}
```

{{< field label="Project name" value="Documentation site" hint="Shown in page metadata." >}}

## Terminal

Lines beginning with `$`, `✓`, `✗`, or `●` receive prompt/status treatment.

```go-html-template
{{</* terminal */>}}
$ hugo --minify
✓ Built 18 pages
● Watching for changes
{{</* /terminal */>}}
```

{{< terminal >}}
$ hugo --minify
✓ Built 18 pages
● Watching for changes
{{< /terminal >}}

## Steps

`steps` contains nested `step` shortcodes. Each step accepts `title`.

```go-html-template
{{</* steps */>}}
{{%/* step title="Configure" */%}}Set site parameters.{{%/* /step */%}}
{{%/* step title="Write" */%}}Create content in Markdown.{{%/* /step */%}}
{{</* /steps */>}}
```

{{< steps >}}
{{% step title="Configure" %}}Set site parameters.{{% /step %}}
{{% step title="Write" %}}Create content in Markdown.{{% /step %}}
{{% step title="Ship" %}}Run the production build.{{% /step %}}
{{< /steps >}}

## Tags and badges

`tag` accepts `neutral` or `accent`. `badge` accepts `info`, `success`,
`warning`, or `danger`.

```go-html-template
{{</* tag */>}}Cloud{{</* /tag */>}}
{{</* tag variant="accent" */>}}Agentic AI{{</* /tag */>}}
{{</* badge variant="success" */>}}Passed{{</* /badge */>}}
```

{{< tag >}}Cloud{{< /tag >}} {{< tag >}}Agile{{< /tag >}}
{{< tag variant="accent" >}}Agentic AI{{< /tag >}}
{{< badge variant="success" >}}Passed{{< /badge >}}
{{< badge variant="warning" >}}Review{{< /badge >}}

## Quote

Parameters: optional `author` and `role`.

```go-html-template
{{%/* quote author="Theme maintainer" role="projectious.work" */%}}
Content stays portable when presentation stays in the theme.
{{%/* /quote */%}}
```

{{% quote author="Theme maintainer" role="projectious.work" %}}
Content stays portable when presentation stays in the theme.
{{% /quote %}}

## App shell

`app` wraps product-surface examples in a responsive console shell. It is
intended for demos and documentation, not as an application framework.

```go-html-template
{{</* app */>}}
## Pipelines
{{</* grid columns="2" */>}}...{{</* /grid */>}}
{{</* /app */>}}
```

{{< app >}}
## Pipelines

{{< grid columns="2" >}}
{{< metric value="8" label="healthy" >}}
{{< metric value="1" label="running" >}}
{{< /grid >}}
{{< /app >}}

