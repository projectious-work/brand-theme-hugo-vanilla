+++
title = "Terminal-Aufzeichnungen"
description = "Kopierbare Terminalsitzungen mit asciinema einbetten."
weight = 57
icon = "player-play"
+++

[asciinema](https://asciinema.org/) speichert Text und Zeitinformationen statt
Video. Legen Sie die `.cast`-Datei im Seiten-Bundle oder unter `static/casts/` ab.

{{< asciinema src="/casts/theme-tour.cast" rows="8" cols="80" idleTimeLimit="1.5" >}}

```md
{{</* asciinema src="/casts/theme-tour.cast" rows="8" cols="80" idleTimeLimit="1.5" */>}}
```
