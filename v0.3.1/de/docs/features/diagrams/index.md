# Diagramme

> Responsive Mermaid-Diagramme aus Markdown rendern.


[Mermaid](https://mermaid.js.org/) erzeugt Diagramme aus Text. Ein
`mermaid`-Codeblock lädt die Laufzeit nur auf Seiten, die sie benötigen.

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


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/de/docs/features/diagrams/index.md
