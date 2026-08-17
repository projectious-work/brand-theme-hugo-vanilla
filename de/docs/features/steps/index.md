# Schritte

> Geordnete Abläufe mit Markdown oder Komponenten darstellen.


{{< steps >}}
  {{% step title="Hugo installieren" %}}Verwenden Sie die unterstützte Version.{{% /step %}}
  {{% step title="Konfigurieren" %}}Fügen Sie Import und Ausgabeformate hinzu.{{% /step %}}
  {{% step title="Prüfen" %}}Starten Sie den lokalen Build.{{% /step %}}
{{< /steps >}}

```md
{{</* steps */>}}
  {{%/* step title="Installieren" */%}}Hugo installieren.{{%/* /step */%}}
  {{%/* step title="Prüfen" */%}}Build starten.{{%/* /step */%}}
{{</* /steps */>}}
```

Für Markdown-Inhalt verwenden Sie `%`; bei verschachtelten Shortcodes `<`.


---
Quelle: https://projectious-work.github.io/brand-theme-hugo-vanilla/de/docs/features/steps/index.md
