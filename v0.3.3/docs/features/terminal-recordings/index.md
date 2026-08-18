# Terminal recordings

> Record and embed copyable terminal sessions with asciinema.


[asciinema](https://asciinema.org/) records terminal text and timing data rather
than video. Recordings stay sharp, remain copyable, and are usually much smaller
than screen video.

Install the recorder, run `asciinema rec theme-tour.cast`, and put the resulting
file in a page bundle or under `static/casts/`.

{{< asciinema src="/casts/theme-tour.cast" rows="8" cols="80" idleTimeLimit="1.5" >}}

```md
{{</* asciinema src="/casts/theme-tour.cast" rows="8" cols="80"
     idleTimeLimit="1.5" */>}}
```

`cols`, `rows`, `speed`, `idleTimeLimit`, `autoplay` and `loop` are supported.

Autoplay is off by default. The player version is pinned in `data/cdn.yaml`; see
[Dependencies](../dependencies.md) for CDN and self-hosting options.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.3/docs/features/terminal-recordings/index.md
