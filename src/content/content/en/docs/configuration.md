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

The example at `src/content/hugo.toml` is executable test material. The copyable
equivalent is included below so a site creator does not need to browse the theme
repository.

## Minimum site configuration

```toml {filename="hugo.toml"}
baseURL = "https://docs.example.com/"
title = "Example documentation"
defaultContentLanguage = "en"
defaultContentLanguageInSubdir = false
enableRobotsTXT = true

[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build.buildStats]
  enable = true
```

`baseURL` must include any deployment prefix. The theme resolves internal links
through Hugo so `/project-name/` deployments work correctly.

## Complete copyable configuration

Paste this into the site-root `hugo.toml` created by `hugo new site`, then replace
the example identity and repository values. Comments mark optional settings.

```toml {filename="hugo.toml"}
baseURL = "https://docs.example.com/"
title = "Example documentation"
defaultContentLanguage = "en"
defaultContentLanguageInSubdir = false
enableRobotsTXT = true

[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build.buildStats]
  enable = true # lets Tailwind discover classes emitted by Hugo

[outputFormats.SearchIndex]
  mediaType = "application/json"
  baseName = "index"
  isPlainText = true
  notAlternative = true

[outputFormats.Print]
  mediaType = "text/html"
  baseName = "print"
  isHTML = true
  notAlternative = true
  permalinkable = true

[outputFormats.LLMS]
  mediaType = "text/plain"
  baseName = "llms"
  isPlainText = true
  notAlternative = true

[outputFormats.Markdown]
  mediaType = "text/markdown"
  isPlainText = true
  permalinkable = true

[outputs]
  home = ["HTML", "RSS", "SearchIndex", "LLMS"]
  section = ["HTML", "RSS", "Print", "Markdown"]
  page = ["HTML", "Markdown"]

[markup.goldmark.renderer]
  unsafe = false
[markup.goldmark.extensions.passthrough]
  enable = true
[markup.goldmark.extensions.passthrough.delimiters]
  block = [["\\[", "\\]"], ["$$", "$$"]]
  inline = [["\\(", "\\)"]]
[markup.highlight]
  noClasses = false
  guessSyntax = true
[markup.tableOfContents]
  startLevel = 2
  endLevel = 3

[[menus.main]]
  name = "Documentation"
  pageRef = "/docs"
  weight = 10

[params]
  description = "Documentation for the example product."
  github = "https://github.com/example/example-docs"
  editURL = "https://github.com/example/example-docs/edit/main/content/"
  version = "v1.0"
  codeTheme = "adaptive"
  sidebarSections = ["docs"]
  sidebarOpenDepth = 1

  [[params.versions]]
    label = "v1.0"
    url = "/"
    note = "latest"
```

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

The table is the complete public parameter set. Scalar parameters are assigned
below `[params]`; tables and arrays use the TOML shapes shown in their detailed
pages.

| Parameter | Type and default | Configure when | Details |
|---|---|---|---|
| `description` | string, empty | Setting site metadata | [Header and navigation](features/header-navigation.md) |
| `github` | URL, unset | Showing a repository header action | [Header and navigation](features/header-navigation.md) |
| `editURL` | URL or language map, unset | Showing Edit-this-page links | [Editing and feedback](features/editing-feedback.md) |
| `version` | string, unset | Labelling the current documentation | [Versioning](features/versioning.md) |
| `versions` | array, empty | Linking published documentation trees | [Versioning](features/versioning.md) |
| `versionProbe` | boolean, `true` | Disabling same-page version probing globally | [Versioning](features/versioning.md) |
| `sidebarSections` | string array, `["docs"]` | Putting the sidebar on other sections | [Header and navigation](features/header-navigation.md) |
| `sidebarOpenDepth` | integer, `1` | Changing initially expanded levels | [Header and navigation](features/header-navigation.md) |
| `codeTheme` | `adaptive` or `dark`, `adaptive` | Forcing code and terminal panels dark | [Tailwind and design tokens](features/tailwind.md) |
| `darkSurface` | `navy`, unset | Making navy the initial dark surface | [Accessibility](features/accessibility.md) |
| `announcement` | table, unset | Showing a dismissible notice | [Header and navigation](features/header-navigation.md) |
| `feedbackEndpoint` | URL, unset | Sending page votes to a service | [Editing and feedback](features/editing-feedback.md) |
| `selfHostAssets` | boolean, `false` | Replacing public CDN URLs | [Dependencies](dependencies.md) |
| `math` | boolean, `false` | Loading KaTeX on every page | [Content authoring](guides/_index.md#diagrams-and-mathematics) |
| `search` | boolean, `true` | Disabling search and its index | [Search](features/search.md) |
| `feedback` | boolean, `true` | Hiding the page-vote control | [Editing and feedback](features/editing-feedback.md) |
| `accessibilityMenu` | boolean, `true` | Hiding reader preference controls | [Accessibility](features/accessibility.md) |
| `sidebarFilter` | boolean, `true` | Hiding the sidebar filter | [Search](features/search.md) |
| `commandPalette` | boolean, `true` | Disabling the keyboard palette | [Header and navigation](features/header-navigation.md) |
| `build.tailwind` | boolean, `true` | Building without Node/Tailwind | [Tailwind and design tokens](features/tailwind.md) |

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
| `description` | Introductory summary below the title, SEO description and search excerpt |
| `weight` | Sidebar, card and previous/next order |
| `icon` | Generated overview-card icon |
| `toc` | Show the table of contents; default `true`, set `false` to hide |
| `cards` | Generate child-page cards; default `true`, set `false` to hide |
| `hidden` | Exclude a child from generated cards; default `false` |
| `math` | Load KaTeX on this page; default `false` |
| `private` | Exclude from search and sitemap; default `false` |
| `cover` / `coverAlt` | Blog cover image and alternative text |

## Edit and feedback integrations

See [Editing and feedback](features/editing-feedback.md) for repository URL
mapping, the request payload, the browser's one-vote-per-page behavior and the
security requirements for an optional receiving service.

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

`robots.txt` gives compliant web crawlers crawl instructions. Set
`enableRobotsTXT = true`; Hugo then asks the theme to publish `/robots.txt`. The
theme allows canonical content while excluding generated search indexes and print
variants that duplicate it. For example:

```text
User-agent: *
Disallow: /search/
Disallow: /*/print.html
Sitemap: https://docs.example.com/sitemap.xml
```

`llms.txt` is a discovery document, not a crawler rule. Enable it by defining the
`LLMS` output format and adding `"LLMS"` to `outputs.home`, as in the copyable
configuration. It contains page titles, descriptions and links to clean Markdown
representations, without repeated header, sidebar and footer controls:

```text
# Example documentation
## Documentation
- [Getting started](https://docs.example.com/docs/getting-started/index.md): Create a site.
```

Neither file is access control. Private information must not be published; use
authentication at the hosting layer when content requires access restrictions.

## Validate configuration changes

Run `./scripts/verify.sh`. It builds twice, compares artifacts, rejects project-base
URL escapes and runs desktop/mobile browser tests. A configuration change is not
complete until that command passes without warnings.
