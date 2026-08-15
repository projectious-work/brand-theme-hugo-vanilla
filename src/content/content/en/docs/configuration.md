+++
title = "Configuration"
description = "Understand the configuration files, copy the required Hugo settings and enable optional capabilities."
weight = 20
icon = "versions"
tags = ["reference"]
+++

Configure the theme in layers. Start with Hugo's site configuration, add theme
parameters for presentation and integrations, then use front matter for page-level
choices. Do not edit theme templates for settings that already have a parameter.

## Which configuration files exist?

| File | Purpose | Maintained by |
|---|---|---|
| `hugo.toml` | Site URL, module, languages, menus, outputs, Markdown and theme parameters | Site owner |
| `go.mod` | Hugo Module dependency and selected theme version | Site owner |
| `package.json` / lockfile | Tailwind CLI and browser-test tools | Site owner |
| `data/cdn.yaml` | Exact KaTeX, Mermaid and asciinema runtime versions | Theme maintainer |
| `i18n/*.toml` | Translated interface labels | Theme maintainer or translator |
| Page front matter | Title, order, description and per-page capabilities | Content author |

The example at `src/content/hugo.toml` is a complete working reference. Copy the
relevant tables into your site's configuration; do not point Hugo at the example
site itself.

## Minimum site configuration

```toml {filename="hugo.toml"}
baseURL = "https://docs.example.com/"
title = "Example documentation"
defaultContentLanguage = "en"
enableRobotsTXT = true

[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build.buildStats]
  enable = true
```

`baseURL` must include any deployment prefix. The theme resolves internal links
through Hugo so `/project-name/` deployments work correctly.

## Required output formats

HTML works without custom outputs. The integrated search, printing, Markdown copy
and `llms.txt` features require the `[outputFormats]` and `[outputs]` blocks from
the example configuration.

| Format | What the theme produces | Why enable it |
|---|---|---|
| `SearchIndex` | `/index.json` with pages and H2/H3 headings | Header search and command palette |
| `Print` | `print.html` for an entire section | Printable handbook/PDF workflow |
| `Markdown` | `index.md` beside each page | Copy/View Markdown actions and agent consumption |
| `LLMS` | `/llms.txt` with language-aware page links | A compact discovery file for LLM tools |
| `RSS` | XML feeds styled by `feed.xsl` | Release-note subscriptions |

Add `SearchIndex` and `LLMS` to `outputs.home`; add `Print` and `Markdown` to
sections; add `Markdown` to pages. The example configuration shows the exact media
types and filenames.

## Markdown configuration

Copy the example `[markup]` block to enable:

- Goldmark passthrough delimiters for KaTeX;
- class-based Chroma syntax highlighting;
- H2/H3 tables of contents; and
- safe Markdown rendering with raw HTML disabled.

Turn `markup.goldmark.renderer.unsafe` on only when your own trusted content needs
raw HTML. The theme itself does not require it.

## Theme parameters

Place these below `[params]` in `hugo.toml`:

| Parameter | When to configure it |
|---|---|
| `version` / `versions` | When publishing versioned documentation |
| `github` | To show a repository icon in the header |
| `editURL` | To show language-aware Edit-this-page links |
| `sidebarSections` | When documentation lives outside `/docs/` |
| `sidebarOpenDepth` | To change initial nesting expansion |
| `codeTheme = "adaptive"` | To use light code panels in light mode |
| `darkSurface = "navy"` | To choose the server-rendered dark surface |
| `announcement` | For a dismissible release or service notice |
| `feedbackEndpoint` | When a server implements `CONTRACT-feedback.md` |
| `selfHostAssets` | When public CDNs are prohibited |
| `math = true` | When nearly every page contains mathematics |

Boolean switches `search`, `feedback`, `accessibilityMenu`, `sidebarFilter` and
`commandPalette` default to enabled; set one to `false` to remove it.

## Menus and languages

Define primary links under `menus.main`; use `pageRef` for local pages. Define each
language under `[languages.<code>]` with `label` and `weight`. See
[Header and navigation](features/header-navigation.md) and
[Internationalization](features/internationalization.md) for complete examples.

## Page front matter

| Key | Effect |
|---|---|
| `title` | Page title and navigation label |
| `linkTitle` | Optional shorter navigation label |
| `description` | Lede, SEO description and search excerpt |
| `weight` | Sidebar, card and previous/next order |
| `icon` | Generated overview-card icon |
| `toc = false` | Hide the table of contents |
| `cards = false` | Hide generated child-page cards on a section |
| `hidden = true` | Exclude a child from its generated card grid |
| `math = true` | Load KaTeX on this page |
| `private = true` | Exclude from search and sitemap |
| `cover` / `coverAlt` | Blog cover image and alternative text |

## Edit and feedback integrations

`params.editURL` may be one prefix or a language map. The page's content-relative
path is appended automatically:

```toml
[params.editURL]
  default = "https://github.com/org/repo/edit/main/content/"
  de = "https://github.com/org/repo/edit/main/content/de/"
  fr = "https://github.com/org/repo/edit/main/content/fr/"
```

`params.feedbackEndpoint` receives `{path, value, title, lang}`. Client throttling
is only a usability feature; the endpoint must enforce origin, path and rate limits.

## Notebook conversion

Notebook conversion is an optional pre-build operation:

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

It writes shared Markdown below `content/_notebooks/` and images below
`static/notebooks/`. The shortcode checks a page resource first, then the shared
path. Notebook basenames must be unique.

## Search engines and llms.txt

With `enableRobotsTXT = true`, `robots.txt` excludes duplicate search and print
views. The sitemap excludes private pages and emits translated alternates.

`llms.txt` is separate: the `LLMS` home output writes a compact, language-aware
list of canonical page titles, descriptions and Markdown links. It helps tools
discover documentation without scraping navigation chrome. It is not an access
control, model-training directive or replacement for `robots.txt`.

## Validate configuration changes

Run `./scripts/verify.sh`. It builds twice, compares artifacts, rejects project-base
URL escapes and runs desktop/mobile browser tests. A configuration change is not
complete until that command passes without warnings.
