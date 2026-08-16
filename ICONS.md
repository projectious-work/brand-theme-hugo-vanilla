# Icons

The theme resolves an icon name against three sources, first match wins:

| Order | Location | Purpose |
|---|---|---|
| 1 | `assets/icons/<name>.svg` **in your site** | Override a glyph, or add one Tabler does not have |
| 2 | `assets/tabler-icons/outline/<name>.svg` | The full Tabler Icons outline set, from a pinned module |
| 3 | `assets/icons/fallback/<name>.svg` **in the theme** | 38 glyphs so the theme renders with no module mounted |

An unknown name is a **build error**, not a silent gap — it names the file to add and
links the catalogue.

## Mounting the full set

Tabler Icons is not vendored into this repository: ~5,900 files would dominate the
theme's own source. Mount it as a module instead, pinned to an exact version:

```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

  # Tabler Icons v3.31.0 (MIT). npm mirror, mounted where the theme looks for it.
  [[module.mounts]]
    source = "node_modules/@tabler/icons/icons/outline"
    target = "assets/tabler-icons/outline"
```

```sh
npm install --save-exact @tabler/icons@3.31.0
```

Pin exactly. Tabler renames and redraws glyphs between minors, and an unpinned bump
turns a working page into a build error.

With that mount in place every Tabler outline name works:

```md
{{</* icon "brand-github" */>}}
{{</* icon name="rocket" class="ico--lg" label="Launch" */>}}
```

## Name mapping

Theme names **are** Tabler filenames, minus the `.svg`:

| Written as | Tabler file |
|---|---|
| `{{</* icon "menu-2" */>}}` | `icons/outline/menu-2.svg` |
| `{{</* icon "brand-github" */>}}` | `icons/outline/brand-github.svg` |
| `{{</* icon "alert-triangle" */>}}` | `icons/outline/alert-triangle.svg` |

Two consequences worth knowing: Tabler's `filled/` variants are not mounted, because
the brand system specifies stroke-only icons; and the wrapper is re-emitted by the
theme, so a file's own `width`, `height` and `stroke` are discarded in favour of
`.ico` sizing and `currentColor`.

## Bundled fallback set

`assets/icons/fallback/` holds the 38 glyphs the theme's own chrome needs — menu,
search, chevrons, sun/moon/desktop, copy, callout glyphs, printer, language, github,
thumbs, accessible, folder, file, book, pencil, tag, clock, versions, list, play.
Authored on Tabler's conventions: 24px grid, 1.5px stroke, round caps, no fills.

## Licence and attribution

Tabler Icons is **MIT**, © Paweł Kuna. Mounting the module brings its `LICENSE` into
your `node_modules`; ship that file, or the line below, wherever you credit
third-party assets:

> Icons by Tabler Icons (https://tabler.io/icons) — MIT, © Paweł Kuna.

The bundled fallback glyphs are original drawings following Tabler's geometry, and
are covered by this theme's own MIT licence.
