+++
title = "Enregistrements de terminal"
description = "Intégrer des sessions copiables avec asciinema."
weight = 30
icon = "player-play"
+++

[asciinema](https://asciinema.org/) enregistre le texte et le minutage plutôt
qu'une vidéo. Placez le fichier `.cast` dans le bundle ou sous `static/casts/`.

{{< asciinema src="/casts/theme-tour.cast" rows="8" cols="80" idleTimeLimit="1.5" >}}

```md
{{</* asciinema src="/casts/theme-tour.cast" rows="8" cols="80"
     idleTimeLimit="1.5" */>}}
```
