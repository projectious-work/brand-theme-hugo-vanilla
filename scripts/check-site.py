#!/usr/bin/env python3
import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links: list[str] = []
        self.has_lang = False
        self.has_main = False
        self.has_skip = False
        self.is_redirect = False

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "html" and values.get("lang"):
            self.has_lang = True
        if tag == "main" and values.get("id") == "main-content":
            self.has_main = True
        if tag == "a" and values.get("href") == "#main-content":
            self.has_skip = True
        if tag == "meta" and values.get("http-equiv", "").lower() == "refresh":
            self.is_redirect = True
        for key in ("href", "src"):
            if values.get(key):
                self.links.append(values[key])


def local_target(root: Path, link: str) -> Path | None:
    if link.startswith(("#", "mailto:", "tel:", "data:")):
        return None
    parsed = urlsplit(link)
    if parsed.scheme or parsed.netloc:
        return None
    path = parsed.path
    marker = "/brand-theme-hugo-vanilla/"
    if path.startswith(marker):
        path = path[len(marker):]
    else:
        path = path.lstrip("/")
    target = root / path
    if path.endswith("/") or not target.suffix:
        target = target / "index.html"
    return target


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    root = args.destination.resolve()
    errors: list[str] = []
    html_files = sorted(root.glob("**/*.html"))
    for html_file in html_files:
        text = html_file.read_text(encoding="utf-8")
        document = Parser()
        document.feed(text)
        if not document.is_redirect and (
            not document.has_lang or not document.has_main or not document.has_skip
        ):
            errors.append(f"missing semantic landmark: {html_file.relative_to(root)}")
        for link in document.links:
            target = local_target(root, link)
            if target is not None and not target.exists():
                errors.append(
                    f"broken local reference in {html_file.relative_to(root)}: {link}"
                )

    combined = "\n".join(
        path.read_text(encoding="utf-8", errors="replace")
        for path in root.glob("**/*")
        if path.is_file() and path.suffix in {".html", ".css", ".js"}
    )
    if re.search(r"fonts\.(googleapis|gstatic)\.com", combined):
        errors.append("generated output contains a font CDN reference")
    for required in (
        "prefers-reduced-motion",
        ":focus-visible",
        "data-theme=dark",
        "@media",
    ):
        if required not in combined:
            errors.append(f"generated output lacks required behavior: {required}")

    if errors:
        for error in errors[:50]:
            print(f"error: {error}", file=sys.stderr)
        return 1
    print(f"Site verified: {len(html_files)} HTML documents")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
