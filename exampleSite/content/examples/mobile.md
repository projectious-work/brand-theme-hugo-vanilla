---
title: "Mobile workflow"
description: "A narrow, task-focused agent run that preserves touch targets."
weight: 7
---

{{< panel variant="dark" title="Deploy staging" >}}
{{< status variant="running" >}}Running{{< /status >}}

{{< steps >}}
{{% step title="validate_schema" %}}Configuration accepted.{{% /step %}}
{{% step title="policy_check" %}}Policy evaluation passed.{{% /step %}}
{{% step title="deploy_staging" %}}Deployment is active.{{% /step %}}
{{< /steps >}}

{{< terminal >}}
✓ validate_schema 0.4s
✓ policy_check 1.8s
● deploy_staging
{{< /terminal >}}
{{< /panel >}}

At narrow widths grids collapse to one column, documentation sidebars become
part of the mobile navigation, and application-shell navigation yields to the
primary task.
