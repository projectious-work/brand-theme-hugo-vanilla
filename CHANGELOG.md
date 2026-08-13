# Changelog

All notable changes to this project are documented in this file.

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
