# Icon set

Stroke-only glyphs on a 24 px grid, 1.5 px stroke, round caps — the geometry
conventions of Tabler Icons (MIT), which the brand system specifies. Colour comes
from `currentColor`; size from the `.ico` wrapper classes in `components.css`.

Nothing is fetched at page load: Hugo inlines these files, so the set works
offline.

Use it as `{{< icon "book" >}}` in Markdown, or
`{{ partial "icon.html" (dict "name" "book" "class" "ico--sm") }}` in a template.

To vendor the complete Tabler set, copy `icons/outline/*.svg` from
`tabler/tabler-icons` into this folder — the files are drop-in compatible.
