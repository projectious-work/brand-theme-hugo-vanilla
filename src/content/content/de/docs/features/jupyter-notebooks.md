+++
title = "Jupyter Notebooks"
description = "Reproduzierbar konvertierte Notebook-Ausgaben veröffentlichen."
weight = 80
icon = "notebook"
+++

[Jupyter Notebooks](https://jupyter.org/) verbinden Text, Code und Ausgaben. Das
Theme konvertiert `.ipynb` vor dem Hugo-Build in Markdown.

{{< notebook "theme-demo" >}}

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

Der Shortcode bettet nur konvertierte Dateien ein und führt keinen Code aus.
