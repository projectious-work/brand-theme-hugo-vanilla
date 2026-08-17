+++
title = "Terminology"
description = "Keep recurring definitions consistent through a shared glossary."
weight = 190
icon = "book-2"
+++

A {{< term "module" >}} installs the theme. A {{< term "page-bundle" >}} keeps
related page resources together.

```md
A {{</* term "module" */>}} installs the theme.
{{</* term key="page-bundle" label="Page bundles" */>}} keep resources together.
```

Definitions live in `data/glossary.yaml`. The first positional value or `key`
selects an entry; `label` overrides the visible text without duplicating the
definition.
