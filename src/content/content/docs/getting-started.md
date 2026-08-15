+++
title = "Getting started"
description = "Install the theme as a Hugo Module and build the first page."
weight = 10
icon = "book"
tags = ["setup"]
+++

## Requirements

Hugo **0.128.0** or newer (extended not required), Go for module resolution, and
Node only for the Tailwind step.

## Install

{{< tabs items="Hugo Modules, Submodule" >}}
  {{< tab >}}
```toml {filename="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/projectious-work/brand-theme-hugo-vanilla"
```
  {{< /tab >}}
  {{< tab >}}
```sh
git submodule add https://github.com/projectious-work/brand-theme-hugo-vanilla.git themes/brand-theme-hugo-vanilla
```
Then set `theme = "brand-theme-hugo-vanilla"`.
  {{< /tab >}}
{{< /tabs >}}

## Styling pipeline

The theme builds its CSS with the Tailwind v4 CLI through `css.TailwindCSS`.

{{< steps >}}
  {{< step title="Install the CLI" >}}
```sh
npm install
```
  {{< /step >}}
  {{< step title="Let Hugo report its class inventory" >}}
```toml {filename="hugo.toml"}
[build]
  [build.buildStats]
    enable = true
```
  {{< /step >}}
  {{< step title="Serve" >}}
```sh
hugo server
```
  {{< /step >}}
{{< /steps >}}

{{< callout type="warning" title="No Node available?" >}}
Set `params.build.tailwind = false`. Hugo then ships the brand tokens and the
theme's component CSS without the Tailwind step — utility classes stop resolving,
but every page in this theme still renders.
{{< /callout >}}

## Content layout

{{< filetree >}}
  {{< folder name="content" >}}
    {{< file name="_index.md" note="landing" >}}
    {{< folder name="docs" >}}
      {{< file name="_index.md" >}}
      {{< file name="getting-started.md" >}}
    {{< /folder >}}
    {{< folder name="blog" closed="true" >}}
      {{< file name="why-agent-first.md" >}}
    {{< /folder >}}
  {{< /folder >}}
{{< /filetree >}}
