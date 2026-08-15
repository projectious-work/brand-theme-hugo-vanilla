# Changelog

All notable changes to this project are documented in this file.

## [v0.3.0] — 2026-08-15

### Added

- Added an announcement bar, command palette, version banner, back-to-top
  control, mobile table of contents, sidebar filtering, image lightbox, styled
  RSS feeds, and `/llms.txt` output.
- Added heading-level, section-filtered search and completed the German example
  documentation.
- Added whole-section print output with running headers and folios, Jupyter
  notebook conversion, multilingual edit links, version-path probing, custom
  robots and sitemap output, hreflang metadata, and rate-limited feedback.
- Added local-only deterministic build, browser verification, release archive,
  publication, GitHub Pages deployment, and persistent watch-server scripts.

### Changed

- Replaced the v0.2 implementation with the redesigned projectious.work v3/v4
  Hugo theme, including scalable component typography and adaptive light/dark
  code panels.
- Pinned KaTeX 0.18.4, Mermaid 11.16.1, and asciinema-player 3.17.0 to exact
  jsDelivr URLs and removed their local runtime bundles.
- Expanded the shortcode gallery and replaced demonstration blog posts with
  release notes.

### Fixed

- Corrected recursive search-heading extraction, SVG-safe image metadata,
  Markdown output registration, code-block wrapping, and command-palette JSON
  serialization.
- Corrected malformed and improperly paired shortcodes, escaped dynamic card
  markup, mobile-sidebar detection, and project-base-path URL resolution.
- Corrected the landing-page eyebrow, accessibility scaling, search alignment,
  documentation cards, code colours, file-tree layout, page metadata alignment,
  pagination spacing, inline math rendering, and taxonomy links.

## [v0.2.4] — 2026-08-13

### Fixed

- Stopped the `terminal` shortcode escaping its own markup when nested inside
  `app` or `panel`, which rendered raw `<div><span>` source on the dashboard
  example.
- Kept inline shortcodes (`status`, `badge`, `tag`, `button`) inside their
  Markdown table cell; stray newlines were splitting a three-row table into
  nine rows with every status pill orphaned.
- Rescoped foreground tokens on mode-fixed dark surfaces, so components
  nested in the hero or a dark panel no longer inherit light-mode text
  colours (the hero's ghost button measured 2.28:1, dark-panel step text
  3.01:1).
- Collapsed the `grid` shortcode to a single column on mobile. It writes
  `--columns` inline, which no stylesheet rule can outrank, so the landing
  page rendered three ~54px cards at 375px with every title clipped.
- Prevented 48px display type from being silently clipped at 375px, where
  "projectious.work" has no break opportunity.
- Removed the closed mobile navigation drawer from the tab order; seven
  controls were focusable while invisible.
- Made horizontally scrolling code blocks reachable by keyboard (WCAG 2.1.1).
- Restored AA contrast on accent tags, which measured 4.10:1 in light mode
  against the neutral tag's 9.75:1. Tracked upstream as
  [projectious-work/brand#15](https://github.com/projectious-work/brand/issues/15).

### Changed

- Re-enabled the `color-contrast` rule in the browser accessibility suite.
  Only the logotype is excluded, which the brand system declares as a
  deliberate WCAG 1.4.3 exemption; it was previously disabled wholesale.
- Added six browser regression tests covering the shortcode, dark-surface,
  responsive-grid, scroll-region, and drawer defects above.

## [v0.2.3] — 2026-08-13

### Changed

- Replaced the custom client-side search scorer with locally bundled
  FlexSearch `0.8.143`, including partial and multi-word document ranking,
  suggestions, normalization, and caching without a CDN dependency.
- Made persistent prose-link underlines opt-in, matching the brand system's
  standard presentation while retaining explicit accessibility controls.

## [v0.2.2] — 2026-08-13

### Changed

- Restored brand-scale typography for navigation, cards, buttons, search,
  documentation content, and the landing-page hero.
- Replaced the header's GitHub text item with an icon control in the intended
  control order.
- Expanded client-side search to full page content and added prefix matching
  without introducing another runtime dependency.

### Fixed

- Corrected the project-scoped GitHub Pages destination of the brand lockup.
- Corrected lockup alignment and removed underlines from navigation chrome
  while retaining accessible underlines for prose links.

## [v0.2.1] — 2026-08-13

### Fixed

- Corrected module-data access in the generated contract reference,
  `llms.txt`, and `llms-full.txt`, and added a release check that rejects
  unresolved template values.

## [v0.2.0] — 2026-08-13

### Changed

- Renamed the public Hugo Module and installation identity from
  `hugo-theme-projectious` to `brand-theme-hugo-vanilla`. Consumers must update
  the module path in `go.mod` and `hugo.toml`; the repository and GitHub Pages
  URLs remain unchanged.
- Adopted the simple branching and release lifecycle with `main` as the stable
  integration branch and `gh-pages` reserved for generated output.

## [v0.1.0] — 2026-08-12

### Added

- Hugo layouts for documentation, blog articles, changelogs, landing pages,
  search, multilingual content, and responsive navigation.
- Shortcodes for application shells, badges, buttons, callouts, cards, fields,
  grids, metrics, panels, quotes, states, statistics, steps, tags, and terminal
  output.
- A content-first example site documenting installation, configuration,
  Markdown authoring, template overrides, and every shortcode.
- Hugo-native examples for dashboard, administration, settings, pricing,
  interface states, accessibility, mobile workflows, email content, and the
  component kitchen sink.

### Changed

- Aligned page, surface, border, link, card, accent, typography, focus, and
  responsive behavior with the projectious.work design system v2.1.1.
- Updated the example site from consulting copy to theme documentation.

### Fixed

- Corrected explicit light-mode behavior when the operating system prefers
  dark mode.
- Corrected the `projectious.work` lockup and added a keyboard skip link.

[v0.1.0]: https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.1.0
[v0.2.0]: https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.2.0
[v0.2.1]: https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.2.1
[v0.2.2]: https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.2.2
[v0.2.3]: https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.2.3
[v0.2.4]: https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.2.4
[v0.3.0]: https://github.com/projectious-work/brand-theme-hugo-vanilla/compare/v0.2.4...v0.3.0
