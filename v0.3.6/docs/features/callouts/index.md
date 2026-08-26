# Callouts

> Emphasize supporting, successful, cautionary or critical information.


{{< callout type="info" >}}Information a reader needs but did not ask for.{{< /callout >}}
{{< callout type="success" >}}The documentation build completed successfully.{{< /callout >}}
{{< callout type="warning" title="Careful" >}}Preview configuration changes before publishing them.{{< /callout >}}
{{< callout type="error" title="Failed" >}}The referenced page was not found.{{< /callout >}}

```md
{{</* callout type="warning" title="Careful" */>}}
Preview configuration changes before publishing them.
{{</* /callout */>}}
```

`type` accepts `info`, `note`, `success`, `warning`, `error` or `important`.
The optional `title` replaces the localized default label.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/docs/features/callouts/index.md
