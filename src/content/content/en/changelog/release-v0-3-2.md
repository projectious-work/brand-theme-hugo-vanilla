+++
title = "v0.3.2 — public hooks for site-owned assets"
description = "Consuming sites can now append Hugo-piped CSS and JavaScript without replacing the theme's internal pipelines."
date = 2026-08-16T20:38:25+02:00
author = "projectious.work"
tags = ["release"]
aliases = ["/blog/release-v0-3-2/"]
+++

v0.3.2 adds two backward-compatible extension points requested by a project
using the theme.

## Asset append hooks

Override `hooks/styles-end.html` to append site-owned CSS or SCSS and
`hooks/scripts-end.html` to append progressive-enhancement JavaScript. Both
partials are empty by default and run after the theme pipeline in Tailwind and
Hugo-only builds.

The [developer guide](../../docs/developer-guide.md#append-site-owned-css-and-javascript)
contains copyable Hugo Pipes examples that compile, minify, fingerprint and
SRI-tag both assets. Existing sites require no configuration change.

Download the archive and checksum from the
[v0.3.2 GitHub Release](https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.3.2).
