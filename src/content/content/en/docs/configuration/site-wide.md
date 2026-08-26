+++
title = "Site-wide configuration"
description = "Configure Hugo, outputs, Markdown, menus, languages and theme parameters."
weight = 10
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
baseURL = "https://docs.example.com/" # Canonical URL, including any path prefix.
title = "Example documentation"       # Site name used in metadata and the header.
defaultContentLanguage = "en"         # English is served when no language is specified.
defaultContentLanguageInSubdir = false # Keep the default language at the site root.
enableRobotsTXT = true                 # Ask Hugo to generate the theme's robots.txt.

[module] # Install the theme as a versioned Hugo Module.
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla" # Theme module.

[build.buildStats] # Let Tailwind discover classes emitted by Hugo templates.
  enable = true

[security.exec] # Permit only the build tools the site intentionally invokes.
  allow = ["^(dart-)?sass$", "^go$", "^git$", "^node$", "^postcss$", "^tailwindcss$"]

[outputFormats.SearchIndex] # Local full-text search data at /index.json.
  mediaType = "application/json" # JSON response type.
  baseName = "index"              # Output filename without extension.
  isPlainText = true              # Do not wrap the generated JSON in HTML.
  notAlternative = true           # Keep this out of alternate-format metadata.

[outputFormats.Print] # Printable aggregate for each section.
  mediaType = "text/html" # Browser-renderable output.
  baseName = "print"      # Produces print.html.
  isHTML = true            # Enable Hugo's HTML processing.
  notAlternative = true    # Do not advertise it as an alternate page.
  permalinkable = true     # Give the output a stable URL.

[outputFormats.LLMS] # Machine-readable discovery document at /llms.txt.
  mediaType = "text/plain" # Plain UTF-8 text.
  baseName = "llms"        # Output filename without extension.
  isPlainText = true        # Do not apply an HTML wrapper.
  notAlternative = true    # Keep it out of alternate-format metadata.

[outputFormats.Markdown] # Clean Markdown representation of pages and sections.
  mediaType = "text/markdown" # Standard Markdown response type.
  isPlainText = true           # Do not apply an HTML wrapper.
  permalinkable = true         # Give every representation a stable URL.

[outputs] # Select the formats generated for each Hugo page kind.
  home = ["HTML", "RSS", "SearchIndex", "LLMS"] # Site-level discovery outputs.
  section = ["HTML", "RSS", "Print", "Markdown"] # Section aggregates and copies.
  page = ["HTML", "Markdown"] # Reader page plus clean Markdown.

[markup.goldmark.renderer] # Markdown-to-HTML safety policy.
  unsafe = false # Reject raw HTML from content files.
[markup.goldmark.extensions.passthrough] # Preserve formulas for KaTeX.
  enable = true
[markup.goldmark.extensions.passthrough.delimiters] # Accepted LaTeX delimiters.
  block = [["\\[", "\\]"], ["$$", "$$"]] # Display formulas.
  inline = [["\\(", "\\)"]]              # Formulas inside prose.
[markup.highlight] # Hugo Chroma syntax highlighting.
  noClasses = false # Emit semantic classes so the theme controls colours.
  guessSyntax = true # Highlight an unlabelled fence when detection succeeds.
[markup.tableOfContents] # Headings used by the right-hand navigation.
  startLevel = 2 # Begin with H2.
  endLevel = 3   # Include H3, but not deeper headings.

[[menus.main]] # Add a link to the primary header navigation.
  name = "Documentation" # Reader-facing label.
  pageRef = "/docs"       # Hugo page reference; checked during the build.
  weight = 10              # Lower weights appear first.

[params] # Public theme settings; defaults are documented below.
  description = "Documentation for the example product." # Site metadata summary.
  github = "https://github.com/example/example-docs" # Repository header link.
  editURL = "https://github.com/example/example-docs/edit/main/content/" # Edit base URL.
  version = "v1.0"             # Current label in the version menu.
  codeTheme = "adaptive"       # Adapt code panels to light and dark modes.
  sidebarSections = ["docs"]   # Top-level sections that receive the docs rail.
  sidebarOpenDepth = 0          # Initially expanded sidebar levels.

  [params.brand] # Optional product identity; every key has this default.
    home = "/"
    wordmark = "projectious.work"
    markLight = "logo/icon-light.svg"
    markDark = "logo/icon-dark.svg"
    favicon32 = "logo/icon-dark.svg" # light mark for browser-tab contrast
    appleTouchIcon = "logo/apple-touch-icon-180.png"

  [[params.versions]] # One published documentation version.
    label = "v1.0"   # Menu label.
    url = "/"        # Deployment-relative root for this version.
    note = "latest"  # Optional status annotation.
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
| `description` | string, empty | Setting site metadata | [Header and navigation](../features/header-navigation.md) |
| `github` | URL, unset | Showing a repository header action | [Header and navigation](../features/header-navigation.md) |
| `brand` | table, projectious.work defaults | Replacing wordmark, marks and favicons without template overrides | [Header and navigation](../features/header-navigation.md) |
| `editURL` | URL or language map, unset | Showing Edit-this-page links | [Editing and feedback](../features/editing-feedback.md) |
| `version` | string, unset | Labelling the current documentation | [Versioning](../features/versioning.md) |
| `versionMenuLabel` | string, current version | Giving the version menu an independent label | [Versioning](../features/versioning.md) |
| `versions` | array, empty | Linking published documentation trees | [Versioning](../features/versioning.md) |
| `versionProbe` | boolean, `true` | Disabling same-page version probing globally | [Versioning](../features/versioning.md) |
| `sidebarSections` | string array, `["docs"]` | Putting the sidebar on other sections | [Header and navigation](../features/header-navigation.md) |
| `sidebarOpenDepth` | integer, `0` | Changing initially expanded levels | [Header and navigation](../features/header-navigation.md) |
| `codeTheme` | `adaptive` or `dark`, `adaptive` | Forcing code and terminal panels dark | [Tailwind and design tokens](../features/tailwind.md) |
| `darkSurface` | `navy`, unset | Making navy the initial dark surface | [Accessibility](../features/accessibility.md) |
| `announcement` | table, unset | Showing a dismissible notice | [Header and navigation](../features/header-navigation.md) |
| `feedbackEndpoint` | URL, unset | Sending page votes to a service | [Editing and feedback](../features/editing-feedback.md) |
| `selfHostAssets` | boolean, `false` | Replacing public CDN URLs | [Dependencies](../dependencies.md) |
| `math` | boolean, `false` | Loading KaTeX on every page | [Mathematics](../features/mathematics.md) |
| `search` | boolean, `true` | Disabling search and its index | [Search](../features/search.md) |
| `feedback` | boolean, `true` | Hiding the page-vote control | [Editing and feedback](../features/editing-feedback.md) |
| `accessibilityMenu` | boolean, `true` | Hiding reader preference controls | [Accessibility](../features/accessibility.md) |
| `sidebarFilter` | boolean, `true` | Hiding the sidebar filter | [Search](../features/search.md) |
| `commandPalette` | boolean, `true` | Disabling the keyboard palette | [Header and navigation](../features/header-navigation.md) |
| `build.tailwind` | boolean, `true` | Building without Node/Tailwind | [Tailwind and design tokens](../features/tailwind.md) |

## Menus and languages

Define primary links under `menus.main`; use `pageRef` for local pages. Define each
language under `[languages.<code>]` with `label` and `weight`. See
[Header and navigation](../features/header-navigation.md) and
[Internationalization](../features/internationalization.md) for complete examples.

## Edit and feedback integrations

See [Editing and feedback](../features/editing-feedback.md) for repository URL
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
