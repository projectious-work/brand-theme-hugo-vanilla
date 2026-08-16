+++
title = "Mathematics"
description = "Render inline and display mathematics with KaTeX."
weight = 70
icon = "math"
math = true
+++

KaTeX renders LaTeX notation. Set `math = true` in the page front matter first.
Inline mathematics such as \( t_{build} < 1s \) stays in a sentence; display
mathematics gets its own block:

$$
T_{publish} = T_{build} + T_{verify} + T_{deploy}
$$

```md
+++
math = true
+++

Inline: \\( t_{build} < 1s \\)

$$
T_{publish} = T_{build} + T_{verify} + T_{deploy}
$$
```

See [Page configuration](../configuration/page-configuration.md) for the
front-matter contract and [Dependencies](../dependencies.md) for the runtime pin.
