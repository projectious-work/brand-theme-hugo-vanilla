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

The shortcode loads the exactly pinned asciinema-player 3.17.0 runtime from
jsDelivr. Set `params.selfHostAssets = true` to use a local mirror instead.

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

KaTeX 0.18.4 loads from an exactly pinned jsDelivr URL on pages with math, or
from the configured local mirror when self-hosting is enabled.

## Raw Markdown

Every page is also served as Markdown. The **Copy as Markdown** button at the top
of a docs page copies that file, and `/llms.txt` lists the whole site as links —
both useful when handing documentation to an agent.
