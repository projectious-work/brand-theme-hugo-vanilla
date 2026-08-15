+++
title = "Aufzeichnungen und Formeln"
description = "Terminal-Aufzeichnungen, LaTeX und die Markdown-Werkzeuge."
weight = 50
icon = "player-play"
math = true
tags = ["referenz"]
+++

## Terminal-Aufzeichnungen

Mit `asciinema rec static/casts/deploy.cast` aufnehmen, dann einbinden:

```md
{{</* asciinema src="/casts/deploy.cast" rows="18" idleTimeLimit="1.5" */>}}
```

Der Shortcode lädt den exakt versionierten asciinema-player 3.17.0 von jsDelivr.

{{< callout type="note" title="Kein Autoplay" >}}
Das Markensystem schließt Autoplay aus. Aufzeichnungen starten auf Klick.
{{< /callout >}}

## Formeln

`math = true` im Frontmatter setzen. Inline: \\( t_{p99} = 240\,\text{ms} \\).
Als Block:

$$
\text{Kosten}(n) = c_{\text{fix}} + n \cdot c_{\text{run}}
$$

## Markdown-Quelle

Jede Seite wird zusätzlich als Markdown ausgeliefert. **Als Markdown kopieren**
kopiert diese Datei, und `/llms.txt` listet die gesamte Website als Links.
