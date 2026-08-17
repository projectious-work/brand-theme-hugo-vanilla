+++
title = "v0.3.2 — öffentliche Hooks für Website-Assets"
description = "Nutzende Websites können eigenes CSS und JavaScript über Hugo Pipes ergänzen, ohne interne Theme-Pipelines zu ersetzen."
date = 2026-08-16T20:38:25+02:00
author = "projectious.work"
tags = ["release"]
+++

v0.3.2 ergänzt zwei abwärtskompatible Erweiterungspunkte.

`hooks/styles-end.html` fügt website-eigenes CSS oder SCSS an,
`hooks/scripts-end.html` eigenes JavaScript. Beide Partials sind standardmäßig
leer und laufen nach der Theme-Pipeline sowohl mit Tailwind als auch im
Hugo-only-Build.

Der [Developer Guide](../../../docs/developer-guide.md#append-site-owned-css-and-javascript)
enthält kopierbare Beispiele mit Kompilierung, Minifizierung, Fingerprinting
und SRI. Bestehende Websites benötigen keine Konfigurationsänderung.

Archiv und Prüfsumme stehen im
[GitHub Release v0.3.2](https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.3.2) bereit.
