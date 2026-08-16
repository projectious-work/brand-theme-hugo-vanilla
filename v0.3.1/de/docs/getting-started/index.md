# Erste Schritte

> Theme installieren, erforderliche Hugo-Konfiguration ergänzen und lokal starten.


## Voraussetzungen

Hugo ab 0.128.0, Go für Hugo Modules, Node.js mit npm für Tailwind sowie Git.

## Installation

```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build.buildStats]
  enable = true
```

```sh
hugo mod init example.com/docs
npm install
hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@v0.3.1
```

Kopieren Sie `[outputFormats]`, `[outputs]` und `[markup]` aus der
Beispielkonfiguration. Sie aktivieren Suche, Druck, Markdown, `llms.txt`,
Syntaxhervorhebung und Mathematik.

## Erste Seite und lokaler Server

Legen Sie `content/docs/_index.md` sowie eine Markdown-Seite mit `title`,
`description` und `weight` an. Starten Sie anschließend:

```sh
hugo server --disableFastRender
```

Weiter geht es mit [Konfiguration](configuration/_index.md),
[Features](features/_index.md) und dem [Autorenleitfaden](guides/_index.md).


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/de/docs/getting-started/index.md
