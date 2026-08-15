# Test checklist

Built and verified against **Hugo 0.164.0**. `theme.toml` declares a minimum of
0.128.0, which is **not** currently demonstrated by automation — either add the
matrix below or raise the declared minimum to the version you actually test.

## Version matrix

Run the example site against each version and diff `public/`:

```sh
for v in 0.128.0 0.145.0 0.164.0; do
  hugo version | grep -q "v$v" || echo "install $v"
  (cd src/content && hugo --minify --destination "../../public-$v")
done
```

APIs in use that constrain the floor: `transform.HighlightCodeBlock`,
`.Fragments.Headings`, `hugo.Data`, `.Language.Locale`, `css.TailwindCSS`,
`reflect.IsImageResourceWithMeta`, page `.Store`.

## Build assertions

| Check | Expectation |
|---|---|
| `index.json` | No record has an empty `id` or `title`; every `href` starts with the base path |
| `llms.txt` | Non-empty; one line per published page |
| `sitemap.xml` | No `/search/` entry; every multilingual page carries `xhtml:link` alternates |
| `robots.txt` | Disallows `/search/` and `*print.html` under the base path |
| RSS | `xml-stylesheet` present; `<language>` matches the build |
| Canonical + hreflang | Present on every page including the home page; one `x-default` |
| Meta description | Home page description is the configured one, never rendered card text |
| Base paths | No `href="/` or `src="/` in `public/` that skips the configured prefix |
| Version links | Every entry resolves to a page that exists in that build |
| Fingerprints | Every theme `.js` and `.css` URL carries a hash and an `integrity` attribute |
| Deprecations | `hugo --panicOnWarning` completes with no deprecation output |

## Browser

| Check | Expectation |
|---|---|
| Mermaid fence only | A page whose only diagram is a ````mermaid``` fence renders an SVG |
| Mermaid + colour mode | Switching mode re-renders diagram chrome |
| Code fence options | `.code .highlight` exists; `linenos=table` and `hl_lines` are honoured |
| Palette | No duplicate destinations; no other language's sections |
| Root-relative links | `[Docs](/docs/)` in Markdown lands inside the project prefix |
| Search | Heading hits jump to the anchor; section filters narrow correctly |
| Print | One section prints with a running header and `n / total` folios |

## Accessibility

Automated with axe-core on the docs, landing, blog, search and 404 pages:

```sh
npx @axe-core/cli http://localhost:1313/docs/getting-started/ --exit
```

Manual passes that axe cannot make:

- Keyboard only: skip link → header → sidebar → content → footer, no trap; the
  palette and lightbox trap Tab while open and restore focus on close
- `data-font-size="xxxl"` (200%): no clipping or overlap on any page
- `data-contrast="high"`, `data-motion="reduced"`, `data-text-spacing="loose"`
- Non-text contrast: every interactive boundary ≥ 3:1 (WCAG 1.4.11)
- RTL: set a language with `languagedirection = "rtl"` and check the sidebar rail,
  breadcrumb chevrons, step rail and file-tree connectors mirror

## Known gaps

- No CI harness ships with the theme; the above is a checklist, not a suite
- Print output is verified in Chromium only — `@page` running elements are not
  universally supported, and the folio degrades to nothing where they are absent
- The feedback endpoint contract is documented but has no reference server
