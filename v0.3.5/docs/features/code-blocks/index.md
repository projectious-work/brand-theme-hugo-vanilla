# Code blocks

> Configure syntax highlighting, filenames, line numbers, highlighted lines and linkable anchors.


The theme renders fenced Markdown code through Hugo's Chroma syntax highlighter
and adds a header with the language or optional filename plus a copy button.

## Basic fence

Put the language after the opening fence. Add the theme-specific `filename`
attribute inside braces when readers should know which file the example belongs
to:

````md
```python {filename="report.py"}
print("ready")
```
````

## Per-block options

The theme handles `filename`; Hugo handles the remaining highlighting options.

| Option | Default | Values and effect |
|---|---|---|
| `filename="report.py"` | Language name | Show a filename in the theme's code header |
| `linenos=false` | Site setting | Hide line numbers for this block |
| `linenos=table` | Site setting | Put numbers in a separate, copy-friendly column |
| `linenos=inline` | Site setting | Put a number inside each highlighted line |
| `linenostart=20` | `1` | Start the displayed numbering at 20 |
| `hl_lines=[3,"6-8"]` | None | Emphasize individual lines and inclusive ranges |
| `anchorlinenos=true` | `false` | Turn displayed line numbers into links |
| `lineanchors="example-"` | Empty | Prefix anchor IDs so blocks do not collide |

Options may be combined:

```python {filename="checks.py", linenos=table, linenostart=20, hl_lines=[2,"4-5"], anchorlinenos=true, lineanchors="checks-"}
def verify(build):
    # Reject output that cannot be reproduced.
    if not build.deterministic:
        raise ValueError("build output changed")

    return "ready"
```

The Markdown source is:

````md
```python {filename="checks.py", linenos=table, linenostart=20, hl_lines=[2,"4-5"], anchorlinenos=true, lineanchors="checks-"}
def verify(build):
    # Reject output that cannot be reproduced.
    if not build.deterministic:
        raise ValueError("build output changed")

    return "ready"
```
````

Use a unique `lineanchors` prefix for every block on a page. Without it, two
blocks can generate the same HTML IDs.

## Site-wide defaults

Configure defaults in the site's `hugo.toml`:

```toml {filename="hugo.toml"}
[markup.highlight]
  lineNos = false
  lineNumbersInTable = true
  noClasses = false
  tabWidth = 4
```

Fence attributes override these values for one block. `noClasses = false` is
important for this theme because it lets the theme stylesheet control colours in
light and dark mode instead of inserting fixed inline colours.

Use per-block options to explain a particular example; use site-wide defaults
only for conventions that should apply to nearly every code sample. Hugo's
[syntax-highlighting reference](https://gohugo.io/content-management/syntax-highlighting/)
documents the complete Chroma configuration.

## Authoring recommendations

- Specify the real language so Chroma can tokenize it correctly.
- Use `filename` when the code belongs to a named file.
- Highlight only the lines discussed by the surrounding prose.
- Prefer `linenos=table` when readers will copy code.
- Do not use a terminal fence for source code; use the terminal shortcode for
  command sessions and their output.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/features/code-blocks/index.md
