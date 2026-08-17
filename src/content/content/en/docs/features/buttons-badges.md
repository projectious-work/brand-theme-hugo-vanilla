+++
title = "Buttons and badges"
description = "Add linked actions and compact status labels."
weight = 135
icon = "badge"
+++

## Buttons

{{< button label="Read the documentation" href="/docs/" >}}
{{< button label="Search" href="/search/" variant="secondary" icon="search" >}}

```md
{{</* button label="Read the documentation" href="/docs/" */>}}
{{</* button label="Search" href="/search/" variant="secondary"
     icon="search" */>}}
```

`variant` is `primary` by default or `secondary`. `icon` accepts any available
Tabler icon name.

## Badges

{{< badge "v0.3" >}} {{< badge label="latest" variant="accent" >}}

```md
{{</* badge "v0.3" */>}}
{{</* badge label="latest" variant="accent" */>}}
```

Badges label compact metadata; use a button or ordinary link for an action.
