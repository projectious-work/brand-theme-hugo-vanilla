import argparse
import json
from pathlib import Path
import sys

from . import __version__
from .catalog import Catalog


PROTOCOL_VERSION = "2025-06-18"


TOOLS = [
    {
        "name": "search_pages",
        "description": "Search released public product pages.",
        "inputSchema": {
            "type": "object",
            "required": ["query"],
            "properties": {
                "query": {"type": "string"},
                "section": {"type": "string"},
                "language": {"type": "string"},
                "limit": {"type": "integer", "minimum": 1, "maximum": 50},
            },
            "additionalProperties": False,
        },
    },
    {
        "name": "get_page",
        "description": "Get a released page by stable ID or URL.",
        "inputSchema": {
            "type": "object",
            "required": ["id_or_url"],
            "properties": {"id_or_url": {"type": "string"}},
            "additionalProperties": False,
        },
    },
    {
        "name": "list_shortcodes",
        "description": "List supported shortcodes and usage examples.",
        "inputSchema": {"type": "object", "additionalProperties": False},
    },
    {
        "name": "lookup_brand_token",
        "description": "Look up a released CSS custom property.",
        "inputSchema": {
            "type": "object",
            "required": ["name"],
            "properties": {"name": {"type": "string", "pattern": "^--"}},
            "additionalProperties": False,
        },
    },
    {
        "name": "check_hugo_compatibility",
        "description": "Check a Hugo version and Extended status.",
        "inputSchema": {
            "type": "object",
            "required": ["version", "extended"],
            "properties": {
                "version": {"type": "string"},
                "extended": {"type": "boolean"},
            },
            "additionalProperties": False,
        },
    },
    {
        "name": "validate_configuration",
        "description": "Validate flattened theme configuration keys.",
        "inputSchema": {
            "type": "object",
            "required": ["configuration"],
            "properties": {"configuration": {"type": "object"}},
            "additionalProperties": False,
        },
    },
]


def version_tuple(value: str) -> tuple[int, ...]:
    return tuple(int(part) for part in value.lstrip("v").split(".")[:3])


def flatten(data: dict, prefix: str = "") -> dict:
    result = {}
    for key, value in data.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            result.update(flatten(value, path))
        else:
            result[path] = value
    return result


def call_tool(catalog: Catalog, name: str, arguments: dict):
    if name == "search_pages":
        return catalog.search(
            str(arguments.get("query", "")),
            arguments.get("section"),
            arguments.get("language"),
            int(arguments.get("limit", 10)),
        )
    if name == "get_page":
        return catalog.page(str(arguments["id_or_url"]))
    if name == "list_shortcodes":
        return catalog.contract["shortcodes"]
    if name == "lookup_brand_token":
        token = str(arguments["name"])
        if token not in catalog.tokens:
            raise KeyError("unknown token")
        return {"name": token, "value": catalog.tokens[token]}
    if name == "check_hugo_compatibility":
        minimum = catalog.contract["compatibility"]["hugoMinimum"]
        compatible = (
            version_tuple(str(arguments["version"])) >= version_tuple(minimum)
            and bool(arguments["extended"])
        )
        return {"compatible": compatible, "minimum": minimum,
                "extendedRequired": True}
    if name == "validate_configuration":
        supplied = flatten(arguments["configuration"])
        supported = {
            item["path"]: item for item in catalog.contract["configuration"]
        }
        unknown = sorted(set(supplied) - set(supported))
        invalid = []
        for path, value in supplied.items():
            allowed = supported.get(path, {}).get("allowed")
            if allowed and value not in allowed:
                invalid.append({"path": path, "allowed": allowed})
        return {"valid": not unknown and not invalid,
                "unknown": unknown, "invalid": invalid}
    raise KeyError("unknown or non-read-only tool")


def handle(catalog: Catalog, request: dict) -> dict | None:
    request_id = request.get("id")
    method = request.get("method")
    if request_id is None:
        return None
    try:
        if method == "initialize":
            result = {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {"resources": {}, "tools": {}},
                "serverInfo": {
                    "name": "brand-theme-hugo-vanilla",
                    "version": __version__,
                },
            }
        elif method == "resources/list":
            result = {"resources": catalog.resources()}
        elif method == "resources/read":
            uri = request.get("params", {}).get("uri", "")
            text, mime = catalog.read(uri)
            result = {"contents": [{"uri": uri, "mimeType": mime, "text": text}]}
        elif method == "tools/list":
            result = {"tools": TOOLS}
        elif method == "tools/call":
            params = request.get("params", {})
            value = call_tool(catalog, params.get("name", ""),
                              params.get("arguments", {}))
            result = {
                "content": [{"type": "text", "text": json.dumps(value)}],
                "isError": False,
            }
        else:
            raise KeyError("unknown or non-read-only method")
        return {"jsonrpc": "2.0", "id": request_id, "result": result}
    except (KeyError, ValueError, TypeError, IndexError) as error:
        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "error": {"code": -32602, "message": str(error)[:240]},
        }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--artifacts", required=True, type=Path)
    args = parser.parse_args()
    catalog = Catalog(args.artifacts)
    for line in sys.stdin:
        try:
            request = json.loads(line)
            response = handle(catalog, request)
        except json.JSONDecodeError as error:
            response = {
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32700, "message": str(error)[:240]},
            }
        if response is not None:
            print(json.dumps(response, separators=(",", ":")), flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
