+++
title = "Démonstration du thème dans un notebook"
headless = true
+++

### Sortie d’un notebook au moment de la compilation

Cet aperçu représente le Markdown produit par le flux `nbconvert` dont la
version est verrouillée. Un notebook réel peut réunir explications, entrées
mises en évidence et sorties tabulaires.

```python {filename="analysis.ipynb · cellule 1"}
pages = 98
languages = ["English", "Deutsch", "Français"]
pages_per_language = pages / len(languages)
pages_per_language
```

```text {filename="sortie"}
32.67
```

| Langue | Publiée |
|---|---:|
| Anglais | oui |
| Allemand | oui |
| Français | oui |
