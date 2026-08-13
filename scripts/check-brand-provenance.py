#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "src/data/brand-provenance.json"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    errors: list[str] = []
    listed: set[Path] = set()

    source = ROOT / data["upstream"]["tokenSource"]
    expected_source = data["upstream"]["tokenSourceSha256"]
    if not source.is_file() or digest(source) != expected_source:
        errors.append("authoritative token source differs from the pinned hash")

    for item in data["artifacts"]:
        path = ROOT / item["path"]
        listed.add(path.resolve())
        if not path.is_file():
            errors.append(f"missing artifact: {item['path']}")
        elif digest(path) != item["sha256"]:
            errors.append(f"unexplained drift: {item['path']}")

    governed = list((ROOT / "src/static/logo").glob("*"))
    governed += list((ROOT / "src/static/fonts").glob("**/*"))
    for path in governed:
        if path.is_file() and path.resolve() not in listed:
            errors.append(f"unlisted brand artifact: {path.relative_to(ROOT)}")

    if errors:
        for error in errors:
            print(f"error: {error}", file=sys.stderr)
        return 1

    print(
        f"Brand provenance verified: {len(data['artifacts'])} artifacts, "
        f"upstream {data['upstream']['ref']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
