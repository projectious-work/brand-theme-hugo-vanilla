+++
title = "Documentation versionnée"
description = "Publier des builds distincts et les relier par le menu de versions."
weight = 10
icon = "versions"
+++

Chaque version est un build Hugo distinct. Publiez la version courante à la racine
stable et les anciennes sous `/v0.2/`, par exemple. N'ajoutez à `params.versions`
que des URL déjà publiées. `probe = false` renvoie vers la racine d'une version
dont la structure diffère.
