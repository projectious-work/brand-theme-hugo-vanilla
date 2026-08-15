# Erste Pipeline ausrollen

> Pipeline definieren, Policy-Prüfung zuordnen und den Durchlauf starten.


## Voraussetzungen

Ein Workspace mit mindestens einem verbundenen Agenten und die lokal installierte
`projectious`-CLI.

## Pipeline definieren

```yaml {filename="pipeline.yaml"}
name: onboarding-audit
trigger: on_document_upload
agent: auditor-v3
steps:
  - validate_schema
  - policy_check
  - deploy_staging
```

## Policy zuordnen

{{< terminal >}}
$ projectious policy attach onboarding-audit --policy data-retention-v2
{{< /terminal >}}

{{< callout type="info" >}}
Policies sind versioniert. Eine neue Version wirkt nicht auf laufende Durchläufe.
{{< /callout >}}

## Fehlersuche

| Fehler | Ursache |
|---|---|
| `SCHEMA_MISMATCH` | Die Pipeline verweist auf einen Schritt, der im Agenten-Manifest fehlt. |
| `POLICY_NOT_FOUND` | Die zugeordnete Policy-Version wurde gelöscht oder nie veröffentlicht. |
| `AGENT_UNREACHABLE` | Der Agent hat sein Sitzungstoken verloren. Unter Einstellungen neu verbinden. |


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/de/docs/guides/pipeline-ausrollen/index.md
