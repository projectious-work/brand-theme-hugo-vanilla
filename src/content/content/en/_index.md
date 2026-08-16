+++
title = "projectious.work Hugo theme"
eyebrow = "projectious.work brand design system"
tagline = "A production-ready Hugo theme for documentation, release notes and product pages — accessible, searchable, multilingual and built on the projectious.work brand system."
[[cta]]
  label = "Getting started"
  href = "/docs/getting-started/"
[[cta]]
  label = "View on GitHub"
  href = "https://github.com/projectious-work/brand-theme-hugo-vanilla"
  variant = "secondary"
+++

## Everything a static site needs

{{< cards >}}
  {{< card title="Structured documentation" subtitle="Generated navigation, breadcrumbs, table of contents, page tools and printable sections." link="/docs/features/" icon="book" >}}
  {{< card title="Fast local search" subtitle="Page and heading search powered by a generated index; no hosted search service required." link="/docs/features/search/" icon="search" >}}
  {{< card title="Accessible by default" subtitle="Keyboard navigation, scalable type, strong control boundaries, reduced motion and three colour modes." link="/docs/features/accessibility/" icon="accessible" >}}
  {{< card title="International publishing" subtitle="Language-aware navigation, edit links, search indexes, metadata, sitemaps and right-to-left support." link="/docs/features/internationalization/" icon="language" >}}
  {{< card title="Author-friendly Markdown" subtitle="Use ordinary Markdown first, then add focused shortcodes for tabs, callouts, diagrams and recordings." link="/docs/guides/" icon="file-code" >}}
  {{< card title="Versioned and maintainable" subtitle="Pinned runtimes, release notes, version navigation, deterministic builds and a local release chain." link="/docs/maintenance/" icon="versions" >}}
{{< /cards >}}

## Designed for readers and maintainers

The theme keeps the reading experience calm while providing the controls expected
from a modern technical publication. It ships without an application framework,
analytics service or hosted search dependency. Hugo owns the content model and
output formats; small JavaScript modules add progressive enhancement.

![Documentation page on desktop](img/documentation-desktop.png "Generated navigation, page tools and feature cards")

## Responsive from the same content

Navigation becomes an accessible drawer on smaller screens, cards collapse to one
column, tables scroll, and the mobile table of contents remains available without
duplicating Markdown.

![Documentation page on mobile](img/documentation-mobile.png "The same documentation on a narrow viewport")

## Start with Hugo conventions

Write content as Markdown. Order pages with front-matter `weight`, organize related
assets as page bundles, link to pages with Hugo-aware references, and let section
templates generate navigation and overview cards. The theme adds components only
where plain Markdown has no suitable structure.

{{< callout type="info" title="Ready to evaluate it?" >}}
Follow **[Getting started](docs/getting-started.md)** for a local site, then review
the **[complete feature map](docs/features/_index.md)** and
**[configuration guide](docs/configuration/_index.md)**.
{{< /callout >}}
