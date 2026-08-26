# Installation

> Install the theme, its required toolchain and the optional renderers used by your content.


Install the theme as a pinned Hugo Module. The core site needs Hugo Extended,
Go, Git and—when Tailwind utilities are enabled—Node.js. Graphics renderers are
capability-based: install only the command-line tools used by your content.

## Requirements

| Tool | Requirement | Why it is needed |
|---|---:|---|
| Hugo Extended | 0.128.0 or newer | Site generation, modules and CSS pipeline |
| Go | 1.22 or newer | Resolve and pin the Hugo Module |
| Git | Current supported release | Module and theme updates |
| Node.js and npm | Current LTS or newer | Tailwind CSS and the integrated graphics pre-build |

Check the toolchain before installing:

```sh
hugo version
go version
git --version
node --version
npm --version
```

## Install the theme

Create a site and initialize its module if necessary:

```sh
hugo new site example-docs
cd example-docs
hugo mod init example.com/example-docs
npm init -y
npm install --save-dev @tailwindcss/cli@^4.1.0
```

Add the theme to `hugo.toml`:

```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build]
  [build.buildStats]
    enable = true
```

Pin a release and commit both module files:

```sh
hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@v0.3.6
hugo mod tidy
```

Production sites should use a release tag rather than a moving branch.

## Optional graphics tools

Browser renderers require no global executable. Mermaid, D3, Observable Plot,
JSXGraph, WaveDrom, SMILES Drawer and pseudocode.js are loaded only on pages
that use them, from the exact versions in `data/cdn.yaml` or a self-hosted
mirror.

Generated SVG fences need the corresponding executable when their cached output
does not exist:

| Content | Executable | Upstream installation |
|---|---|---|
| D2 architecture and infrastructure | `d2` | [D2 installation](https://d2lang.com/tour/install/) |
| Graphviz/DOT graphs | `dot` | [Graphviz downloads](https://graphviz.org/download/) |
| Typst and CeTZ graphics | `typst` | [Typst installation](https://github.com/typst/typst#installation) |

Confirm only the tools selected by your content:

```sh
d2 --version
dot -V
typst --version
```

The integrated build discovers source fences and assets, invokes only missing
renderers, and caches their SVG. CI should install and pin every renderer used
by the site so a clean checkout can reproduce the documentation.

## Local theme development

Clone the theme beside the consuming site and retain the normal module import.
Add a temporary replacement to the site's `go.mod`:

```go {filename="go.mod"}
replace github.com/projectious-work/brand-theme-hugo-vanilla => ../brand-theme-hugo-vanilla
```

Remove machine-specific replacements and run `hugo mod tidy` before releasing.

## Offline and restricted-network builds

Set `params.selfHostAssets = true` and mirror the pinned files listed in
`data/cdn.yaml` under `static/vendor/<package>/`. Vendor remote D2 icons and any
URL-loaded diagram source as local project files. Tectonic-style package
downloads are not part of this theme's Typst pipeline; Typst Universe packages
must already be cached or vendored for a completely offline clean build.

## Verify the installation

```sh
hugo mod graph
hugo server --disableFastRender
```

Open the address printed by Hugo, then verify navigation, search, light/dark
mode and any renderer used by the site. Continue with
[Getting started](getting-started.md) to create the initial content and copy the
complete output configuration.

## Update or remove

Review release notes before updating:

```sh
hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@v0.3.6
hugo mod tidy
```

To remove the theme, delete its module import and run `hugo mod tidy`. Remove
the Tailwind dependency only when no other part of the site uses it.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/installation/index.md
