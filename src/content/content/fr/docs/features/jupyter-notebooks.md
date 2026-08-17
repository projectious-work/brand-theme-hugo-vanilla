+++
title = "Jupyter notebooks"
description = "Publier les résultats de notebooks convertis de façon reproductible."
weight = 80
icon = "notebook"
+++

[Jupyter](https://jupyter.org/) associe texte, code et résultats. Le thème
convertit les fichiers `.ipynb` en Markdown avant le build Hugo.

L'exemple converti en direct et son code copiable sont présentés dans
[Shortcodes](../shortcodes.md).

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

Le shortcode intègre un résultat converti; il n'exécute aucun code.
