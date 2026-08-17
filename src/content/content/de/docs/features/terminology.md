+++
title = "Terminologie"
description = "Wiederkehrende Begriffe über ein gemeinsames Glossar definieren."
icon = "book-2"
+++

Ein {{< term "module" >}} installiert das Theme. Ein
{{< term "page-bundle" >}} hält zusammengehörige Ressourcen zusammen.

```md
Ein {{</* term "module" */>}} installiert das Theme.
{{</* term key="page-bundle" label="Page Bundles" */>}}
```

Definitionen liegen in `data/glossary.yaml`; `label` überschreibt nur den Text.
