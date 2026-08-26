# Images

> Publish responsive figures, captions, dark variants and lightboxes.


## SVG images

SVG is ideal for illustrations, diagrams, logos and other vector artwork. It
stays sharp at every scale and normally produces a compact file.

{{< image src="/img/sunrise-brand.svg"
    alt="Orange sunrise over layered navy mountains"
    caption="A brand-colour sunrise illustration" >}}

```md
{{</* image src="/img/sunrise-brand.svg"
     alt="Orange sunrise over layered navy mountains"
     caption="A brand-colour sunrise illustration" */>}}
```

This safe external-image form isolates SVG scripts and styles from the page.

### Trusted inline SVG

Trusted SVG in `assets/` or a page bundle can instead be embedded when its
links, CSS hooks or native interaction must remain part of the document. Inline
mode is explicit because it injects SVG markup into the page.

{{< graphic src="graphics/graphics-pipeline.svg" inline="true"
    alt="A build pipeline ending in responsive SVG and Hugo output"
    caption="A trusted resource embedded inline for theme-aware styling." >}}

```md
{{</* graphic src="graphics/graphics-pipeline.svg" inline="true"
    alt="A build pipeline ending in responsive SVG and Hugo output"
    caption="Theme-aware inline vector artwork." */>}}
```

Only inline SVG that you author or sanitize. The shortcode rejects non-SVG
resources and files outside Hugo's page/global asset pipelines when
`inline="true"`.

## Bitmap images

PNG, WebP and JPEG use the same API. Choose them for screenshots, photographs,
textures and other pixel-based material.

{{< image src="/img/documentation-desktop.png"
    alt="The documentation theme at desktop width with sidebar and article"
    caption="A PNG screenshot rendered as a responsive figure." >}}

```md
{{</* image src="/img/documentation-desktop.png"
     alt="The documentation theme at desktop width with sidebar and article"
     caption="A PNG screenshot rendered as a responsive figure." */>}}
```

Prefer WebP for photographic content when your publishing requirements allow
it, and export enough pixels for high-density displays. The `graphic` shortcode
uses the same figure treatment when an illustration needs source metadata or a
dark variant:

```md
{{</* graphic src="/img/report.webp"
    src-dark="/img/report-dark.webp"
    alt="Heat map of service latency by region"
    caption="Latency distribution, sampled every five minutes." */>}}
```

## Page bundles and dark variants

Prefer a page bundle and reference a sibling image by filename. Hugo then knows
its dimensions. `src-dark` supplies an explicit dark-mode variant. Ordinary
Markdown images use the same figure and lightbox behavior; their title becomes
the caption.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/features/images/index.md
