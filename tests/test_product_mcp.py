import json
from pathlib import Path
import sys
import tempfile
import unittest


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "mcp/product-mcp/src"))

from product_mcp.catalog import Catalog  # noqa: E402
from product_mcp.server import handle  # noqa: E402


class ProductMCPTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        root = Path(self.temp.name)
        fixtures = {
            "contract.json": {
                "compatibility": {"hugoMinimum": "0.121.0"},
                "configuration": [
                    {"path": "params.fonts", "allowed": ["bundled", "system"]}
                ],
                "shortcodes": [{"name": "callout"}],
            },
            "provenance.json": {"upstream": {"ref": "v2.1.1"}},
            "pages.json": [
                {
                    "id": "/docs/",
                    "title": "Docs",
                    "url": "https://example.test/docs/",
                    "relativeUrl": "/docs/",
                    "section": "docs",
                    "language": "en",
                    "description": "Guide",
                    "content": "Install the theme",
                }
            ],
            "tokens.json": {"--color-primary": "#1d3352"},
        }
        for name, value in fixtures.items():
            (root / name).write_text(json.dumps(value), encoding="utf-8")
        (root / "llms.txt").write_text("# Product", encoding="utf-8")
        (root / "llms-full.txt").write_text("# Full", encoding="utf-8")
        self.catalog = Catalog(root)

    def tearDown(self):
        self.temp.cleanup()

    def request(self, method, params=None):
        return handle(
            self.catalog,
            {"jsonrpc": "2.0", "id": 1, "method": method,
             "params": params or {}},
        )

    def test_initialization_is_read_only(self):
        result = self.request("initialize")["result"]
        self.assertEqual(result["capabilities"], {"resources": {}, "tools": {}})

    def test_every_declared_resource_is_readable(self):
        resources = self.request("resources/list")["result"]["resources"]
        for resource in resources:
            response = self.request("resources/read", {"uri": resource["uri"]})
            self.assertIn("result", response)

    def test_search_and_contract_tools(self):
        search = self.request(
            "tools/call", {"name": "search_pages",
                           "arguments": {"query": "install"}}
        )
        self.assertIn("Docs", search["result"]["content"][0]["text"])
        compatible = self.request(
            "tools/call",
            {"name": "check_hugo_compatibility",
             "arguments": {"version": "0.164.0", "extended": True}},
        )
        self.assertIn('"compatible": true', compatible["result"]["content"][0]["text"])

    def test_unknown_write_and_paths_are_rejected(self):
        self.assertIn("error", self.request("files/read", {"path": "../LICENSE"}))
        self.assertIn(
            "error",
            self.request("tools/call", {"name": "write_file", "arguments": {}}),
        )
        self.assertIn(
            "error",
            self.request("resources/read", {"uri": "file:///etc/passwd"}),
        )

    def test_configuration_and_token_tools(self):
        valid = self.request(
            "tools/call",
            {"name": "validate_configuration",
             "arguments": {"configuration": {"params": {"fonts": "system"}}}},
        )
        self.assertIn('"valid": true', valid["result"]["content"][0]["text"])
        token = self.request(
            "tools/call",
            {"name": "lookup_brand_token",
             "arguments": {"name": "--color-primary"}},
        )
        self.assertIn("#1d3352", token["result"]["content"][0]["text"])


if __name__ == "__main__":
    unittest.main()
