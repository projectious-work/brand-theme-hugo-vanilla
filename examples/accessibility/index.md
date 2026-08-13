---
title: "Accessibility"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/examples/accessibility/"
description: "Landmarks, focus, contrast, motion, and content rules in practice."
---


## Built into the shell

The theme mirrors the brand system's token sheet verbatim, so every text role,
tint and focus treatment is the measured one. On top of that it opts into the
three accessibility attributes new work is expected to set:
`data-a11y="auto"`, `data-focus="strong"` and `data-link-underline="on"`.

{{< grid columns="2" >}}
{{< panel title="Keyboard" >}}
- Logical reading and focus order
- Conforming `:focus-visible` ring at midnight-9
- 44 px minimum control target
- Escape closes the search dialog and returns focus
{{< /panel >}}
{{< panel title="Perception" >}}
- Text uses step 11 or 12 roles only
- Status pairs its dot with a written label
- Reduced motion and transparency follow the OS
- Errors stay next to the failed region
{{< /panel >}}
{{< /grid >}}

## Reader-controlled settings

The remaining attributes from the brand system work against this theme
unchanged, because nothing here redeclares a token. Set them on `<html>` to
verify a page holds up.

| Attribute | Values | What it does |
|---|---|---|
| `data-font-size` | `lg` `xl` `xxl` `xxxl` | 112.5% · 125% · 150% · 200%. Every type size scales through `--font-scale`. |
| `data-contrast` | `high` | Flattens tints to solid borders and pushes text roles to the ends of their scale. |
| `data-text-spacing` | `loose` | Applies the WCAG 1.4.12 minimums. A clipping diagnostic, not a house style. |
| `data-theme` | `light` `dark` | Pins the mode, ignoring the OS. The theme toggle writes this. |

{{< callout type="info" >}}The accent identity colour is never body text. Accent text takes `orange-11`, which swaps with the mode; solid accent fills carrying white text use `accent-solid`.{{< /callout >}}

