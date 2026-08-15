+++
title = "Getting started"
description = "Install the theme, create the required configuration and run a local documentation site."
weight = 10
icon = "book"
tags = ["setup"]
+++

This walkthrough assumes basic Hugo knowledge and produces a local site using Hugo
Modules, the recommended installation method.

## Requirements

- Hugo 0.128.0 or newer;
- Go for Hugo Module resolution;
- Node.js and npm for the Tailwind CSS build; and
- Git.

The repository itself is verified with Hugo 0.164.0. See `TESTING.md` for the
current version-matrix limitation.

## Install the theme

```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"

[build.buildStats]
  enable = true
```

Initialize the site module and fetch dependencies:

```sh
hugo mod init example.com/docs
npm install
hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@v0.3.0
```

Pin a released tag in `go.mod`; do not depend on a moving branch for production.

## Copy the feature configuration

Copy `[outputFormats]`, `[outputs]` and `[markup]` from
`src/content/hugo.toml`. They enable search, print, Markdown outputs, `llms.txt`,
syntax highlighting and math delimiters. The
[Configuration guide](configuration.md) explains each block.

## Create the first documentation section

```text
content/
├── _index.md
└── docs/
    ├── _index.md
    └── first-page.md
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

## Run locally

```sh
hugo server --disableFastRender
```

Open the URL printed by Hugo. Confirm that navigation, search and colour controls
work before adding more content.

## Next steps

1. Read [Configuration](configuration.md) and set site identity, outputs and menus.
2. Follow the [content authoring guide](guides/_index.md).
3. Review the [feature map](features/_index.md) and disable anything not required.
4. Adopt the [maintenance workflow](maintenance.md) before the first release.

{{< callout type="note" title="Building without Node" >}}
Set `params.build.tailwind = false` to serve bundled tokens and component CSS
without Tailwind utilities. This is useful for constrained consumers, but the
normal supported build installs the locked Node dependencies.
{{< /callout >}}
