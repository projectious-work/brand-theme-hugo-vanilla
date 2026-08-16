# Dépendances et SBOM

> Outils de build, bibliothèques navigateur, versions et licences.


| Composant | Version | Usage |
|---|---:|---|
| Hugo | 0.128.0 minimum; testé 0.164.0 | build |
| Go | 1.22 | modules |
| Tailwind CLI | 4.3.3 | CSS |
| Playwright | 1.62.1 | tests navigateur |
| Tabler Icons | 3.31.0 | catalogue complet d'icônes |
| IBM Plex Mono | 5.3.0 | fontes intégrées pour le code |
| FlexSearch | 0.8.143 | recherche locale |
| KaTeX | 0.18.4 | mathématiques |
| Mermaid | 11.16.1 | diagrammes |
| asciinema-player | 3.17.0 | terminal |
| nbconvert | 7.16.6 | conversion optionnelle |

Les dépendances npm exactes sont dans `package-lock.json`, les versions navigateur
dans `data/cdn.yaml` et les versions Python dans `scripts/requirements.txt`.
IBM Plex Mono comprend les fontes droites et italiques de graisses 400, 500,
600 et 700. La coloration syntaxique utilise donc de vraies fontes plutôt que
des variantes synthétisées par le navigateur.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/fr/docs/dependencies/index.md
