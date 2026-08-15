+++
title = "Policy schreiben"
description = "Ein Regelwerk einmal formulieren, versionieren und überall zuordnen."
weight = 20
tags = ["anleitung"]
+++

## Aufbau

Eine Policy ist eine benannte, versionierte Liste von Regeln. Die Regeln werden in
Reihenfolge geprüft; der erste Verstoß bricht den Durchlauf ab.

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

## Veröffentlichen

{{< terminal >}}
$ projectious policy publish data-retention-v2.yaml
✓ 2 Regeln geprüft
✓ Veröffentlicht als data-retention v2
{{< /terminal >}}
