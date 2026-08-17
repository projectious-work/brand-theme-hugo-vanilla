+++
title = "Jupyter Notebooks"
description = "Reproduzierbar konvertierte Notebook-Ausgaben veröffentlichen."
weight = 80
icon = "notebook"
+++

[Jupyter Notebooks](https://jupyter.org/) verbinden Text, Code und Ausgaben. Das
Theme konvertiert `.ipynb` vor dem Hugo-Build in Markdown.

Das konvertierte Live-Beispiel und den kopierbaren Quelltext finden Sie unter
[Shortcodes](../shortcodes.md).

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

Der Shortcode bettet nur konvertierte Dateien ein und führt keinen Code aus.
