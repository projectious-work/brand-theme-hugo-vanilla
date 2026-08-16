# Blocs de code

> Configurer la coloration, les noms de fichier, les numéros et les lignes mises en évidence.


Le thème confie les blocs de code Markdown au moteur Chroma de Hugo. Il ajoute un
en-tête indiquant le langage ou le nom de fichier ainsi qu'un bouton de copie.

## Exemple simple

````md
```python {filename="report.py"}
print("prêt")
```
````

## Options par bloc

| Option | Défaut | Effet |
|---|---|---|
| `filename="report.py"` | Langage | Affiche le nom de fichier dans l'en-tête |
| `linenos=false` | Réglage du site | Masque les numéros de ligne |
| `linenos=table` | Réglage du site | Place les numéros dans une colonne copiable |
| `linenos=inline` | Réglage du site | Insère le numéro dans chaque ligne |
| `linenostart=20` | `1` | Commence la numérotation à 20 |
| `hl_lines=[3,"6-8"]` | Aucun | Met en évidence des lignes et plages |
| `anchorlinenos=true` | `false` | Rend les numéros de ligne cliquables |
| `lineanchors="exemple-"` | Vide | Préfixe les ancres pour éviter les collisions |

## Valeurs par défaut du site

```toml {filename="hugo.toml"}
[markup.highlight]
  lineNos = false
  lineNumbersInTable = true
  noClasses = false
  tabWidth = 4
```

Les attributs d'un bloc remplacent ces valeurs. `noClasses = false` permet au
thème d'adapter les couleurs aux modes clair et sombre. La
[référence Hugo](https://gohugo.io/content-management/syntax-highlighting/)
présente toutes les options Chroma.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/fr/docs/features/code-blocks/index.md
