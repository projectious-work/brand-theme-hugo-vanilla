#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
import re
import shutil


ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    destination = args.destination.resolve()
    target = destination / ".product-mcp"
    target.mkdir(parents=True, exist_ok=True)

    shutil.copyfile(
        ROOT / "src/data/product_contract.json", target / "contract.json"
    )
    shutil.copyfile(
        ROOT / "src/data/brand-provenance.json", target / "provenance.json"
    )
    shutil.copyfile(destination / "index.json", target / "pages.json")
    shutil.copyfile(destination / "llms.txt", target / "llms.txt")
    shutil.copyfile(destination / "llms-full.txt", target / "llms-full.txt")

    css = (ROOT / "src/assets/css/tokens.css").read_text(encoding="utf-8")
    tokens = {}
    for name, value in re.findall(r"(--[a-z0-9-]+)\s*:\s*([^;]+);", css):
        tokens.setdefault(name, value.strip())
    (target / "tokens.json").write_text(
        json.dumps(tokens, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    print(f"Built product MCP artifacts into {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
