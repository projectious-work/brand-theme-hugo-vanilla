+++
title = "Internationalisation"
description = "Configurer contenus traduits, navigation, métadonnées et RTL."
weight = 50
icon = "language"
+++

Déclarez chaque langue sous `[languages.<code>]` avec `label` et `weight`, puis
placez le contenu dans son répertoire. Recherche, liens d'édition, RSS, sitemap,
`hreflang` et `llms.txt` respectent la langue. Traduisez l'interface dans
`i18n/<lang>.toml`; `languagedirection = "rtl"` inverse la structure.
