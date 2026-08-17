+++
title = "Cards"
description = "Present related choices, pages or resources as responsive cards."
weight = 145
icon = "cards"
+++

Section overview cards are generated from child-page front matter. Write cards
manually only for a collection that is not a page list:

{{< cards cols="2" >}}
  {{< card title="Authoring" subtitle="Write pages with Markdown and focused shortcodes." link="/docs/guides/" icon="file-code" >}}
  {{< card title="Configuration" subtitle="Choose navigation, outputs and optional features." link="/docs/configuration/" icon="list" >}}
{{< /cards >}}

```md
{{</* cards cols="2" */>}}
  {{</* card title="Authoring" subtitle="Write pages with Markdown."
      link="/docs/guides/" icon="file-code" */>}}
  {{</* card title="Configuration" subtitle="Choose site options."
      link="/docs/configuration/" icon="list" */>}}
{{</* /cards */>}}
```

`cols` is `2`, `3` (default) or `4`. `card` also accepts `image` and `alt`.
The `subtitle` value supports Markdown.
