# v0.3.2 — öffentliche Hooks für Website-Assets

> Nutzende Websites können eigenes CSS und JavaScript über Hugo Pipes ergänzen, ohne interne Theme-Pipelines zu ersetzen.


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


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/de/changelog/release-v0-3-2/index.md
