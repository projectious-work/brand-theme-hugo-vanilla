+++
title = "v0.3.0 — pinned runtimes, section-filtered search, command palette"
description = "Runtime assets are version-pinned, search indexes headings, and every page action sits in one row."
date = 2026-08-15
author = "projectious.work"
tags = ["release"]
+++

This release makes runtime dependencies reproducible and reworks how readers move
through a large documentation set.

## Reproducible runtime assets

KaTeX 0.18.4, Mermaid 11.16.1 and asciinema-player 3.17.0 load from exact
jsDelivr version URLs. Fonts and the theme icon set remain bundled.

## Search

The index now carries one record per page **and** one per H2/H3, so a hit lands on
the right anchor instead of the top of a long page. The `/search` page filters by
section, and both inputs are debounced.

## Page actions

Copy as Markdown, view Markdown and print the whole section carry equal weight, so
they share one row on docs pages, section indexes and blog posts. The sidebar's
"Tools" group is gone.

## Also in this release

- Command palette on `Ctrl`/`Cmd` `K`, shortcut help on `?`, `g`+key jumps
- `params.codeTheme = "adaptive"` for light code panels in light mode
- Dark-mode image swapping, figure captions, scrolling wide tables
- `params.sidebarOpenDepth` and a sidebar filter box
- Announcement bar, outdated-version banner, back-to-top, mobile table of contents
- Print styling, notebook conversion, multilingual edit links, SEO outputs
