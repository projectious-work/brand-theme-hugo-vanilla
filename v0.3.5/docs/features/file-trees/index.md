# File trees

> Explain project structure with nested folders and files.


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


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/features/file-trees/index.md
