import json
from pathlib import Path
from urllib.parse import quote, unquote


FILES = {
    "product://contract": ("contract.json", "application/json"),
    "product://provenance": ("provenance.json", "application/json"),
    "product://docs/index": ("llms.txt", "text/plain"),
    "product://docs/full": ("llms-full.txt", "text/plain"),
    "product://pages": ("pages.json", "application/json"),
    "product://tokens": ("tokens.json", "application/json"),
}


class Catalog:
    def __init__(self, artifact_dir: Path):
        self.root = artifact_dir.resolve(strict=True)
        self.contract = self._json("contract.json")
        self.provenance = self._json("provenance.json")
        self.pages = self._json("pages.json")
        self.tokens = self._json("tokens.json")
        self.by_id = {page["id"]: page for page in self.pages}

    def _path(self, filename: str) -> Path:
        path = (self.root / filename).resolve(strict=True)
        if path.parent != self.root:
            raise ValueError("artifact path escapes the configured directory")
        return path

    def _json(self, filename: str):
        return json.loads(self._path(filename).read_text(encoding="utf-8"))

    def resources(self) -> list[dict]:
        resources = [
            {"uri": uri, "name": uri.removeprefix("product://"), "mimeType": mime}
            for uri, (_, mime) in FILES.items()
        ]
        resources.extend(
            {
                "uri": f"product://page/{quote(page['id'], safe='')}",
                "name": page["title"],
                "mimeType": "application/json",
            }
            for page in self.pages
        )
        return resources

    def read(self, uri: str) -> tuple[str, str]:
        if uri in FILES:
            filename, mime = FILES[uri]
            return self._path(filename).read_text(encoding="utf-8"), mime
        prefix = "product://page/"
        if uri.startswith(prefix):
            page_id = unquote(uri[len(prefix):])
            page = self.by_id.get(page_id)
            if page is None:
                raise KeyError("unknown page")
            return json.dumps(page, indent=2, sort_keys=True), "application/json"
        raise KeyError("unknown resource")

    def search(self, query: str, section: str | None, language: str | None,
               limit: int) -> list[dict]:
        needle = query.casefold()
        limit = max(1, min(limit, 50))
        matches = []
        for page in self.pages:
            if section and page.get("section") != section:
                continue
            if language and page.get("language") != language:
                continue
            haystack = " ".join(
                str(page.get(key, ""))
                for key in ("title", "description", "content", "section")
            ).casefold()
            if needle in haystack:
                matches.append(page)
            if len(matches) == limit:
                break
        return matches

    def page(self, identifier: str) -> dict:
        if identifier in self.by_id:
            return self.by_id[identifier]
        for page in self.pages:
            if identifier in (page.get("url"), page.get("relativeUrl")):
                return page
        raise KeyError("unknown page")
