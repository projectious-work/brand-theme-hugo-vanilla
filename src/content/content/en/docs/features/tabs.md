+++
title = "Tabs"
description = "Place equivalent alternatives in a keyboard-accessible tab set."
weight = 180
icon = "layout-navbar"
+++

{{< tabs items="npm, pnpm, Go" >}}
  {{< tab >}}```sh
npm install
```{{< /tab >}}
  {{< tab >}}```sh
pnpm install
```{{< /tab >}}
  {{< tab >}}```sh
go mod download
```{{< /tab >}}
{{< /tabs >}}

```md
{{</* tabs items="npm, pnpm, Go" */>}}
  {{</* tab */>}}First panel.{{</* /tab */>}}
  {{</* tab */>}}Second panel.{{</* /tab */>}}
  {{</* tab */>}}Third panel.{{</* /tab */>}}
{{</* /tabs */>}}
```

The number and order of comma-separated labels must match the `tab` children.
Arrow keys move focus between tabs.
