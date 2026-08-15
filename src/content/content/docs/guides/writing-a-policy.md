+++
title = "Writing a policy"
description = "Express a rule set once, version it, and attach it anywhere."
weight = 20
tags = ["guide"]
+++

## Anatomy

A policy is a named, versioned list of rules. Rules are evaluated in order and
the first failure halts the run.

```yaml {filename="data-retention-v2.yaml"}
name: data-retention
version: 2
rules:
  - id: pii_tagged
    assert: every_field_has_tag
  - id: retention_set
    assert: retention_days_between
    args: { min: 30, max: 365 }
```

## Publishing

{{< terminal >}}
$ projectious policy publish data-retention-v2.yaml
✓ 2 rules validated
✓ Published as data-retention v2
{{< /terminal >}}
