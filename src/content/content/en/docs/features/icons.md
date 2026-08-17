+++
title = "Icons"
description = "Use bundled fallback icons and the mounted Tabler icon library."
weight = 160
icon = "icons"
+++

{{< icon "brand-github" >}} {{< icon "printer" >}}
{{< icon "accessible" >}} {{< icon "versions" >}} {{< icon "book" >}}

```md
{{</* icon "brand-github" */>}}
{{</* icon name="printer" class="ico--lg" label="Print" */>}}
```

Use the filename without `.svg`. `label` gives a meaningful icon a text
alternative; decorative icons omit it and become `aria-hidden`. Browse all names
in the [Tabler icon library](https://tabler.io/icons). Theme-owned icons in
`assets/icons/` take precedence and provide the small fallback set.
