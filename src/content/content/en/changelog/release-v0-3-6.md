+++
title = "v0.3.6 — configurable branding and reusable composition"
description = "Consumers can configure product identity and reuse timeline and terminal-recording composition APIs without copying theme markup."
date = 2026-08-22T22:00:00+02:00
author = "projectious.work"
tags = ["release", "templates"]
aliases = ["/blog/release-v0-3-6/"]
+++

v0.3.6 removes three common reasons for consumers to shadow theme templates.

## Configurable product identity

`params.brand` now controls the header destination and wordmark, light and dark
marks, favicon, and Apple touch icon. Existing sites retain the current
projectious.work defaults without configuration. Explicit light mode also resets
the logo accent when the operating system prefers dark mode.

## Reusable structured composition

The public `timeline.html` partial renders pages or structured roadmap and phase
items. The changelog uses the same implementation, keeping its established
appearance while removing section-name coupling.

The public `asciinema.html` partial accepts structured recording data and the
shortcode's options. Controls, fit behavior, and automatic or explicit palettes
are supported, so generated galleries no longer need to copy player markup.

Download the archive and checksum from the
[v0.3.6 GitHub Release](https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.3.6).
