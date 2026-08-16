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
