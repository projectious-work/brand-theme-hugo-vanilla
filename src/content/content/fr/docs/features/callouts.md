+++
title = "Encadrés"
description = "Mettre en évidence une information complémentaire ou critique."
icon = "info-circle"
+++

{{< callout type="info" >}}Information complémentaire pour le lecteur.{{< /callout >}}
{{< callout type="warning" title="Attention" >}}Vérifiez les changements avant publication.{{< /callout >}}

```md
{{</* callout type="warning" title="Attention" */>}}
Vérifiez les changements avant publication.
{{</* /callout */>}}
```

`type` accepte `info`, `note`, `success`, `warning`, `error` et `important`.
