# Arborescences de fichiers

> Expliquer une structure de projet avec dossiers et fichiers imbriqués.


{{< filetree >}}{{< folder name="content" >}}{{< file name="_index.md" note="accueil" >}}{{< folder name="docs" >}}{{< file name="getting-started.md" >}}{{< /folder >}}{{< /folder >}}{{< /filetree >}}

```md
{{</* filetree */>}}
  {{</* folder name="content" */>}}
    {{</* file name="_index.md" note="accueil" */>}}
  {{</* /folder */>}}
{{</* /filetree */>}}
```

`folder` accepte `closed="true"`; `file` accepte `note` et `icon`.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/fr/docs/features/file-trees/index.md
