+++
title = "Diagrammes et graphiques"
description = "Créer des diagrammes responsives, des graphiques issus de données et des figures vectorielles ou bitmap soignées."
weight = 120
icon = "chart-dots"
+++

Le thème propose trois parcours idiomatiques Hugo : Mermaid directement dans
Markdown, le shortcode `chart` pour les données CSV et `graphic` pour les sorties
SVG ou bitmap de D2, Graphviz, Typst/CeTZ et d'autres générateurs.

## Mermaid dans Markdown

Un bloc `mermaid` charge la version épinglée du moteur uniquement sur les pages
concernées.

```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
  H --> P[HTML et impression]
```

````md
```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
  H --> P[HTML et impression]
```
````

## Graphiques depuis un CSV

`chart` produit un SVG accessible pendant la compilation Hugo, sans JavaScript
dans le navigateur.

{{< chart src="data/graphics-adoption.csv" type="bar"
    title="Projets utilisant des graphiques générés"
    x-label="Trimestre" y-label="Projets"
    caption="Un histogramme généré depuis un fichier CSV." >}}

```md
{{</* chart src="data/graphics-adoption.csv" type="bar"
    title="Projets utilisant des graphiques générés" */>}}
```

La première ligne du CSV est l'en-tête. La première colonne contient les
libellés et la seconde des valeurs numériques positives. `type` accepte `bar`,
`line` et `dot`.

## Figures vectorielles générées

D2 convient à l'architecture, Graphviz aux graphes et Typst/CeTZ aux figures
techniques précises. Ces outils produisent du SVG ; `graphic` assure ensuite une
présentation homogène et accessible.

{{< graphic src="graphics/graphics-pipeline.svg"
    alt="Plusieurs sources graphiques sont publiées en SVG par Hugo"
    caption="Les formats spécialisés convergent vers un SVG responsive."
    backend="svg" >}}

```md
{{</* graphic src="system.svg" alt="Architecture du traitement des requêtes"
    caption="Architecture du système" source="system.d2" backend="d2" */>}}
```

## SVG intégré et bitmap

Le SVG externe via `<img>` est le choix sûr par défaut. Un SVG de confiance dans
`assets/` ou un page bundle peut être intégré avec `inline="true"`. Le même
shortcode accepte PNG, WebP et JPEG pour les captures d'écran, photographies et
illustrations riches en pixels.

```md
{{</* graphic src="diagram.svg" inline="true" alt="Flux de données" */>}}
{{</* graphic src="capture.webp" alt="Application sur ordinateur"
    caption="Vue sur ordinateur" */>}}
```

Toujours fournir un texte alternatif utile et, si nécessaire, une légende. La
couleur ne doit jamais être le seul moyen de transmettre une information.
