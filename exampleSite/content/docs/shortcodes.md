---
title: "Shortcodes"
description: "The brand system's components, as shortcodes."
weight: 3
---

Use these to reach further into the brand system without writing HTML.

## Callouts

{{< callout type="info" >}}Pipeline validation passed all 12 checks.{{< /callout >}}
{{< callout type="success" >}}Deployment complete. All agents healthy.{{< /callout >}}
{{< callout type="warning" >}}Agent "monitor" idle for 2 hours.{{< /callout >}}
{{< callout type="danger" >}}Policy violation — deployment blocked.{{< /callout >}}

## Buttons

{{< button href="#" variant="primary" >}}Primary{{< /button >}}
{{< button href="#" variant="accent" >}}Accent{{< /button >}}
{{< button href="#" variant="outline" >}}Outline{{< /button >}}
{{< button href="#" variant="ghost" >}}Ghost{{< /button >}}

## Cards

{{< cards >}}
{{< card title="Pipeline config" meta="3 stages · Last run 2h ago" >}}{{< /card >}}
{{< card title="Deployment report" meta="All 12 checks passed" href="#" >}}View the latest run.{{< /card >}}
{{< /cards >}}

## Stats

{{< stats >}}
{{< stat value="99.98%" label="uptime" >}}
{{< stat value="12ms" label="p50 latency" >}}
{{< stat value="3" label="practice areas" >}}
{{< /stats >}}

## Terminal

{{< terminal >}}
$ projectious deploy --env staging
✓ Policy check passed
● Deploying to staging...
✓ Deploy complete (1.2s)
{{< /terminal >}}

## Tags & badges

{{< tag >}}Cloud{{< /tag >}} {{< tag >}}Agile{{< /tag >}} {{< tag variant="accent" >}}Agentic AI{{< /tag >}}

{{< badge >}}Info{{< /badge >}} {{< badge variant="success" >}}Passed{{< /badge >}} {{< badge variant="warning" >}}Warning{{< /badge >}} {{< badge variant="danger" >}}Failed{{< /badge >}}

## Steps

{{< steps >}}
{{% step title="Install the CLI" %}}Run `go install projectious.work/cli@latest`.{{% /step %}}
{{% step title="Authenticate" %}}Run `projectious login` and follow the prompt.{{% /step %}}
{{% step title="Deploy" %}}Run `projectious deploy --env staging`.{{% /step %}}
{{< /steps >}}

## Pull quote

{{% quote author="Jane Doe" role="CTO, Acme" %}}Specialized beats generic now — this is the first platform that actually fit how we work.{{% /quote %}}

## Code blocks

Fenced code gets syntax highlighting, a filename label, and a copy button automatically:

```python {filename="policy_check.py"}
from dataclasses import dataclass

@dataclass
class Policy:
    name: str
    max_cost_usd: float = 250.0

def enforce(policies):
    return all(p.max_cost_usd <= 500 for p in policies)
```
