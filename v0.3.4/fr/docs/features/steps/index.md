# Étapes

> Présenter des procédures avec du Markdown ou des composants.


{{< steps >}}
  {{% step title="Installer Hugo" %}}Utilisez la version prise en charge.{{% /step %}}
  {{% step title="Configurer" %}}Ajoutez l'import et les formats de sortie.{{% /step %}}
  {{% step title="Vérifier" %}}Exécutez le build local.{{% /step %}}
{{< /steps >}}

```md
{{</* steps */>}}
  {{%/* step title="Installer" */%}}Installez Hugo.{{%/* /step */%}}
  {{%/* step title="Vérifier" */%}}Exécutez le build.{{%/* /step */%}}
{{</* /steps */>}}
```

Utilisez `%` pour du Markdown et `<` pour des shortcodes imbriqués.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.4/fr/docs/features/steps/index.md
