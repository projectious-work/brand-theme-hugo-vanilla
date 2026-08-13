#!/usr/bin/env python3
import json
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parent.parent
CONTRACT = ROOT / "src/data/product_contract.json"


def main() -> int:
    data = json.loads(CONTRACT.read_text(encoding="utf-8"))
    errors: list[str] = []
    required = {"schemaVersion", "product", "compatibility", "configuration",
                "contentTypes", "outputs", "shortcodes", "extensionPoints"}
    missing = sorted(required - data.keys())
    if missing:
        errors.append(f"missing contract keys: {', '.join(missing)}")

    module = data["product"]["module"]
    if module != "github.com/projectious-work/brand-theme-hugo-vanilla":
        errors.append("canonical module identity differs")
    if not re.fullmatch(r"\d+\.\d+\.\d+", data["compatibility"]["hugoMinimum"]):
        errors.append("hugoMinimum is not a semantic version")

    paths = [item["path"] for item in data["configuration"]]
    if len(paths) != len(set(paths)):
        errors.append("duplicate configuration path")

    declared = {item["name"] for item in data["shortcodes"]}
    shipped = {path.stem for path in (ROOT / "src/layouts/shortcodes").glob("*.html")}
    if declared != shipped:
        errors.append(
            "shortcode coverage differs: "
            f"missing={sorted(shipped - declared)}, extra={sorted(declared - shipped)}"
        )
    for item in data["shortcodes"]:
        if not item.get("example"):
            errors.append(f"shortcode lacks example: {item['name']}")

    if errors:
        for error in errors:
            print(f"error: {error}", file=sys.stderr)
        return 1
    print(
        f"Product contract verified: {len(paths)} settings, "
        f"{len(declared)} shortcodes"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
