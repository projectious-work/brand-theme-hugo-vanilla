# Website-weite Konfiguration

> Hugo, Ausgaben, Menüs, Sprachen und Theme-Parameter konfigurieren.


## Dateien und Zuständigkeiten

| Datei | Aufgabe |
|---|---|
| `hugo.toml` | URL, Modul, Sprachen, Menüs, Ausgabeformate und Parameter |
| `go.mod` | Theme-Version als Hugo Module |
| `package.json` | Tailwind und Browsertests |
| `data/cdn.yaml` | Fixierte KaTeX-, Mermaid- und asciinema-Versionen |
| `i18n/*.toml` | Übersetzete Oberflächentexte |
| Frontmatter | Seitentitel, Reihenfolge und seitenbezogene Optionen |

`src/content/hugo.toml` ist die vollständige lauffähige Referenz. Übernehmen Sie
die benötigten Tabellen in die Konfiguration Ihrer Website.

## Mindestkonfiguration und Ausgabeformate

Setzen Sie `baseURL`, `title`, das Hugo-Modul und `build.buildStats.enable = true`.
Die zusätzlichen Ausgabeformate erzeugen:

| Format | Ergebnis |
|---|---|
| `SearchIndex` | `/index.json` für Seiten- und Überschriftensuche |
| `Print` | eine druckbare Gesamtansicht je Bereich |
| `Markdown` | `index.md` für Kopieren/Anzeigen als Markdown |
| `LLMS` | `/llms.txt` als kompakte, sprachabhängige Linkliste |
| `RSS` | abonnierbare Versionshinweise |

## Theme-Parameter

Parameter stehen unter `[params]`. Häufig benötigt werden `github`, `editURL`,
`version`, `versions`, `sidebarSections`, `codeTheme`, `announcement`,
`feedbackEndpoint` und `selfHostAssets`. Die Schalter `search`, `feedback`,
`accessibilityMenu`, `sidebarFilter` und `commandPalette` lassen sich mit `false`
abschalten.

## Notebook-Konvertierung

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

Das Ergebnis liegt unter `content/_notebooks/` und `static/notebooks/`.

## Suchmaschinen und llms.txt

`robots.txt` schließt doppelte Such- und Druckansichten aus. Die Sitemap enthält
Sprachalternativen. `llms.txt` ist davon unabhängig: Es listet kanonische Titel,
Beschreibungen und Markdown-Links für Werkzeuge auf; es ist keine Zugriffskontrolle.

Prüfen Sie jede Änderung mit `./scripts/verify.sh`.


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.3/de/docs/configuration/site-wide/index.md
