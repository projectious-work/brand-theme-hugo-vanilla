# Terminology

> Keep recurring definitions consistent through a shared glossary.


A {{< term "module" >}} installs the theme. A {{< term "page-bundle" >}} keeps
related page resources together.

```md
A {{</* term "module" */>}} installs the theme.
{{</* term key="page-bundle" label="Page bundles" */>}} keep resources together.
```

Definitions live in `data/glossary.yaml`. The first positional value or `key`
selects an entry; `label` overrides the visible text without duplicating the
definition.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/features/terminology/index.md
