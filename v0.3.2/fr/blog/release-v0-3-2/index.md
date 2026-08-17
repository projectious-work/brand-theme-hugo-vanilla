# v0.3.2 — hooks publics pour les ressources du site

> Les sites peuvent désormais ajouter leur CSS et leur JavaScript via Hugo Pipes sans remplacer les pipelines internes du thème.


v0.3.2 ajoute deux points d'extension rétrocompatibles.

`hooks/styles-end.html` ajoute le CSS ou SCSS du site et
`hooks/scripts-end.html` son JavaScript. Les deux partials sont vides par défaut
et s'exécutent après le pipeline du thème, avec Tailwind comme en mode Hugo seul.

Le [guide de développement](../../../docs/developer-guide.md#append-site-owned-css-and-javascript)
fournit des exemples à copier avec compilation, minification, empreinte et SRI.
Aucune modification de configuration n'est nécessaire pour les sites existants.

L'archive et sa somme de contrôle sont disponibles dans la
[version GitHub v0.3.2](https://github.com/projectious-work/brand-theme-hugo-vanilla/releases/tag/v0.3.2).


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.2/fr/blog/release-v0-3-2/index.md
