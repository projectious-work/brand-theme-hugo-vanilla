# Mathematics

> Render inline and display mathematics with KaTeX.


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

For generated expressions that are awkward to place directly in Markdown, the
paired shortcode is equivalent:

```md
{{</* math display="block" */>}}
T_{publish} = T_{build} + T_{verify} + T_{deploy}
{{</* /math */>}}
```

See [Page configuration](../configuration/page-configuration.md) for the
front-matter contract and [Dependencies](../dependencies.md) for the runtime pin.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/features/mathematics/index.md
