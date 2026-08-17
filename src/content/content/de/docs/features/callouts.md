+++
title = "Hinweisboxen"
description = "Ergänzende, warnende oder kritische Hinweise hervorheben."
icon = "info-circle"
+++

{{< callout type="info" >}}Ergänzende Information für Leser.{{< /callout >}}
{{< callout type="warning" title="Achtung" >}}Prüfen Sie Änderungen vor der Veröffentlichung.{{< /callout >}}

```md
{{</* callout type="warning" title="Achtung" */>}}
Prüfen Sie Änderungen vor der Veröffentlichung.
{{</* /callout */>}}
```

`type` akzeptiert `info`, `note`, `success`, `warning`, `error` und `important`.
