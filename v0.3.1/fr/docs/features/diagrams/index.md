# Diagrammes

> Afficher des diagrammes Mermaid responsives depuis Markdown.


[Mermaid](https://mermaid.js.org/) produit un diagramme depuis du texte. Un bloc
`mermaid` charge le moteur uniquement sur les pages concernées.

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


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/fr/docs/features/diagrams/index.md
