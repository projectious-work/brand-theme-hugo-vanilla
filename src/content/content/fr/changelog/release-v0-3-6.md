+++
title = "v0.3.6 — identité configurable et composition réutilisable"
description = "L’identité produit, les chronologies et les enregistrements de terminal se configurent sans copier les modèles du thème."
date = 2026-08-22T22:00:00+02:00
author = "projectious.work"
tags = ["release", "modèles"]
aliases = ["/blog/release-v0-3-6/"]
+++

La version v0.3.6 réduit le besoin de remplacer les modèles du thème.
`params.brand` configure la destination, le mot-symbole, les marques claire et
sombre, ainsi que les icônes, tout en conservant les valeurs projectious.work
par défaut.

Les partiels publics `timeline.html` et `asciinema.html` composent des feuilles
de route, des phases et des galeries d’enregistrements à partir de données
structurées. Le lecteur accepte aussi les options de commandes, d’ajustement et
de palette. Le mode clair explicite réinitialise désormais toutes les couleurs
de marque définies par le mode sombre.

[Version v0.3.6 sur GitHub](https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.3.6)
