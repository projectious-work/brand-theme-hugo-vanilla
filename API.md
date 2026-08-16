# Public API

What a consuming site may rely on, and what it may not. Anything listed as public
changes only in a minor release with a note in the release notes; anything listed as
internal can change in any release.

Semantic versioning applies to this contract, not to the rendered pixels: a token
that keeps its name but changes meaning is a **breaking change** and gets a major.

## Public — semantic CSS tokens

Consume these in your own layouts. They are re-exported from the brand token sheet
and will not be renamed without a major.

| Token | Meaning |
|---|---|
| `--color-bg` | Page background |
| `--color-surface` | Raised surface — cards, panels, menus |
| `--surface-2` | Surface one step up, for hover on a surface |
| `--color-text-primary` | Body and heading text |
| `--color-text-secondary` | Supporting text, metadata, markers |
| `--color-border` | Decorative divider — a card edge, a rule between rows |
| `--border-strong` | Interactive boundary; meets WCAG 1.4.11 at 3:1 |
| `--color-accent` | Identity accent — marks, active states, rules. **Not text** |
| `--color-accent-solid` | Accent fill carrying white text |
| `--color-{info,success,warning,danger}` + `-bg` / `-fg` | Semantic triple; use `-fg` on the tint |
| `--font-heading`, `--font-body`, `--font-code` | The three type roles |
| `--type-*-size`, `--type-*-lh` | Type ramp; all scale through `--font-scale` |
| `--radius-{sm,md,lg,xl}` | 3 / 6 / 9 / 13 px |
| `--space-1` … `--space-9` | 4 px base scale |
| `--terminal-surface`, `--terminal-light-surface` | Code panel surfaces |
| `--syntax-<role>`, `--syntax-<role>-light` | Ten syntax roles, both modes |
| `--shell-max`, `--sidebar-w`, `--toc-w`, `--header-h` | Theme layout measures |

## Public — Tailwind namespaces

Declared in `assets/css/theme-layer.css` and stable:

| Utility | Resolves to |
|---|---|
| `bg-page` `bg-surface` `bg-subtle` | Page, surface, subtle backgrounds |
| `text-hi` `text-lo` | Primary and secondary text |
| `border-default` | Divider border |
| `text-accent` `bg-accent-solid` | Accent |
| `font-display` `font-sans` `font-mono` | The three roles |
| `rounded-{sm,md,lg,xl}` | The radii ladder |

## Public — template interfaces

- **Partials**: `icon.html`, `url.html`, `cdn-url.html`, `script.html`,
  `child-cards.html`, `taglist.html`, `breadcrumbs.html`, `toc.html`,
  `page-tools.html`. Argument shapes are documented in each file's header comment.
- **Shortcodes**: every name in the gallery, with its documented parameters.
- **Front matter**: `weight`, `description`, `icon`, `toc`, `math`, `private`,
  `hidden`, `cards`, `cover`, `coverAlt`, `layout = "search"`.
- **Site params**: every key in the configuration reference.
- **Blocks**: `main` in `_default/baseof.html`.
- **Data**: `data/cdn.yaml` and `data/glossary.yaml` keys.

## Internal — do not depend on these

- **Palette steps** — `--midnight-N`, `--orange-N`, `--slate-N`. These are the
  implementation behind the semantic tokens. Use the semantic name; the step a
  semantic token points at can change.
- **Component class names** — `.docs__main`, `.sidebar__group`, `.postlist__item`,
  `.palette__panel` and the rest. Styling hooks for the theme's own CSS, not an API.
- **`data-*` behaviour attributes** — `data-search`, `data-palette`, `data-cast`
  and friends are contracts between the theme's own templates and its own JS.
- **Everything in `assets/js/`** — no exported API beyond `window.pwTheme`.
- **`--ft-*`** file-tree geometry variables.

## Public — JavaScript

`window.pwTheme`:

| Member | Contract |
|---|---|
| `.get()` | Current mode preference: `light` `dark` `navy` `system` |
| `.set(mode)` | Sets and persists it; fires `pw:mode` on `document` |
| `.getA11y(attr)` / `.setA11y(attr, value)` | Reads/writes one accessibility attribute; fires `pw:a11y` |

The `pw:mode` event is public: the Mermaid loader and the asciinema player both
listen for it, and your own code can too.

## Token reference

Any content page with `layout = "tokens"` is **generated from
`assets/css/theme-layer.css` and the brand token sheet at build time**. The example
site publishes it at `/docs/features/tokens/`. It parses the CSS rather than
restating it, so it cannot drift. If a mapping disappears from the CSS it
disappears from the page.
