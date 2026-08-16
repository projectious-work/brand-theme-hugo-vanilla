+++
title = "Guide de rédaction"
linkTitle = "Guides"
overviewTitle = "Guide de rédaction de contenu"
description = "Créer des pages, liens, blocs de code, diagrammes, enregistrements et notebooks."
weight = 40
icon = "book"
+++

Ce guide constitue la référence pour les auteurs.

## Pages et liens

Utilisez `weight` pour l'ordre et un page bundle pour les ressources. Un fragment
relie un titre de la page courante: `[Enregistrements](#enregistrements-de-terminal)`.
Pour une autre page: `[Formats](../configuration/site-wide.md#fichiers)`. Le hook de rendu
résout le fichier avec Hugo; déplacer la cible provoque une erreur de build plutôt
que la publication silencieuse d'un lien cassé.

## Terminal

{{< terminal title="Aperçu local" >}}
$ hugo server --disableFastRender
Watching for changes in content and layouts
Built in 284 ms
Web Server is available at http://localhost:1313/
{{< /terminal >}}

## Diagrammes et mathématiques

Utilisez un bloc `mermaid` pour un diagramme et activez `math = true` pour
KaTeX. Consultez [Diagrammes](../features/diagrams.md) et
[Mathématiques](../features/mathematics.md).

## Enregistrements de terminal

Intégrez un fichier `.cast` avec le shortcode `asciinema`. Consultez
[Enregistrements de terminal](../features/terminal-recordings.md).

## Jupyter notebooks

Intégrez un notebook converti avec le shortcode `notebook`. Consultez
[Jupyter notebooks](../features/jupyter-notebooks.md).
