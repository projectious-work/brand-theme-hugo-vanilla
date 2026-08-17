# Steps

> Present ordered procedures with Markdown or structured components.


{{< steps >}}
  {{% step title="Install Hugo" %}}
Use the minimum version listed in the theme README.
  {{% /step %}}
  {{% step title="Configure the module" %}}
Add the theme import and required output formats.
  {{% /step %}}
  {{% step title="Verify" %}}
Run the local build and review every colour mode.
  {{% /step %}}
{{< /steps >}}

```md
{{</* steps */>}}
  {{%/* step title="Install Hugo" */%}}
Use the supported version.
  {{%/* /step */%}}
  {{%/* step title="Verify" */%}}
Run the local build.
  {{%/* /step */%}}
{{</* /steps */>}}
```

Step bodies may contain cards and other components. Use `<` delimiters around a
`step` that contains nested shortcodes; use `%` for Markdown prose. CSS counters
renumber the steps when their order changes.

## Cards inside a step

{{< steps >}}
  {{< step title="Choose a starting point" >}}
{{< cards cols="2" >}}
  {{< card title="New site" subtitle="Follow the complete installation path." link="/docs/getting-started/" icon="rocket" >}}
  {{< card title="Existing site" subtitle="Adopt features incrementally." link="/docs/configuration/site-wide/" icon="settings" >}}
{{< /cards >}}
  {{< /step >}}
  {{% step title="Verify the result" %}}
Run the build and review every colour mode.
  {{% /step %}}
{{< /steps >}}

```md
{{</* steps */>}}
  {{</* step title="Choose a starting point" */>}}
    {{</* cards cols="2" */>}}
      {{</* card title="New site" link="/docs/getting-started/" */>}}
      {{</* card title="Existing site" link="/docs/configuration/" */>}}
    {{</* /cards */>}}
  {{</* /step */>}}
{{</* /steps */>}}
```


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/features/steps/index.md
