+++
title = "Modification et retours"
description = "Relier les pages à leurs sources et recueillir éventuellement l'avis des lecteurs."
weight = 65
icon = "pencil"
+++

`params.editURL` désigne le dossier contenant les sources Markdown; le thème y
ajoute le chemin relatif de la page. Une table `default`, `de`, `fr` convient aux
racines de contenu séparées.

`params.feedbackEndpoint` est facultatif. Le navigateur envoie chemin, vote, titre
et langue. Sa limitation locale améliore seulement l'interface: le serveur doit
valider origine et champs, limiter la taille et appliquer sa propre limitation de
débit.
