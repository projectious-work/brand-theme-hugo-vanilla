# Tailwind and design tokens

> Use the theme's Tailwind integration and stable projectious.work design tokens.


Content authors normally use Markdown and shortcodes; they do not need Tailwind.
Template developers may use Tailwind utilities in site-owned layouts and
shortcodes. Hugo's build statistics tell Tailwind which classes were actually
emitted, so `[build.buildStats] enable = true` is required.

## Available Tailwind namespaces

The theme maps brand tokens in `assets/css/theme-layer.css`:

| Kind | Utilities | Meaning |
|---|---|---|
| Fonts | `font-display`, `font-sans`, `font-mono` | Plus Jakarta Sans, Source Sans 3, IBM Plex Mono |
| Colours | `bg-page`, `bg-surface`, `bg-subtle`, `bg-terminal` | Page, raised, subtle and terminal surfaces |
| Text | `text-hi`, `text-lo`, `text-accent` | Primary, supporting and accent text |
| Borders | `border-default`, `border-accent` | Standard and accent boundaries |
| Radius | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` | 3, 6, 9 and 13 pixels |
| Spacing | standard Tailwind multiples of 4px | `p-1` = 4px, `gap-6` = 24px |
| Breakpoints | `sm`, `md`, `lg`, `xl` | 640, 768, 1024 and 1280 pixels |

```html
<aside class="rounded-lg border border-default bg-surface p-6 text-hi">
  <h2 class="font-display text-accent">Release status</h2>
  <p class="font-sans text-lo">All documentation checks passed.</p>
</aside>
```

## CSS token reference

Use CSS custom properties when a utility is not appropriate. The complete source
of truth is `assets/css/brand-tokens.css`; it defines the 12-step Midnight, Orange
and Slate scales, semantic success/warning/danger/info colours, typography,
spacing, radii, shadows, motion, breakpoints, layout measurements, terminal ANSI
slots and light/dark syntax roles. Prefer semantic tokens such as
`--color-text-primary`, `--color-surface`, `--color-border`, `--space-5`,
`--radius-lg` and `--type-body-size` over raw palette steps.

The implementation follows the [projectious.work brand design system](https://github.com/projectious-work/brand).
Set `params.build.tailwind = false` only when site templates contain no Tailwind
utilities; the theme's component CSS and tokens still render.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/features/tailwind/index.md
