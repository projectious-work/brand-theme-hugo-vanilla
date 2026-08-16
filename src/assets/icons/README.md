# Icon set

Stroke-only glyphs on a 24 px grid, 1.5 px stroke, round caps — the geometry
conventions of Tabler Icons (MIT), which the brand system specifies. Colour comes
from `currentColor`; size from the `.ico` wrapper classes in `components.css`.

The bundled offline glyphs live in `fallback/`. The resolver first checks a
consuming-site override at `assets/icons/<name>.svg`, then the pinned Tabler mount,
then this fallback directory. Nothing is fetched at page load.

Use it as `{{< icon "book" >}}` in Markdown, or
`{{ partial "icon.html" (dict "name" "book" "class" "ico--sm") }}` in a template.

See the repository's `ICONS.md` for the pinned Tabler mount and resolution order.
