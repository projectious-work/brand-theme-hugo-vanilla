+++
title = "Diagramme und Charts"
description = "Responsive Diagramme, datenbasierte Charts sowie hochwertige Vektor- und Bitmap-Grafiken erstellen."
weight = 120
icon = "chart-dots"
+++

Die Theme bietet drei Hugo-typische Wege: Mermaid direkt in Markdown, den
Shortcode `chart` für CSV-Daten und `graphic` für SVG- oder Bitmap-Ausgaben von
D2, Graphviz, Typst/CeTZ und anderen Generatoren.

## Mermaid in Markdown

Ein `mermaid`-Codeblock lädt die fest definierte Laufzeit nur auf Seiten, die
sie benötigen.

```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
  H --> P[HTML und Druck]
```

````md
```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
  H --> P[HTML und Druck]
```
````

## Diagramme aus CSV

`chart` erzeugt beim Hugo-Build ein zugängliches Inline-SVG ohne Browser-JavaScript.

{{< chart src="data/graphics-adoption.csv" type="bar"
    title="Projekte mit generierten Grafiken"
    x-label="Quartal" y-label="Projekte"
    caption="Ein Balkendiagramm aus einer CSV-Datei." >}}

```md
{{</* chart src="data/graphics-adoption.csv" type="bar"
    title="Projekte mit generierten Grafiken" */>}}
```

Die erste CSV-Zeile ist die Kopfzeile. Spalte eins enthält Beschriftungen,
Spalte zwei positive Zahlen. `type` akzeptiert `bar`, `line` und `dot`.

## Generierte Vektorgrafiken

D2 eignet sich für Architektur, Graphviz für Graphen und Typst/CeTZ für präzise
technische Abbildungen. Die Werkzeuge erzeugen SVG; `graphic` übernimmt die
einheitliche, zugängliche Darstellung.

{{< graphic src="graphics/graphics-pipeline.svg"
    alt="Verschiedene Grafikquellen werden als SVG mit Hugo veröffentlicht"
    caption="Spezialisierte Quellformate werden zu responsivem SVG."
    backend="svg" >}}

```md
{{</* graphic src="system.svg" alt="Architektur der Anfrageverarbeitung"
    caption="Systemarchitektur" source="system.d2" backend="d2" */>}}
```

## Inline-SVG und Bitmap

Externes SVG über `<img>` ist der sichere Standard. Vertrauenswürdige
SVG-Ressourcen aus `assets/` oder einem Page Bundle können mit `inline="true"`
eingebettet werden. PNG, WebP und JPEG funktionieren über denselben Shortcode;
sie sind für Screenshots, Fotos und rasterintensive Darstellungen geeignet.

```md
{{</* graphic src="diagram.svg" inline="true" alt="Datenfluss" */>}}
{{</* graphic src="screenshot.webp" alt="Anwendung auf einem Desktop"
    caption="Desktop-Ansicht" */>}}
```

Immer aussagekräftigen Alternativtext und bei Bedarf eine Bildunterschrift
angeben. Bedeutung darf nicht ausschließlich durch Farbe vermittelt werden.
