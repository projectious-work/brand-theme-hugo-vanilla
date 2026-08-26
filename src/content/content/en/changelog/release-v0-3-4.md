+++
title = "v0.3.4 — public data-driven composition APIs"
description = "Consumers can compose badges, cards and tables from Hugo data through stable theme partials."
date = 2026-08-18T15:40:00+02:00
author = "projectious.work"
tags = ["release"]
aliases = ["/blog/release-v0-3-4/"]
+++

v0.3.4 turns the reference components requested by real consuming projects
into stable theme interfaces.

## Data-driven composition

Public partials now render badges, card collections and accessible tables from
Hugo data. The existing badge shortcode delegates to the same public
implementation.

## Consumer navigation

Primary menu entries can own a complete content section, the version selector
can use an independent label, and changelog pages can render documented badge
frontmatter. Compact headers automatically collapse the wordmark without
removing the linked brand mark.

## Reliable Tailwind setup

Getting Started, the full configuration reference, and the executable example
now include the Hugo 0.165+ `security.exec.allow` entry required for
`tailwindcss`.

Download the archive and checksum from the
[v0.3.4 GitHub Release](https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.3.4).
