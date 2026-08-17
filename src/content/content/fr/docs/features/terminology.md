+++
title = "Terminologie"
description = "Définir les termes récurrents dans un glossaire partagé."
icon = "book-2"
+++

Un {{< term "module" >}} installe le thème. Un
{{< term "page-bundle" >}} regroupe les ressources associées.

```md
Un {{</* term "module" */>}} installe le thème.
{{</* term key="page-bundle" label="Page bundles" */>}}
```

Les définitions résident dans `data/glossary.yaml`; `label` modifie le texte visible.
