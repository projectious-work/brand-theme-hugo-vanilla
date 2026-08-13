---
title: "Component kitchen sink"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/examples/kitchen-sink/"
description: "One page for visual regression and theme-extension checks."
---


## Typography

# Heading one
## Heading two
### Heading three

Body copy uses Source Sans 3. **Strong text**, [links](#), `inline code`, and
metadata all retain their assigned roles.

## Components

{{< grid columns="3" >}}
{{< card title="Card" meta="Flat by default" >}}Cards lift on hover, not at rest.{{< /card >}}
{{< metric value="273" label="design tokens" >}}
{{< panel variant="accent" title="Panel" >}}Accent marks a decision surface.{{< /panel >}}
{{< /grid >}}

{{< status variant="healthy" >}}Healthy{{< /status >}}
{{< status variant="running" >}}Running{{< /status >}}
{{< status variant="warning" >}}Warning{{< /status >}}
{{< status variant="failed" >}}Failed{{< /status >}}
{{< status variant="idle" >}}Idle{{< /status >}}

{{< callout type="success" >}}Success state{{< /callout >}}
{{< callout type="warning" >}}Warning state{{< /callout >}}
{{< callout type="danger" >}}Danger state{{< /callout >}}

```yaml {filename="pipeline.yaml"}
name: deploy-staging
policy: continuous-audit
provider: independent
```

