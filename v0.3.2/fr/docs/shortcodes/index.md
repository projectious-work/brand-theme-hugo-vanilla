# Shortcodes

> Référence des composants structurés fournis par le thème.


Utilisez d'abord Markdown. Les shortcodes sont réservés aux composants structurés.
La [référence anglaise](/docs/shortcodes/) montre le code complet; les exemples
essentiels sont traduits ci-dessous.

## Callout, cartes et onglets

{{< callout type="info" title="Information" >}}Un complément utile au lecteur.{{< /callout >}}

{{< cards cols="2" >}}
  {{< card title="Configuration" subtitle="Paramètres du site et des pages." link="configuration/_index.md" icon="versions" >}}
  {{< card title="Fonctionnalités" subtitle="Toutes les capacités du thème." link="features/_index.md" icon="star" >}}
{{< /cards >}}

{{< tabs items="npm, Hugo" >}}
  {{< tab >}}`npm install`{{< /tab >}}
  {{< tab >}}`hugo server`{{< /tab >}}
{{< /tabs >}}

## Étapes, détails et arborescence

{{< steps >}}
  {{< step title="Installer" >}}Ajoutez le module Hugo.{{< /step >}}
  {{< step title="Configurer" >}}Copiez les formats de sortie.{{< /step >}}
  {{< step title="Vérifier" >}}Exécutez le script de test.{{< /step >}}
{{< /steps >}}

{{< details title="Que contient l'index?" >}}Titres, descriptions, tags, contenu et titres H2/H3.{{< /details >}}

{{< filetree >}}{{< folder name="content" >}}{{< file name="_index.md" >}}{{< folder name="docs" >}}{{< file name="getting-started.md" >}}{{< /folder >}}{{< /folder >}}{{< /filetree >}}

## Terminal, diagramme et mathématiques

{{< terminal title="aperçu" >}}
$ hugo server
Watching for changes
Built in 284 ms
Web Server is available at http://localhost:1313/
{{< /terminal >}}

```mermaid
flowchart LR
  M[Markdown] --> H[Hugo]
```

Formule en ligne: \( E = mc^2 \).

La liste complète des paramètres, y compris `icon`, `badge`, `button`, `term`,
`image`, `asciinema` et `notebook`, se trouve dans le
[guide de rédaction](guides/_index.md).


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.2/fr/docs/shortcodes/index.md
