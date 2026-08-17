+++
title = "Karten"
description = "Verwandte Seiten, Ressourcen oder Auswahlmöglichkeiten darstellen."
icon = "cards"
+++

{{< cards cols="2" >}}
  {{< card title="Autorenleitfaden" subtitle="Inhalte mit Markdown schreiben." link="/de/docs/guides/" icon="file-code" >}}
  {{< card title="Konfiguration" subtitle="Website und Seiten konfigurieren." link="/de/docs/configuration/" icon="list" >}}
{{< /cards >}}

```md
{{</* cards cols="2" */>}}
  {{</* card title="Autorenleitfaden" subtitle="Markdown schreiben."
      link="/de/docs/guides/" icon="file-code" */>}}
{{</* /cards */>}}
```

`cols` ist `2`, `3` oder `4`; `card` unterstützt außerdem `image` und `alt`.
