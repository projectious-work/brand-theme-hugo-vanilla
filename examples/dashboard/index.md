---
title: "Dashboard"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/examples/dashboard/"
description: "Metrics, pipeline state, and scoped system output."
---


{{< app >}}
## Operations overview

{{< grid columns="4" >}}
{{< metric value="12" label="active agents" >}}
{{< metric value="184" label="pipelines today" >}}
{{< metric value="99.8%" label="success rate" >}}
{{< metric value="42s" label="average audit" >}}
{{< /grid >}}

{{< panel title="Recent pipelines" >}}
| Pipeline | Owner | State |
|---|---|---|
| Validate release | Platform | {{< status variant="healthy" >}}Healthy{{< /status >}} |
| Audit dependencies | Compliance | {{< status variant="running" >}}Running{{< /status >}} |
| Deploy staging | Delivery | {{< status variant="pending" >}}Pending{{< /status >}} |
{{< /panel >}}

{{< terminal >}}
$ projectious run deploy-staging
✓ Policy check passed
● Deploying to staging
{{< /terminal >}}
{{< /app >}}

