+++
title = "Entwicklerleitfaden"
description = "Theme anpassen, gebündelte Assets tauschen und Änderungen testen."
weight = 60
icon = "file-code"
+++

Überschreiben Sie als Nutzer einzelne Hugo-Templates im eigenen `layouts/`-
Verzeichnis, statt den Modul-Cache zu verändern. Nutzen Sie CSS-Variablen aus
`brand-tokens.css` als stabile Anpassungsoberfläche.

## Symbole

Die vollständige Liste liegt unter
[`src/assets/icons/`](https://github.com/projectious-work/brand-theme-hugo-vanilla/tree/main/src/assets/icons).
Gebündelt sind unter anderem `accessible`, `book`, `brand-github`, `file`,
`folder`, `language`, `menu-2`, `printer`, `search`, `tag` und `versions`.
Ersatz-SVGs müssen `currentColor`, ein kompatibles `viewBox` und passende
Lizenzhinweise verwenden.

## Build und Tests

```sh
npm install
./scripts/build.sh
./scripts/verify.sh
./scripts/serve-watch.sh start
```

Visuelle Baselines werden erst nach Prüfung der Diff-Bilder aktualisiert. Beiträge
verwenden kurzlebige Branches, Conventional Commits und Pull Requests.
