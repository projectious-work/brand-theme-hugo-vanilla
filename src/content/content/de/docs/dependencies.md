+++
title = "Abhängigkeiten und SBOM"
description = "Build-Werkzeuge, Browserbibliotheken, Versionen und Lizenzen."
weight = 80
icon = "list"
+++

| Komponente | Version | Verwendung |
|---|---:|---|
| Hugo | ab 0.128.0; getestet 0.164.0 | Build |
| Go | 1.22 | Modulauflösung |
| Tailwind CLI | 4.3.3 | CSS-Build |
| Playwright | 1.62.1 | Browsertests |
| FlexSearch | 0.8.143 | lokale Suche |
| KaTeX | 0.18.4 | Mathematik |
| Mermaid | 11.16.1 | Diagramme |
| asciinema-player | 3.17.0 | Terminal-Aufzeichnungen |
| nbconvert | 7.16.6 | optionale Notebook-Konvertierung |

Exakte npm-Transitive stehen in `package-lock.json`, Browser-Pins in
`data/cdn.yaml`, Python-Pins in `scripts/requirements.txt`. Schrift- und
FlexSearch-Lizenzen werden mit den Assets ausgeliefert.
