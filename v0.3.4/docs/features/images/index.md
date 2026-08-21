# Images

> Publish responsive figures, captions, dark variants and lightboxes.


{{< image src="/img/sunrise-brand.svg"
    alt="Orange sunrise over layered navy mountains"
    caption="A brand-colour sunrise illustration" >}}

```md
{{</* image src="/img/sunrise-brand.svg"
     alt="Orange sunrise over layered navy mountains"
     caption="A brand-colour sunrise illustration" */>}}
```

Prefer a page bundle and reference a sibling image by filename. Hugo then knows
its dimensions. `src-dark` supplies an explicit dark-mode variant. Ordinary
Markdown images use the same figure and lightbox behavior; their title becomes
the caption.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.4/docs/features/images/index.md
