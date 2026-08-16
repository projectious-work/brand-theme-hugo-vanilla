# Seitenkonfiguration (Frontmatter)

> Navigation und optionale Funktionen einer Seite steuern.


Frontmatter ist der TOML-Block zwischen `+++` am Anfang einer Markdown-Datei.

```toml
+++
title = "API-Referenz"       # Erforderlicher Seitentitel.
linkTitle = "API"            # Kurzer Navigationstitel.
description = "HTTP API."   # Zusammenfassung und Suchtext.
weight = 20                  # Reihenfolge in der Navigation.
icon = "code"               # Icon der Übersichtskarte.
toc = true                   # Rechte Inhaltsnavigation anzeigen.
cards = true                 # Karten für Unterseiten erzeugen.
hidden = false               # Seite in Karten anzeigen.
math = false                 # KaTeX auf dieser Seite laden.
private = false              # Seite in Suche und Sitemap aufnehmen.
+++
```


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/de/docs/configuration/page-configuration/index.md
