# Deploying your first pipeline

> Define a pipeline, attach a policy check, and run it end to end.


## Before you start

You need a workspace with at least one connected {{< term "agent" >}}, and the
`projectious` CLI installed locally.

## Define the pipeline

```yaml {filename="pipeline.yaml"}
name: onboarding-audit
trigger: on_document_upload
agent: auditor-v3
steps:
  - validate_schema
  - policy_check
  - deploy_staging
```

## Add a policy check

{{< terminal >}}
$ projectious policy attach onboarding-audit --policy data-retention-v2
{{< /terminal >}}

{{< callout type="info" >}}
Policies are versioned. Attaching a new version does not affect runs already in progress.
{{< /callout >}}

## Troubleshooting

| Error | Cause |
|---|---|
| `SCHEMA_MISMATCH` | The pipeline references a step missing from the agent manifest. |
| `POLICY_NOT_FOUND` | The attached policy version was deleted or never published. |
| `AGENT_UNREACHABLE` | The agent lost its session token. Reconnect it under Settings. |


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/guides/deploying-a-pipeline/index.md
