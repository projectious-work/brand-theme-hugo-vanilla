# Guide développeur

> Adapter le thème, remplacer les ressources et tester les changements.


Un site consommateur surcharge un gabarit dans son propre dossier `layouts/` au
lieu de modifier le cache du module. Les variables de `brand-tokens.css` forment la
surface de personnalisation stable.

## Icônes incluses

La liste complète et les sources se trouvent dans
[`src/assets/icons/`](https://github.com/projectious-work/brand-theme-hugo-vanilla/tree/main/src/assets/icons).
Elle comprend notamment `accessible`, `book`, `brand-github`, `file`, `folder`,
`language`, `menu-2`, `printer`, `search`, `tag` et `versions`.

## Build et tests

```sh
npm install
./scripts/build.sh
./scripts/verify.sh
./scripts/serve-watch.sh start
```

Inspectez les images de différence avant de mettre à jour une référence visuelle.
Les contributions passent par une branche courte, un commit conventionnel et une
pull request.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/fr/docs/developer-guide/index.md
