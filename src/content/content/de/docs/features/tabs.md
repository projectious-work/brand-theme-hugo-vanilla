+++
title = "Tabs"
description = "Gleichwertige Alternativen tastaturzugänglich gruppieren."
icon = "layout-navbar"
+++

{{< tabs items="npm, pnpm" >}}
  {{< tab >}}`npm install`{{< /tab >}}
  {{< tab >}}`pnpm install`{{< /tab >}}
{{< /tabs >}}

```md
{{</* tabs items="npm, pnpm" */>}}
  {{</* tab */>}}`npm install`{{</* /tab */>}}
  {{</* tab */>}}`pnpm install`{{</* /tab */>}}
{{</* /tabs */>}}
```

Anzahl und Reihenfolge der Beschriftungen müssen zu den `tab`-Kindern passen.
