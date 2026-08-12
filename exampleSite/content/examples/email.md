---
title: "Email content"
description: "How branded notification content reads before email-client inlining."
weight: 8
---

{{< panel variant="accent" title="Deployment completed" >}}
The staging deployment passed all policy and health checks.

| Detail | Value |
|---|---|
| Environment | staging |
| Commit | `810c9a6` |
| Duration | 42 seconds |
| Result | {{< status variant="success" >}}Passed{{< /status >}} |

{{< button href="#" variant="accent" >}}View deployment{{< /button >}}
{{< /panel >}}

{{< callout type="info" >}}For production email, render a dedicated email template and inline its CSS. This page documents hierarchy and voice; browser CSS is not assumed to survive every mail client.{{< /callout >}}
