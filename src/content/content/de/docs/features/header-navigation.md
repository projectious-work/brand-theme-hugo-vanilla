+++
title = "Kopfleiste und Navigation"
description = "Primäre Links, Suche, Sprach- und Versionsmenü konfigurieren."
weight = 100
icon = "menu-2"
+++

`menus.main` definiert primäre Links; verwenden Sie `pageRef` für interne Seiten
und `url` für externe Ziele. `params.github` ergänzt das GitHub-Symbol.

Weitere Symbole werden als SVG unter `assets/icons/` abgelegt und über
`partials/icon.html` eingebunden. Links mit Symbol benötigen ein `aria-label` und
eine ausreichend große Zielfläche.
