# Codeblöcke

> Syntaxhervorhebung, Dateinamen, Zeilennummern und markierte Zeilen konfigurieren.


Das Theme rendert eingezäunte Markdown-Codeblöcke mit Hugos
Chroma-Syntaxhervorhebung. Es ergänzt eine Kopfzeile mit Sprache oder Dateiname
und einer Kopierschaltfläche.

## Einfaches Beispiel

````md
```python {filename="report.py"}
print("bereit")
```
````

## Optionen pro Codeblock

| Option | Standard | Wirkung |
|---|---|---|
| `filename="report.py"` | Sprachname | Dateiname in der Kopfzeile |
| `linenos=false` | Website-Einstellung | Zeilennummern ausblenden |
| `linenos=table` | Website-Einstellung | Kopierfreundliche Nummernspalte |
| `linenos=inline` | Website-Einstellung | Nummer in jeder hervorgehobenen Zeile |
| `linenostart=20` | `1` | Nummerierung bei 20 beginnen |
| `hl_lines=[3,"6-8"]` | Keine | Zeilen und Bereiche hervorheben |
| `anchorlinenos=true` | `false` | Zeilennummern verlinkbar machen |
| `lineanchors="beispiel-"` | Leer | Eindeutiges Präfix für Zeilenanker |

## Website-weite Standards

```toml {filename="hugo.toml"}
[markup.highlight]
  lineNos = false
  lineNumbersInTable = true
  noClasses = false
  tabWidth = 4
```

Attribute am Codeblock überschreiben diese Werte. `noClasses = false` erlaubt
dem Theme, die Farben an den hellen und dunklen Modus anzupassen. Die vollständige
Liste steht in Hugos
[Dokumentation zur Syntaxhervorhebung](https://gohugo.io/content-management/syntax-highlighting/).


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/de/docs/features/code-blocks/index.md
