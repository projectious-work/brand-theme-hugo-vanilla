+++
title = "Recordings and math"
description = "Terminal recordings, LaTeX, and the raw-Markdown affordances."
weight = 50
icon = "player-play"
math = true
tags = ["reference"]
+++

## Terminal recordings

Record with `asciinema rec static/casts/deploy.cast`, then embed it:

```md
{{</* asciinema src="/casts/deploy.cast" rows="18" idleTimeLimit="1.5" */>}}
```

The player loads from a pinned CDN version declared in `data/cdn.yaml`. Keep the
`.cast` file in the page bundle, or under `static/casts/`.

{{< callout type="note" title="Why not autoplay?" >}}
The brand system rules out autoplay video. Recordings start on click; pass
`autoplay="true"` only where the recording *is* the content.
{{< /callout >}}

## Math

Set `math = true` in front matter. Inline: \\( t_{p99} = 240\,\text{ms} \\).
Display:

$$
\text{cost}(n) = c_{\text{fixed}} + n \cdot c_{\text{run}}
$$

KaTeX loads from the same pinned CDN. For a deployment that prohibits public CDNs,
set `params.selfHostAssets = true` and mirror the files under `static/vendor/`.

## Raw Markdown

Every page is also served as Markdown. The **Copy as Markdown** button at the top
of a docs page copies that file, and `/llms.txt` lists the whole site as links —
both useful when handing documentation to an agent.
