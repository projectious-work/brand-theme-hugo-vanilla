# Jupyter Notebooks

> Reproduzierbar konvertierte Notebook-Ausgaben veröffentlichen.


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


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/de/docs/features/jupyter-notebooks/index.md
