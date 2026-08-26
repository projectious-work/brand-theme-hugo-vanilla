# Abhängigkeiten und SBOM

> Build-Werkzeuge, Browserbibliotheken, Versionen und Lizenzen.


| Komponente | Version | Verwendung |
|---|---:|---|
| Hugo | ab 0.128.0; getestet 0.164.0 | Build |
| Go | 1.22 | Modulauflösung |
| Tailwind CLI | 4.3.3 | CSS-Build |
| Playwright | 1.62.1 | Browsertests |
| Tabler Icons | 3.31.0 | vollständiger Symbolkatalog |
| IBM Plex Mono | 5.3.0 | gebündelte Schriftschnitte für Code |
| FlexSearch | 0.8.143 | lokale Suche |
| KaTeX | 0.18.4 | Mathematik |
| Mermaid | 11.16.1 | Diagramme |
| asciinema-player | 3.17.0 | Terminal-Aufzeichnungen |
| nbconvert | 7.16.6 | optionale Notebook-Konvertierung |

Exakte npm-Transitive stehen in `package-lock.json`, Browser-Pins in
`data/cdn.yaml`, Python-Pins in `scripts/requirements.txt`. IBM Plex Mono enthält
normale und kursive Schnitte in 400, 500, 600 und 700. Dadurch verwendet die
Syntaxhervorhebung echte Schriftschnitte statt vom Browser synthetisierter
Varianten. Schrift- und FlexSearch-Lizenzen werden mit den Assets ausgeliefert.


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/de/docs/dependencies/index.md
