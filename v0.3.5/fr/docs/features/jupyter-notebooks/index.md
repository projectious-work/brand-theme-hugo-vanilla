# Jupyter notebooks

> Publier les résultats de notebooks convertis de façon reproductible.


[Jupyter](https://jupyter.org/) associe texte, code et résultats. Le thème
convertit les fichiers `.ipynb` en Markdown avant le build Hugo.

{{< notebook "theme-demo" >}}

```md
{{</* notebook "theme-demo" */>}}
```

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

Le shortcode intègre un résultat converti; il n'exécute aucun code.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/fr/docs/features/jupyter-notebooks/index.md
