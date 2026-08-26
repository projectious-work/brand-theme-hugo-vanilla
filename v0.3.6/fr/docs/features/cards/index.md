# Cartes

> Présenter des pages, ressources ou choix associés.


{{< cards cols="2" >}}
  {{< card title="Guide de rédaction" subtitle="Écrire en Markdown." link="/fr/docs/guides/" icon="file-code" >}}
  {{< card title="Configuration" subtitle="Configurer le site et les pages." link="/fr/docs/configuration/" icon="list" >}}
{{< /cards >}}

```md
{{</* cards cols="2" */>}}
  {{</* card title="Guide" subtitle="Écrire en Markdown."
      link="/fr/docs/guides/" icon="file-code" */>}}
{{</* /cards */>}}
```

`cols` vaut `2`, `3` ou `4`; `card` accepte aussi `image` et `alt`.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/fr/docs/features/cards/index.md
