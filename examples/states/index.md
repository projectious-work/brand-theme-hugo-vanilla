---
title: "Interface states"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/examples/states/"
description: "Empty, loading, success, and failure states scoped to their region."
---


{{< grid columns="2" >}}
{{< panel title="First run" >}}
No pipelines yet. Create the first pipeline to establish the workspace.

{{< button href="#" variant="accent" >}}Create pipeline{{< /button >}}
{{< /panel >}}
{{< panel title="Filtered empty" >}}
No runs match the current filters. Clear a filter to broaden the result.
{{< /panel >}}
{{< panel title="Running" >}}
{{< status variant="running" >}}Running{{< /status >}}

Validation is active. System output remains available below.
{{< /panel >}}
{{< panel title="Region failed" >}}
{{< status variant="failed" >}}Failed{{< /status >}}

The audit panel could not load. Other page regions remain usable.
{{< /panel >}}
{{< /grid >}}

