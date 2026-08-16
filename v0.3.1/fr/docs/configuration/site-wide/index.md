# Configuration globale du site

> Configurer Hugo, les sorties, les menus, les langues et le thème.


## Fichiers

| Fichier | Rôle |
|---|---|
| `hugo.toml` | URL, module, langues, menus, sorties et paramètres |
| `go.mod` | Version du thème comme module Hugo |
| `package.json` | Tailwind et tests navigateur |
| `data/cdn.yaml` | Versions exactes de KaTeX, Mermaid et asciinema |
| `i18n/*.toml` | Libellés d'interface traduits |
| Front matter | Titre, ordre et options de chaque page |

`src/content/hugo.toml` constitue l'exemple complet. `SearchIndex` produit
`/index.json`, `Print` une section imprimable, `Markdown` les actions de copie,
`LLMS` le fichier `/llms.txt`, et `RSS` les flux de notes de version.

Les paramètres du thème vont sous `[params]`; le front matter contient notamment
`title`, `description`, `weight`, `icon`, `toc`, `cards`, `math` et `private`.

## Conversion des notebooks

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

## Moteurs de recherche et llms.txt

`robots.txt` exclut les vues de recherche et d'impression dupliquées. Le sitemap
publie les variantes linguistiques. `llms.txt`, distinct de robots.txt, liste les
pages canoniques et leurs sorties Markdown pour faciliter leur découverte par les
outils. Ce n'est pas un mécanisme de contrôle d'accès.

Validez toute modification avec `./scripts/verify.sh`.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.1/fr/docs/configuration/site-wide/index.md
