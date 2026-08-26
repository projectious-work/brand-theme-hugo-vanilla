# Tabs

> Place equivalent alternatives in a keyboard-accessible tab set.


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


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/docs/features/tabs/index.md
