+++
title = "Theme notebook demonstration"
headless = true
+++

### Build-time notebook output

This preview represents Markdown produced by the pinned `nbconvert` workflow. A
real notebook can include narrative cells, highlighted input and tabular output.

```python {filename="analysis.ipynb · cell 1"}
pages = 98
languages = ["English", "Deutsch", "Français"]
pages_per_language = pages / len(languages)
pages_per_language
```

```text {filename="output"}
32.67
```

| Language | Published |
|---|---:|
| English | yes |
| Deutsch | yes |
| Français | yes |
