+++
title = "Configuration de page (front matter)"
description = "Contrôler la navigation et les fonctions propres à une page."
weight = 20
icon = "file-settings"
+++

Le front matter est le bloc TOML placé entre `+++` au début du fichier Markdown.

```toml
+++
title = "Référence API"      # Titre obligatoire.
linkTitle = "API"            # Libellé court de navigation.
description = "API HTTP."   # Résumé et extrait de recherche.
weight = 20                  # Ordre dans la navigation.
icon = "code"               # Icône de la carte générée.
toc = true                   # Afficher la navigation des titres.
cards = true                 # Générer les cartes des pages enfants.
hidden = false               # Inclure cette page dans les cartes.
math = false                 # Charger KaTeX sur cette page.
private = false              # Inclure la page dans recherche et sitemap.
+++
```
