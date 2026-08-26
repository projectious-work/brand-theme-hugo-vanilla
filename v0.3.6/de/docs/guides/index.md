# Leitfaden für Inhalte

> Seiten, Links, Code, Diagramme, Aufzeichnungen und Notebook-Ausgaben erstellen.


Dieser Leitfaden ist die verbindliche Einführung für Autoren.

## Seiten und Links

Ordnen Sie Seiten mit `weight` und verwenden Sie Seiten-Bundles für eigene Bilder
oder Downloads. Ein Link innerhalb der Seite nutzt einen Anker:

```md
[Zu den Aufzeichnungen](#terminal-aufzeichnungen)
```

Ein Link zu einer Überschrift auf einer anderen Seite verwendet Dateiname und
Fragment:

```md
[Ausgabeformate](../configuration/site-wide.md#ausgabeformate)
```

Der Render-Hook löst Markdown-Dateien über Hugo-Seitenobjekte auf. Ein verschobenes
Ziel führt dadurch zu einem Build-Fehler statt zu einem unbemerkten defekten Link.

## Terminal

{{< terminal title="Lokale Vorschau" >}}
$ hugo server --disableFastRender
Watching for changes in content and layouts
Built in 284 ms
Web Server is available at http://localhost:1313/
{{< /terminal >}}

## Diagramme und Mathematik

Verwenden Sie einen `mermaid`-Block für Diagramme und aktivieren Sie
`math = true` für KaTeX. Beispiele und Konfiguration stehen unter
[Diagramme](../features/diagrams.md) und [Mathematik](../features/mathematics.md).

## Terminal-Aufzeichnungen

Ein `.cast` wird mit dem `asciinema`-Shortcode eingebettet. Siehe
[Terminal-Aufzeichnungen](../features/terminal-recordings.md).

## Jupyter Notebooks

Ein konvertiertes Notebook wird mit dem `notebook`-Shortcode eingebettet. Siehe
[Jupyter Notebooks](../features/jupyter-notebooks.md).


- [Leitfaden zur Template-Erstellung](https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/de/docs/guides/template-authoring/index.md) — Upgrade-sichere Hugo-Layouts und Shortcodes mit Theme-Tokens und Tailwind erstellen.
