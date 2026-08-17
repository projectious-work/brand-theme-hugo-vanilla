+++
title = "En-tête et navigation"
description = "Configurer liens principaux, recherche, langues, versions et icônes."
weight = 100
icon = "menu-2"
+++

`menus.main` définit les liens principaux. Préférez `pageRef` pour une page locale
et `url` pour une destination externe. `params.github` ajoute l'icône GitHub.

Pour un autre service, ajoutez un SVG dans `assets/icons/` et un lien `.iconbtn`
avec un `aria-label` dans `partials/header.html`.

## Groupes de la barre latérale

Lors de la première visite, tous les groupes sont fermés. Sous `[params]`,
`sidebarOpenDepth` définit le nombre de niveaux initialement ouverts : `0` est la
valeur par défaut et `1` ouvre le premier niveau. **Tout ouvrir** et **Tout
fermer** modifient l'arbre entier. Les choix individuels sont conservés dans le
stockage local du navigateur, par site et par langue, et survivent aux changements
de page. Le filtre n'ouvre les groupes correspondants que temporairement.
