---
title: "AI discovery and product MCP"
description: "Consume the released theme contract as Markdown, LLM discovery files, or read-only MCP resources."
weight: 7
---

## AI-readable outputs

The example site publishes a Markdown alternative for each page, a compact
`/llms.txt` index, and a bounded `/llms-full.txt` guide. These outputs use the
same normalized page identity, URL, language, section, and description fields
as the client-side search index and structured metadata.

Markdown output preserves the page's source Markdown and Hugo shortcode calls.
The full guide instead uses rendered plain text so agents can consume shortcode
results without HTML navigation, scripts, or comments. Drafts and pages with
`aiExclude: true` are omitted from the full guide.

## Read-only product MCP

Build and install the dependency-free stdio server:

```sh
scripts/build.sh public
python3 -m pip install ./mcp/product-mcp
brand-theme-mcp --artifacts public/.product-mcp
```

The server exposes only generated release artifacts. It has no write, shell,
arbitrary-path, repository, processkit, credential, or maintainer capability.
Resources cover the contract, documentation, pages, brand provenance, and
tokens. Read-only tools support page search, shortcode discovery, token lookup,
configuration validation, and Hugo compatibility checks.
