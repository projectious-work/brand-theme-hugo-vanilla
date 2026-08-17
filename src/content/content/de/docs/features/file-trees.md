+++
title = "Dateibäume"
description = "Projektstrukturen mit verschachtelten Ordnern und Dateien erklären."
icon = "folder"
+++

{{< filetree >}}{{< folder name="content" >}}{{< file name="_index.md" note="Startseite" >}}{{< folder name="docs" >}}{{< file name="erste-schritte.md" >}}{{< /folder >}}{{< /folder >}}{{< /filetree >}}

```md
{{</* filetree */>}}
  {{</* folder name="content" */>}}
    {{</* file name="_index.md" note="Startseite" */>}}
  {{</* /folder */>}}
{{</* /filetree */>}}
```

`folder` unterstützt `closed="true"`; `file` unterstützt `note` und `icon`.
