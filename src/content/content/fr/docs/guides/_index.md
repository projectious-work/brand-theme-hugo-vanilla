+++
title = "Guide de rédaction"
linkTitle = "Guides"
overviewTitle = "Guide de rédaction de contenu"
description = "Créer des pages, liens, blocs de code, diagrammes, enregistrements et notebooks."
weight = 40
icon = "book"
math = true
+++

Ce guide constitue la référence pour les auteurs.

## Pages et liens

Utilisez `weight` pour l'ordre et un page bundle pour les ressources. Un fragment
relie un titre de la page courante: `[Enregistrements](#enregistrements-de-terminal)`.
Pour une autre page: `[Formats](../configuration.md#fichiers)`. Le hook de rendu
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

```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
  H --> P[HTML et impression]
```

Avec `math = true`, KaTeX affiche \( t_{build} < 1s \).

## Enregistrements de terminal

[asciinema](https://asciinema.org/) enregistre le texte et le minutage d'une session
de terminal. Le résultat reste net, copiable et léger.

{{< asciinema src="/casts/theme-tour.cast" rows="8" cols="80" idleTimeLimit="1.5" >}}

## Jupyter notebooks

[Jupyter](https://jupyter.org/) associe texte, code exécutable et résultats. Le
thème convertit les fichiers `.ipynb` en Markdown avant le build Hugo.

{{< notebook "theme-demo" >}}
