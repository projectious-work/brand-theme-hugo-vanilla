---
title: "Settings"
description: "A restrained form layout with clear labels, hints, and actions."
weight: 3
---

{{< app >}}
## Workspace settings

{{< panel title="General" >}}
{{< field label="Workspace name" value="Projectious operations" hint="Used in navigation and notifications." >}}
{{< field label="Default region" value="eu-central" hint="New pipelines inherit this region." >}}
{{< field label="Audit email" type="email" value="audit@example.com" >}}

{{< button href="#" variant="accent" >}}Save changes{{< /button >}}
{{< /panel >}}

{{< callout type="warning" >}}Changing the default region affects new pipelines only.{{< /callout >}}
{{< /app >}}
