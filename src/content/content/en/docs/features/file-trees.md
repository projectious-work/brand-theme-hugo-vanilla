+++
title = "File trees"
description = "Explain project structure with nested folders and files."
weight = 155
icon = "folder"
+++

{{< filetree >}}
  {{< folder name="content" >}}
    {{< file name="_index.md" note="landing" >}}
    {{< folder name="docs" >}}
      {{< file name="getting-started.md" >}}
      {{< file name="configuration.md" >}}
    {{< /folder >}}
  {{< /folder >}}
{{< /filetree >}}

```md
{{</* filetree */>}}
  {{</* folder name="content" */>}}
    {{</* file name="_index.md" note="landing" */>}}
    {{</* folder name="docs" */>}}
      {{</* file name="getting-started.md" */>}}
    {{</* /folder */>}}
  {{</* /folder */>}}
{{</* /filetree */>}}
```

`folder` accepts `closed="true"`. `file` accepts `note` and an optional `icon`.
