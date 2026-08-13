---
title: "Getting started"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/getting-started/"
description: "Install the theme as a Hugo Module or submodule and run the example locally."
---


## Requirements

- Hugo Extended, recent enough to support CSS processing and render hooks.
- Git when installing as a module or submodule.
- Go only when using Hugo Modules.

## Install as a Hugo Module

{{< terminal >}}
$ hugo mod init example.com/my-site
$ hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla
$ hugo server
✓ Web server available at http://localhost:1313/
{{< /terminal >}}

Add the import to `hugo.toml`:

```toml {filename="hugo.toml"}
[[module.imports]]
path = "github.com/projectious-work/brand-theme-hugo-vanilla"
```

## Install as a submodule

{{< terminal >}}
$ git submodule add https://github.com/projectious-work/brand-theme-hugo-vanilla.git themes/brand-theme-hugo-vanilla
$ hugo server
{{< /terminal >}}

```toml {filename="hugo.toml"}
theme = "brand-theme-hugo-vanilla"
```

{{< callout type="info" >}}
Copy the search output and markup configuration from the bundled
`src/content/hugo.toml`; those settings enable the search index, heading
anchors, code labels, and syntax highlighting.
{{< /callout >}}

## Create content

```text
content/
├── _index.md
├── docs/
├── blog/
└── changelog/
```

Use `hugo new docs/first-guide.md`, add `title`, `description`, and `weight`,
then write normal Markdown. Section names select their specialized layouts.

