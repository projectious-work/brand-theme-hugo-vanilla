+++
title = "Leitfaden für Inhalte"
linkTitle = "Leitfäden"
description = "Seiten, Links, Code, Diagramme, Aufzeichnungen und Notebook-Ausgaben erstellen."
weight = 40
icon = "book"
math = true
+++

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
[Ausgabeformate](../configuration.md#ausgabeformate)
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

```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
  H --> P[HTML und Druck]
```

Mit `math = true` rendert KaTeX Formeln wie \( t_{build} < 1s \).

## Terminal-Aufzeichnungen

[asciinema](https://asciinema.org/) zeichnet Text und Zeitinformationen einer
Terminalsitzung auf. Dadurch bleiben Aufzeichnungen scharf, kopierbar und klein.

{{< asciinema src="/casts/theme-tour.cast" rows="8" cols="80" idleTimeLimit="1.5" >}}

## Jupyter Notebooks

[Jupyter Notebooks](https://jupyter.org/) verbinden Text, ausführbaren Code und
Ausgaben. Das Theme konvertiert `.ipynb` vor dem Hugo-Build in Markdown.

{{< notebook "theme-demo" >}}

Die Befehle und Pfade stehen unter
[Konfiguration](../configuration.md#notebook-konvertierung).
