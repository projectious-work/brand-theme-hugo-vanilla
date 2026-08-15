+++
title = "Configuration"
description = "Site parameters the theme reads, and what each one changes."
weight = 30
icon = "versions"
tags = ["reference"]
+++

## Parameters

| Parameter | Effect |
|---|---|
| `params.version` | Label shown in the version selector and the footer |
| `params.versions` | List of `{label, url, note}` entries for the selector |
| `params.editURL` | Prefix for edit-on-GitHub links; the page path is appended |
| `params.github` | Repository link in the header |
| `params.search` | `false` removes the index, the header box and `/search` |
| `params.feedback` | `false` hides the page feedback widget |
| `params.feedbackEndpoint` | POST target for feedback votes; omitted means local only |
| `params.accessibilityMenu` | `false` hides the accessibility selector |
| `params.sidebarFilter` | `false` hides the sidebar filter box |
| `params.announcement` | `{id, text, href, label}` — dismissible bar above the header; bump `id` to re-show it |
| `params.math` | `true` loads KaTeX site-wide instead of per page |
| `params.build.tailwind` | `false` skips the Tailwind CLI step |
| `params.codeTheme` | `"adaptive"` gives light code panels in light mode; omit for the brand default of always-dark |
| `params.sidebarOpenDepth` | How many sidebar levels start expanded (default 1; 0 collapses everything off the current path) |
| `params.commandPalette` | `false` disables the palette and its shortcuts |
| `params.versionProbe` | `false` makes every version link land on that version's root |
| `params.darkSurface` | Server-rendered default before JS runs; `"navy"` matches the menu default |

## Front matter

| Key | Effect |
|---|---|
| `weight` | Sidebar and prev/next order |
| `description` | Lede paragraph, meta description, search index |
| `icon` | Icon on section index cards |
| `toc` | `false` hides the table of contents |
| `math` | `true` loads KaTeX for this page |
| `private` | `true` keeps the page out of the search index |
| `layout` | `search` renders the search results page |
| `cover` | Cover image for the blog list card and the post hero |
| `coverAlt` | Alt text for the cover image |

## Edit links

`params.editURL` is a prefix; the page's content-relative path is appended. On a
multilingual site `.File.Path` is relative to each language's own content mount, so
a German page arrives as `docs/x.md` — the theme inserts the language directory
automatically. When the repository layout differs per language, pass a map:

```toml
[params.editURL]
  default = "https://github.com/org/repo/edit/main/content/"
  de      = "https://github.com/org/repo/edit/main/content.de/"
```

## Feedback endpoint

`params.feedbackEndpoint` receives `{path, value, title, lang}` as JSON. The vote is
stored locally first, so the widget never depends on the network, and the client
sends at most one request per page per hour and ten per session — via `sendBeacon`
where available.

{{< callout type="warning" title="Client limits are not security" >}}
Anyone can post to a public endpoint directly. Add server-side rate limiting, an
origin check and a path allow-list before pointing this at production.
{{< /callout >}}

## Notebooks

`.ipynb` is JSON with embedded base64 images and ANSI stream output — converting it
in a template is the wrong shape, so it happens before the build:

```sh
./scripts/notebooks.sh
```

That writes `content/_notebooks/<name>.md` plus `static/notebooks/<name>/` images.
Embed the result with `{{< notebook "name" >}}`; it renders through the page, so the
code-block hook, image hook and every other shortcode apply to it.

## Printing

The `Print` output format renders a whole section as one document with a running
header, a two-column contents list and `counter(page) / counter(pages)` folios.
Geometry is uniform margins, so Letter and A4 both work without a second stylesheet.
Code panels print on a light background regardless of `codeTheme`.

## Search engines and llms.txt

With `enableRobotsTXT = true` the theme emits a `robots.txt` that disallows
`/search/` and `*print.html` — both duplicate canonical content. The sitemap carries
`xhtml:link` alternates for every translation and skips `private` pages; `hreflang`
tags, including `x-default`, are emitted on every page rather than only on
translated ones.

## Keyboard

| Keys | Action |
|---|---|
| `Ctrl`/`Cmd` `K` | Command palette — search, jump to a section, run a page action |
| `/` | Focus the header search box |
| `?` | Show the shortcut list |
| `g` then `h` / `d` / `b` | Home, docs, blog |
| `t` | Toggle light and dark |
| `Esc` | Close the open dialog |

## Code panels

Code is dark by default, per the brand rule. `params.codeTheme = "adaptive"`
switches to a light panel in light mode, using the design system's companion
`--syntax-*-light` roles and `--terminal-light-surface`. Dark mode is unchanged
either way.

## Images

Markdown images become figures: the title becomes a caption, and `loading="lazy"`
plus intrinsic width and height are added when the file is a page or global
resource. A sibling file named `diagram-dark.png` next to `diagram.png` is picked
up automatically and swapped by colour mode. To be explicit:

```md
{{</* image src="/img/pipeline.png" src-dark="/img/pipeline-dark.png" alt="Pipeline stages" caption="Stages of an audited run" */>}}
```

## Output formats

The theme reads five beyond HTML. Copy the blocks from `hugo.toml`:

| Format | Produces |
|---|---|
| `SearchIndex` | `/index.json` — pages plus every H2/H3 as its own record |
| `Print` | `print.html` per section — the whole section on one page |
| `Markdown` | `index.md` per page — powers **Copy as Markdown** |
| `LLMS` | `/llms.txt` — a link-first site map for language models |
| `RSS` | Feeds, styled by `static/feed.xsl` when opened in a browser |

## Third-party runtime assets

KaTeX 0.18.4, Mermaid 11.16.1 and asciinema-player 3.17.0 load from jsDelivr
with exact version pins. Their templates are loaded only on pages that use the
corresponding feature. Fonts and the theme icon set remain bundled with the theme.

## Versioned documentation

The selector is a list of URLs, so each version is a separate build published
under its own prefix. Nothing in the theme rewrites links between versions.

Any build whose `params.version` is not the first entry in `params.versions` shows
a banner on every docs page pointing at the newest one.

Version links keep the reader's place: the current path is appended to the target
version's prefix, so `/docs/guides/x/` on v0.3 links to `/v0.2/docs/guides/x/`. Hugo
cannot know whether the other build has that page, so the link is optimistic and the
target's own 404 catches a miss. Set `params.versionProbe = false`, or `probe = false`
on one entry, to land on the version root instead.

{{< callout type="note" >}}
Keep the newest version at the site root and archive older ones under
`/v0.2/`, `/v0.1/`. That keeps canonical URLs stable for search engines.
{{< /callout >}}
