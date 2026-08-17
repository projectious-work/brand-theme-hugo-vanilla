# Template authoring guide

> Move from Markdown authoring to your first upgrade-safe Hugo shortcode and layout, step by step.


This guide starts with the knowledge needed to create ordinary Markdown pages.
You do not need to know Go, HTML templating or Tailwind beforehand. By the end,
you will have created a reusable `status-panel` component and will understand
when and how to change a complete page layout.

## 1. Understand what changes when Markdown is not enough

A Markdown file supplies content: headings, paragraphs, lists, images and front
matter. A **template** supplies the HTML around that content. Hugo combines the
two when it builds the site.

For example, this Markdown:

```md
+++
title = "Service status"
+++

The service is available.
```

becomes a complete HTML page because the theme supplies the header, sidebar,
main content area and footer. You only need to author a template when you want
reusable presentation that Markdown and the theme's existing shortcodes do not
already provide.

Hugo has three relevant building blocks:

| Building block | What it does | Who invokes it |
|---|---|---|
| Shortcode | Embeds a reusable component inside Markdown | Content author |
| Partial | Reuses HTML inside another template | Template author |
| Layout | Defines the structure of a complete page or section | Hugo |

Start with a shortcode for a component used in content. It is the smallest and
safest first customization. Do not copy a complete theme layout merely to add a
box to one page.

## 2. Know which project you are editing

The theme is a dependency of your Hugo site. Your site should have a structure
similar to this:

```text
my-site/
├── assets/
├── content/
│   └── docs/
├── layouts/
├── hugo.toml
├── go.mod
└── package.json
```

All paths in this guide are relative to `my-site/`, the directory containing
your site's `hugo.toml`. Create `assets/` or `layouts/` if they do not exist.
Do not edit the downloaded theme in Hugo's module cache. Hugo checks your local
site first, so a local file can add to or override the theme without changing
the dependency.

Before changing templates, make sure the ordinary site still builds:

```sh
hugo
```

If this command fails, first complete the [from-scratch installation](../getting-started.md).

## 3. Learn the small amount of template syntax you need

Hugo templates are HTML with instructions between `{{` and `}}`. These are
called template actions. The first example uses only five ideas:

| Syntax | Meaning |
|---|---|
| `{{ .Get "title" }}` | Read the shortcode argument named `title` |
| `{{ .Inner }}` | Read the Markdown between the opening and closing shortcode tags |
| `{{ $name := value }}` | Store a value in a local variable |
| `{{ default "info" value }}` | Use `"info"` when no value was supplied |
| `{{ index $map $key }}` | Read the value for `$key` from a map |

A leading or trailing hyphen, as in `{{-` or `-}}`, only trims surrounding
whitespace in the generated HTML. It does not change the value.

## 4. Create your first shortcode without styling

Create `layouts/shortcodes/status-panel.html` in your site:

```go-html-template {filename="layouts/shortcodes/status-panel.html"}
<aside>
  <h2>{{ .Get "title" }}</h2>
  <div>{{ .Inner | .Page.RenderString }}</div>
</aside>
```

This is a paired shortcode because it accepts content between an opening and a
closing tag. `.Page.RenderString` tells Hugo to render Markdown such as emphasis
and links inside that content.

Use the shortcode in any Markdown page:

```md
{{</* status-panel title="Release status" */>}}
The **documentation build** passed all checks.
{{</* /status-panel */>}}
```

Run the development server and open the page containing the shortcode:

```sh
hugo server
```

At this stage the component is intentionally plain. Confirm that its heading and
bold text render before adding styling. If Hugo reports `failed to extract
shortcode`, check the filename, paired closing tag and quotation marks.

## 5. Enable the theme's Tailwind integration

Tailwind turns utility names in `class="..."` attributes into CSS. The theme
already owns the stylesheet and exposes a documented set of semantic utilities.
Your site must let Hugo record the class names found in your local templates.

In the site-root `hugo.toml`, add or merge this setting:

```toml
[build.buildStats]
  enable = true
```

Do not create a second `[build.buildStats]` table if one already exists; add
`enable = true` to the existing table.

If you build the theme CSS in the consuming project, install the same major
Tailwind CLI version and commit `package.json` and the generated lockfile:

```sh
npm install --save-dev @tailwindcss/cli@^4.1.0
```

The theme reads Hugo's generated `hugo_stats.json`. This is how utility classes
used by local templates become visible to Tailwind. Run the repository's normal
build command after adding a class; `hugo server` alone may not rebuild CSS in a
custom build setup.

## 6. Style the shortcode with theme utilities

Replace the simple shortcode with this styled version:

```go-html-template {filename="layouts/shortcodes/status-panel.html"}
{{- $kind := .Get "kind" | default "info" -}}
{{- $classes := dict
  "info" "border-default bg-subtle text-hi"
  "important" "border-accent bg-surface text-hi"
-}}
<aside class="my-6 rounded-lg border p-6 {{ index $classes $kind }}">
  <h2 class="font-display text-accent">{{ .Get "title" }}</h2>
  <div class="font-sans text-hi">{{ .Inner | .Page.RenderString }}</div>
</aside>
```

Use it from Markdown:

```md
{{</* status-panel title="Release status" kind="important" */>}}
The documentation build passed all checks.
{{</* /status-panel */>}}
```

Read it from top to bottom:

1. `$kind` reads an optional argument and falls back to `info`.
2. `$classes` maps the two supported values to complete class strings.
3. `index` selects one class string for the `<aside>` element.
4. `.Get "title"` writes the heading supplied by the author.
5. `.Inner | .Page.RenderString` renders the enclosed Markdown.

Use complete, literal class names in the map. Do not construct a class such as
`bg-{{ .Get "colour" }}`. Tailwind cannot reliably discover dynamically assembled
names, and allowing arbitrary presentation values makes the component harder to
maintain.

## 7. Choose theme-safe colours, spacing and typography

Use the documented utilities—`font-display`, `font-sans`, `font-mono`,
`bg-page`, `bg-surface`, `bg-subtle`, `bg-terminal`, `text-hi`, `text-lo`,
`text-accent`, `border-default` and `border-accent`. For custom CSS, prefer
semantic variables such as `--color-surface`, `--color-text-primary`,
`--color-border`, `--space-5` and `--radius-lg`.

See [Tailwind and design tokens](../features/tailwind.md) for the complete mapped
surface. Avoid depending directly on internal component selectors or raw palette
steps when a semantic token exists.

The semantic names adapt to light mode, dark mode and accessibility settings. A
hard-coded class such as `bg-black` may look correct in one mode but remain black
in all modes. Test semantic utilities before adding custom CSS.

## 8. Add an icon only when it conveys useful information

Place an additional Tabler outline SVG at `assets/icons/<name>.svg`; Hugo's merged
asset filesystem makes it available to the theme partial and shortcode:

```go-html-template
{{ partial "icon.html" (dict "name" "chart-bar" "class" "ico--lg" "label" "Usage chart") }}
```

Decorative icons omit `label` and become `aria-hidden`. Icon-only controls need an
accessible name on the control itself. See [Icons and Tabler](../developer-guide.md#icons-and-tabler).

If the icon is purely decorative, omit `label`. If it communicates meaning that
is not already present in nearby text, provide a short label. Do not use an icon
as the only way to communicate status or severity.

## 9. Decide whether you really need a page layout

The shortcode above adds a component inside `.Content`; it does not move the
sidebar, breadcrumbs or page title. A layout is appropriate only when the HTML
structure of a whole page type must change.

Before overriding one, identify the exact upstream file:

1. Find the layout that renders the page in the theme's `layouts/` directory.
2. Copy that one file into the identical path below your site's `layouts/`.
3. Make the smallest possible change.
4. Keep a note of the theme version from which it was copied.

Copy the relevant theme layout into the same path in the consuming site, for
example `layouts/docs/single.html`. Preserve the base template contract:

```go-html-template {filename="layouts/docs/single.html"}
{{ define "main" }}
<div class="docs">
  {{ partial "sidebar.html" . }}
  <main id="main" class="docs__main">
    {{ partial "breadcrumbs.html" . }}
    <article class="prose">
      <h1>{{ .Title }}</h1>
      {{ .Content }}
    </article>
  </main>
</div>
{{ end }}
```

Start from the exact version of the upstream file you consume. Record the source
tag in a comment or commit message so future maintainers can compare it.

The line `{{ define "main" }}` fills a named area supplied by the theme's base
template. The dot passed to a partial, as in `{{ partial "sidebar.html" . }}`,
is the current page context. `.Title` comes from front matter and `.Content` is
the rendered Markdown body.

If all you need is a component inside Markdown, stop at the shortcode. A copied
layout follows the theme less automatically and therefore needs upgrade review.

## 10. Diagnose common first-time problems

| Symptom | Likely cause | What to check |
|---|---|---|
| `template for shortcode ... not found` | Wrong path or filename | Use `layouts/shortcodes/<name>.html` in the site root |
| The shortcode text appears literally | Escaped example syntax was copied | Use real `{{</* ... */>}}` delimiters without the documentation escapes |
| `.Inner` is unavailable | Closing tag is missing | Add `{{</* /status-panel */>}}` |
| New classes have no effect | CSS was not rebuilt or the class is dynamic | Enable build stats, use literal classes and run the full build |
| Colours work only in one mode | Raw colour values were used | Choose semantic theme utilities or variables |
| A copied layout loses theme features | The base-template contract changed | Start from the exact layout in your installed theme version |

Hugo error messages normally include the template path and line number. Start at
the first reported error; later errors can be consequences of the first one.

## 11. Verify behavior and accessibility

Run a production build and the consuming site's tests:

```sh
hugo --minify
```

Check light and both dark surfaces, 200% text size, keyboard focus, reduced motion,
mobile layout, print output and every supported language. Confirm that links keep
the deployment base path and that the generated CSS contains the new utilities.

For the `status-panel`, verify at least:

- the default form and `kind="important"`;
- Markdown links and emphasis inside the panel;
- light and dark colour modes;
- keyboard navigation when the content contains a link;
- narrow mobile width and 200% browser zoom; and
- a production build with no template warning.

## 12. Maintain your customization

When upgrading the theme:

1. Read release notes for template and token changes.
2. Diff every local override against the same upstream path in the new tag.
3. Remove an override when upstream now provides the required extension point.
4. Re-run visual and accessibility tests before committing `go.mod` and `go.sum`.

Local overrides are intentionally your responsibility; keeping them small and
tested is the best protection against upgrade drift.

The safest progression is therefore: Markdown first, an existing theme shortcode
second, a small local shortcode third, and a complete layout override only when
the page structure truly has to change.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.2/docs/guides/template-authoring/index.md
