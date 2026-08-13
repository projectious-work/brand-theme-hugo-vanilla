#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
import sys


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    root = args.destination.resolve()
    errors: list[str] = []
    required = [
        "index.html",
        "index.json",
        "index.md",
        "llms.txt",
        "llms-full.txt",
        "docs/reference/index.html",
        "docs/reference/index.md",
        ".product-mcp/contract.json",
        ".product-mcp/provenance.json",
        ".product-mcp/pages.json",
        ".product-mcp/tokens.json",
    ]
    for relative in required:
        if not (root / relative).is_file():
            errors.append(f"missing product output: {relative}")

    pages = json.loads((root / "index.json").read_text(encoding="utf-8"))
    identifiers = [page.get("id") for page in pages]
    if not pages or any(not value for value in identifiers):
        errors.append("search index contains a page without a stable ID")
    if len(identifiers) != len(set(identifiers)):
        errors.append("search index contains duplicate page IDs")

    full = (root / "llms-full.txt").read_text(encoding="utf-8").lower()
    for forbidden in ("<script", "<nav", "password=", "secret="):
        if forbidden in full:
            errors.append(f"llms-full.txt contains forbidden content: {forbidden}")

    generated_text = "\n".join(
        (root / relative).read_text(encoding="utf-8", errors="replace")
        for relative in (
            "llms.txt", "llms-full.txt", "docs/reference/index.html"
        )
    )
    if "<no value>" in generated_text:
        errors.append("generated product documentation contains unresolved data")
    for value in (
        "brand-theme-hugo-vanilla 0.2.3",
        "github.com/projectious-work/brand-theme-hugo-vanilla",
        "0.121.0",
    ):
        if value not in generated_text:
            errors.append(f"generated product documentation lacks: {value}")

    if errors:
        for error in errors:
            print(f"error: {error}", file=sys.stderr)
        return 1
    print(f"Product outputs verified: {len(pages)} normalized pages")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
