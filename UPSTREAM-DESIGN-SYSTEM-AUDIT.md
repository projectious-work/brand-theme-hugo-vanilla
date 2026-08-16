# Design-system conformance audit for the upstream theme

Audit basis: every file in `input/projectious.work Design System/preview/`
and the complete design-system `README.md`, compared with the integrated v7
Hugo theme.

## Upstream changes requested

1. **Ship the real IBM Plex Mono syntax faces.** The syntax contract uses
   regular 400, italic 400, medium 500, medium italic 500, semibold 600,
   semibold italic 600, bold 700, and bold italic 700. The v7 theme bundled
   only 400 and 500 upright. Browsers therefore synthesized or discarded the
   weight and italic distinctions specified by the syntax roles. Bundle every
   listed WOFF2 face and declare a separate `@font-face` for each weight/style.

2. **Make bundled font URLs base-path safe.** URLs such as
   `/fonts/ibm-plex-mono/...` resolve from the host root and fail when a Hugo
   site is deployed below a path, including GitHub Pages project sites. From
   the generated CSS, use relative `../fonts/...` URLs or generate URLs through
   Hugo. This fault can make all code silently fall back to a system monospace
   font.

3. **Synchronize the complete token contract, not only the syntax colours.**
   v7 omitted the canonical `--code-panel-*`, terminal-border, elevation,
   fixed print/notebook/control, hero/header/logo, on-solid semantic, and dark
   code-tint tokens. It also retained older light semantic triples. Import the
   full authoritative variable set and retain aliases only for compatibility.

4. **Keep selected code readable.** Add a code-specific `::selection` rule.
   The audited pairs are:

   - deep/navy code: `#20354d` background and `#c5daf0` foreground;
   - light adaptive code: `#dae2ec` background and `#142438` foreground.

   Test both pairs at at least 4.5:1 and make a real DOM selection in a browser
   test. Do not let the page-level orange selection token override code.

5. **Use the semantic code-panel tokens.** Code is specified on `#131e2b` in
   dark appearances; terminal output is specified on `#0e1720`. These are
   deliberately different surfaces. Apply `--code-panel-surface`,
   `--code-panel-border`, and `--code-panel-foreground` to code and reserve the
   terminal tokens for terminal output.

6. **Align component styling with the preview contracts.** In particular:

   - alerts have the semantic 3 px leading rule;
   - cards use the elevation/rim/shadow tokens and 16 px by 24 px padding;
   - badges use the tag tokens without an extra outline;
   - controls have a 44 px minimum target;
   - default icon strokes are 1.5 and active strokes are 2;
   - headings and the landing hero use the named type and hero tokens;
   - notebook cells use the code-panel surface, not the terminal surface;
   - header marks switch between the light and dark logo assets.

7. **Bring Asciinema into the brand palette contract.** The theme currently
   selects Asciinema's stock `asciinema` and `solarized-light` themes. Those do
   not represent `colors-terminal-0-palette.html` or
   `colors-terminal-1-status.html`. Define supported custom player palettes,
   or document this as an intentional third-party limitation. Preserve the
   current recreation-on-mode-change behaviour.

8. **Strengthen the design-system audit page itself.** `_audit.html` currently
   treats 3:1 as sufficient for every text pair and does not test selection
   colours. Distinguish normal text (4.5:1), large text/UI boundaries (3:1),
   and add the code-selection pairs above. This would have caught the readable
   selection requirement automatically.

9. **Resolve contradictions in the design-system source.** Theme implementers
   cannot reliably infer the intended rule while these remain:

   - The README first says code and terminal panels both stay on `#0e1720`,
     but its later syntax section and the syntax preview specify code on
     `#131e2b`. The latter is the coherent, implemented interpretation.
   - The README card recipe says `background: var(--color-surface)`, while
     `components-cards.html` uses `var(--bg)` for flat and raised cards.
   - `type-code.html` says its specimen is on `--terminal-surface`, while the
     specimen actually uses the code-panel surface.
   - Root light semantic values in `colors_and_type.css` differ from the
     explicit `[data-theme="light"]` values used by the previews. Publish one
     authoritative light set.
   - The README requires lowercase hex output, but the v7 sheet included
     uppercase `#E05232`.
   - The icon guidance names Tabler as the system library but one checklist
     item still says to prefer Lucide. Remove the stale library reference.

10. **Clarify the font-delivery contract.** The design-system README calls
    Google Fonts the canonical delivery method and says local WOFF2 files are
    not included. The distributable theme documents locally bundled fonts.
    Both approaches are valid, but upstream needs an explicit theme profile
    that states which files and cuts must be shipped and how consumers may
    replace them.

## File-by-file coverage

| Preview file | Theme result |
|---|---|
| `accessibility.html` | Implemented; theme deliberately keeps the stronger 3 px opt-in ring requested downstream. |
| `_audit.html` | Upstream audit gap: thresholds and selection coverage need correction. |
| `brand-logo-lockups.html` | Relevant header lockup and light/dark switching implemented. |
| `brand-logo-marks.html` | Light/dark marks implemented; mono specimens are not needed by current UI. |
| `brand-logo-primary.html` | Primary geometry/assets conform. |
| `brand-taglines.html` | Landing eyebrow uses the designated overline role. |
| `card.css` | Preview-only presentation helper; no product contract beyond audited specimens. |
| `card-mode.js` | Preview-only appearance helper; no theme runtime requirement. |
| `code-card.css` | Code surface, role styling, and selection now conform. |
| `colors-core.html` | Core brand palette synchronized. |
| `colors-scales.html` | Complete midnight/orange scales synchronized. |
| `colors-semantic.html` | Semantic triples synchronized; source-default conflict needs upstream resolution. |
| `colors-syntax-0-roles.html` | All ten roles, weights, styles, three appearances, and selection tested. |
| `colors-syntax-1-python.html` | Python role mapping conforms. |
| `colors-syntax-2-rust.html` | Rust role mapping conforms. |
| `colors-syntax-3-yaml.html` | YAML role mapping conforms. |
| `colors-syntax-4-toml.html` | TOML role mapping conforms. |
| `colors-syntax-5-latex.html` | LaTeX role mapping conforms. |
| `colors-terminal-0-palette.html` | Native terminal blocks conform; Asciinema remains an upstream integration gap. |
| `colors-terminal-1-status.html` | Native status colours conform; same Asciinema caveat. |
| `components-alerts.html` | Semantic leading rules and surfaces implemented. |
| `components-buttons.html` | Primary/secondary styling and target dimensions implemented. |
| `components-cards.html` | Elevation and hover behaviour implemented; source background contradiction remains. |
| `components-inputs.html` | Shape, borders, typography, and accessible focus treatment conform. |
| `components-tags-badges.html` | Token-driven fills and typography implemented. |
| `elevation.html` | All levels, rims, and dark-mode behaviour represented by tokens. |
| `iconography.html` | Tabler sizing/strokes implemented; stale Lucide wording remains upstream. |
| `layout-responsive.html` | Shell, documentation rails, breakpoints, and mobile collapse conform. |
| `radii.html` | Complete radius scale synchronized. |
| `spacing-scale.html` | Complete spacing scale synchronized. |
| `type-body.html` | Body family, sizes, weights, and line heights synchronized. |
| `type-code.html` | Theme corrected; preview description names the wrong surface. |
| `type-display.html` | Display role and landing hero implemented. |
| `type-families.html` | All three families present; local code-face matrix corrected. |
| `type-scale.html` | Named type scale synchronized and used by principal components. |

## Intentional downstream differences

- The accessibility preference named “strong focus” remains 3 px with a 3 px
  offset, exceeding the preview's 2 px specimen, because that stronger setting
  was explicitly requested for this product.
- Native terminal examples adapt between light and dark appearances because
  that behaviour was explicitly requested downstream. The design-system
  terminal reference itself is dark-only.
- The theme bundles fonts for offline/privacy-safe operation even though the
  generic design-system README presents Google Fonts as canonical delivery.
