+++
title = "Notebook-Demonstration des Themes"
headless = true
+++

### Ausgabe eines Notebooks zur Build-Zeit

Diese Vorschau zeigt Markdown aus dem fest versionierten `nbconvert`-Ablauf.
Ein echtes Notebook kann Erläuterungen, hervorgehobene Eingaben und tabellarische
Ausgaben enthalten.

```python {filename="analysis.ipynb · Zelle 1"}
pages = 98
languages = ["English", "Deutsch", "Français"]
pages_per_language = pages / len(languages)
pages_per_language
```

```text {filename="Ausgabe"}
32.67
```

| Sprache | Veröffentlicht |
|---|---:|
| Englisch | ja |
| Deutsch | ja |
| Französisch | ja |
