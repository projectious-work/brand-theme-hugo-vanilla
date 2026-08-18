# Getting started

> Create a Hugo site from scratch, install the theme from a release or local checkout, configure its outputs and run it.


This is a from-scratch walkthrough for a new site. Existing Hugo sites can begin
at [Choose how to install the theme](#choose-how-to-install-the-theme).

## 1. Install the tools

Install Hugo 0.128.0 or newer, Go, Node.js/npm and Git. Confirm them before
creating files:

```sh
hugo version
go version
node --version
npm --version
git --version
```

The example is verified with Hugo 0.164.0. Use Hugo Extended because the CSS
pipeline invokes Tailwind through Hugo Pipes.

## 2. Create an empty site

```sh
hugo new site example-docs
cd example-docs
git init
hugo mod init example.com/example-docs
npm init -y
npm install --save-dev @tailwindcss/cli@^4.1.0
```

Allow Hugo to invoke Tailwind while retaining its standard executable policy:

```toml {filename="hugo.toml"}
[security.exec]
  allow = ["^(dart-)?sass$", "^go$", "^git$", "^node$", "^postcss$", "^tailwindcss$"]
```

Hugo 0.165 and later reject `css.TailwindCSS` when `tailwindcss` is absent
from this allowlist.

`hugo new site` creates `hugo.toml`, `content/`, `layouts/`, `static/` and other
standard Hugo directories. `hugo mod init` creates `go.mod`, which records the
theme dependency.

## 3. Choose how to install the theme

### Released Hugo Module — recommended

Add the module import to the new site's `hugo.toml`:

```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"
```

Fetch and pin a released version:

```sh
hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@v0.3.3
hugo mod tidy
```

Commit `go.mod` and `go.sum`. Production sites should use a release tag, not a
moving branch.

### Local checkout — offline development or theme changes

Clone or unpack the theme beside the site:

```text
workspace/
├── brand-theme-hugo-vanilla/
└── example-docs/
```

Keep the same module import, then add a local replacement to the site's `go.mod`:

```go {filename="go.mod"}
replace github.com/projectious-work/brand-theme-hugo-vanilla => ../brand-theme-hugo-vanilla
```

Hugo now reads the local checkout without downloading the module. Do not commit a
machine-specific `replace` line in a production site; remove it and run
`hugo mod tidy` before releasing.

## 4. Configure the feature outputs

Copy the complete commented configuration from
[Configuration](configuration/site-wide.md#complete-copyable-configuration) into the
site's root `hugo.toml`—the file created by `hugo new site`. The output-format
blocks enable search, print views, page Markdown and `llms.txt`; the markup block
enables class-based syntax highlighting, heading tables of contents and math.

## 5. Create the first pages

```text
content/
├── _index.md
└── docs/
    ├── _index.md
    └── first-page.md
```

```toml {filename="content/_index.md"}
+++
title = "Example documentation"
tagline = "Documentation for the example product."
+++
```

```toml {filename="content/docs/_index.md"}
+++
title = "Documentation"
description = "Product and operations documentation."
weight = 10
+++
```

```toml {filename="content/docs/first-page.md"}
+++
title = "First page"
description = "The first page in the documentation set."
weight = 10
icon = "book"
+++

Write the page in ordinary Markdown.
```

## 6. Run and verify locally

```sh
hugo server --disableFastRender
```

Open the URL printed by Hugo. Check the sidebar, search, language and appearance
menus, code colours and keyboard focus. A production build is `hugo --minify`.

## Next steps

1. Read [Configuration](configuration/_index.md) and set site identity and integrations.
2. Follow the [Content authoring guide](guides/_index.md).
3. Review the [feature map](features/_index.md).
4. Adopt the [maintenance workflow](maintenance.md) before the first release.

{{< callout type="note" title="Building without Node" >}}
Set `params.build.tailwind = false` to serve the theme's tokens and component CSS
without Tailwind utilities. Site-authored Tailwind utility classes will then not be
generated.
{{< /callout >}}


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/getting-started/index.md
