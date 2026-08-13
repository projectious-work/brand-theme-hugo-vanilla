# Read-only product MCP

Build the released product artifacts, install the dependency-free server, and
start it over stdio:

```sh
scripts/build.sh public
python3 -m pip install ./mcp/product-mcp
brand-theme-mcp --artifacts public/.product-mcp
```

After installation and a local Hugo build, startup requires no network access,
secret, or repository write permission. The server opens only six explicitly
named generated artifacts. It does not accept filesystem paths, file URIs,
shell commands, or mutation methods.

Resources expose the product contract, provenance, documentation index, full
guide, normalized page catalog, tokens, and individual public pages. Tools can
search or fetch pages, discover shortcodes, look up tokens, validate theme
configuration, and check Hugo compatibility. Starter generation intentionally
is not exposed because these read-only operations cover the released contract.
