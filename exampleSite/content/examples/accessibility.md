---
title: "Accessibility"
description: "Landmarks, focus, contrast, motion, and content rules in practice."
weight: 6
---

## Built into the shell

The theme includes a skip link, semantic landmarks, visible keyboard focus,
ordered heading anchors, and responsive navigation. Text and semantic colors
follow the measured token roles from the brand system.

{{< grid columns="2" >}}
{{< panel title="Keyboard" >}}
- Logical reading and focus order
- Visible `:focus-visible` ring
- 44 px minimum control target
- Escape closes modal surfaces
{{< /panel >}}
{{< panel title="Perception" >}}
- Text uses step 11 or 12 roles
- Status never relies on color alone
- Reduced motion is respected
- Errors stay next to the failed region
{{< /panel >}}
{{< /grid >}}

{{< callout type="info" >}}The accent identity color is not body text. Solid accent buttons use the AA-compliant accent-solid token.{{< /callout >}}
