+++
title = "Arborescences de fichiers"
description = "Expliquer une structure de projet avec dossiers et fichiers imbriqués."
icon = "folder"
+++

{{< filetree >}}{{< folder name="content" >}}{{< file name="_index.md" note="accueil" >}}{{< folder name="docs" >}}{{< file name="getting-started.md" >}}{{< /folder >}}{{< /folder >}}{{< /filetree >}}

```md
{{</* filetree */>}}
  {{</* folder name="content" */>}}
    {{</* file name="_index.md" note="accueil" */>}}
  {{</* /folder */>}}
{{</* /filetree */>}}
```

`folder` accepte `closed="true"`; `file` accepte `note` et `icon`.
