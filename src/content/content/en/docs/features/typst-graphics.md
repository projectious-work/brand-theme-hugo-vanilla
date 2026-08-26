+++
title = "Typst Graphics and CeTZ"
description = "Render mathematical, technical and domain-specific Typst graphics as responsive SVG."
weight = 125
icon = "vector"
+++

The theme's `typst` renderer compiles ordinary
[Typst](https://typst.app/docs/) source to responsive SVG during the site
build and inserts that SVG inline in the page. [CeTZ](https://typst.app/universe/package/cetz/) is an authoring library
for precise vector drawings inside Typst; it is inspired by TikZ and
Processing, but it is not a TikZ compatibility layer.

This distinction matters. The renderer can use Typst's math, drawing
primitives and compatible [Typst Universe](https://typst.app/universe/)
packages without a package-specific integration. Actual `.tex` or TikZ source
would require a separate TeX backend and is not accepted by `renderer="typst"`.

## Authoring paths

| Source | Author writes | Build behavior |
|---|---|---|
| Inline | A fenced `typst` block | The pre-renderer discovers, compiles and inlines it |
| Project file | A `.typ` asset and `diagram` shortcode | Hugo inlines its cached SVG |
| URL | A versioned URL in `diagram` | Hugo fetches the source at build time |

File input is best for a reusable or substantial figure because the full
Typst program remains independently testable. Put shared sources under
`assets/`; a leaf bundle can keep a source beside its `index.md`.

## CeTZ mathematical construction

This rendering is Karl's Picture from the CeTZ 0.5.2 gallery. It combines a
unit circle, mathematical labels, projections, fills and line intersections.

{{< diagram renderer="typst" src="graphics/karls-picture.typ"
    alt="A unit circle with sine, cosine and tangent constructions"
    caption="Karl's Picture from the CeTZ 0.5.2 gallery." >}}

### Complete Typst source

The source is the complete, unmodified
[CeTZ gallery example](https://raw.githubusercontent.com/typst/packages/main/packages/preview/cetz/0.5.2/gallery/karls-picture.typ),
licensed with CeTZ under LGPL-3.0.

{{< source-code src="graphics/karls-picture.typ" lang="typst" >}}

### Markdown inclusion

```md
{{</* diagram renderer="typst" src="graphics/karls-picture.typ"
    alt="A unit circle with sine, cosine and tangent constructions"
    caption="Karl's Picture from the CeTZ 0.5.2 gallery." */>}}
```

## CeTZ neural network

The next figure is an original CeTZ implementation inspired by the
[TikZ.net neural-network examples](https://tikz.net/neural_networks/). The
Typst program computes node positions and connections from the layer sizes; it
does not contain or execute TikZ source.

{{< diagram renderer="typst" src="graphics/neural-network.typ"
    alt="A fully connected neural network with input, hidden and output layers"
    caption="A CeTZ neural network inspired by the TikZ.net examples." >}}

### Complete Typst source

{{< source-code src="graphics/neural-network.typ" lang="typst" >}}

### Markdown inclusion

```md
{{</* diagram renderer="typst" src="graphics/neural-network.typ"
    alt="A fully connected neural network with input, hidden and output layers"
    caption="A CeTZ neural network inspired by the TikZ.net examples." */>}}
```

## Useful Typst graphics packages

These libraries all produce Typst content, so they can use the same file,
fence and URL rendering paths. They remain independently versioned upstream
packages rather than theme-specific chart types.

| Purpose | Package | Useful output |
|---|---|---|
| General vector drawing | [CeTZ](https://typst.app/universe/package/cetz/) | [Geometry and technical illustration](#cetz-vector-geometry) |
| Data visualization | [Primaviz](https://typst.app/universe/package/primaviz/) | [Charts and dashboards](#primaviz-bar-chart) |
| Chemistry | [Alchemist](https://typst.app/universe/package/alchemist/) | [Skeletal formulae](#alchemist-skeletal-formula) |
| Project planning | [Timeliney](https://typst.app/universe/package/timeliney/) | [Gantt charts](#timeliney-gantt-chart) |
| Automata theory | [Finite](https://typst.app/universe/package/finite/) | [Finite-state automata](#finite-state-automaton) |
| Connected diagrams | [Fletcher](https://typst.app/universe/package/fletcher/) | [Nodes and arrows](#fletcher-connected-diagram) |
| Algorithms | [Lovelace](https://typst.app/universe/package/lovelace/) | [Structured pseudocode](#lovelace-pseudocode) |
| Scientific notation | [Physica](https://typst.app/universe/package/physica/) | [Physics and tensor notation](#physica-scientific-notation) |
| Chess publishing | [Staunton](https://typst.app/universe/package/staunton/) | [Chess positions](#staunton-chess-position) |
| Bioinformatics | [Genotypst](https://typst.app/universe/package/genotypst/) | [Phylogenetic trees](#genotypst-phylogenetic-tree) |
| Circuit diagrams | [Circuiteria](https://typst.app/universe/package/circuiteria/) | [Block circuits](#circuiteria-block-circuit) |

Primaviz currently provides more than 50 chart types, including grouped and
stacked bars, areas, radar charts, gauges, heat maps, box and violin plots,
waterfalls, funnels, treemaps, Sankey and chord diagrams, Gantt charts,
timelines and dashboards. Refer to its upstream gallery for the current API
and complete catalogue rather than treating this page as a second Primaviz
manual.

## Package examples

Each example below is a complete standalone `.typ` asset. Its import pins the
package version used for the shown rendering. The Markdown block is the exact
theme shortcode that includes the source file.

### CeTZ vector geometry

{{< typst-example src="graphics/cetz-geometry.typ"
    alt="A circle with coordinate axes and an arrow marking its radius"
    caption="A small geometric construction drawn with CeTZ." >}}

### Primaviz bar chart

{{< typst-example src="graphics/primaviz-bars.typ"
    alt="A bar chart comparing project counts for plan, build and ship phases"
    caption="A compact Primaviz bar chart using inline Typst data." >}}

### Alchemist skeletal formula

{{< typst-example src="graphics/alchemist-molecule.typ"
    alt="A branched skeletal chemical formula with carbon and oxygen fragments"
    caption="A small molecular structure composed with Alchemist." >}}

### Timeliney Gantt chart

{{< typst-example src="graphics/timeliney-plan.typ"
    alt="A three-week Gantt chart containing design, build and release tasks"
    caption="A compact delivery plan rendered with Timeliney." >}}

### Finite-state automaton

{{< typst-example src="graphics/finite-automaton.typ"
    alt="An automaton transitioning between idle and active states"
    caption="A two-state automaton generated from a transition dictionary." >}}

### Fletcher connected diagram

{{< typst-example src="graphics/fletcher-flow.typ"
    alt="Source, transform and output nodes connected by labeled arrows"
    caption="A small directed processing flow drawn with Fletcher." >}}

### Lovelace pseudocode

{{< typst-example src="graphics/lovelace-search.typ"
    alt="Nested pseudocode for filtering matching items from a dataset"
    caption="Structured pseudocode with nesting and algorithm keywords." >}}

### Physica scientific notation

{{< typst-example src="graphics/physica-notation.typ"
    alt="Equations showing curl, gradient, tensor and partial derivative notation"
    caption="Scientific mathematical notation supplied by Physica." >}}

### Staunton chess position

{{< typst-example src="graphics/staunton-position.typ"
    alt="A chess board showing the position after e4, c5 and knight f3"
    caption="A publication-ready chess position parsed from FEN." >}}

### Genotypst phylogenetic tree

{{< typst-example src="graphics/genotypst-tree.typ"
    alt="A phylogenetic tree grouping API and worker services beside a database"
    caption="A small rectangular tree parsed from Newick data." >}}

### Circuiteria block circuit

{{< typst-example src="graphics/circuiteria-block.typ"
    alt="A sensor block connected by a directed signal to a controller block"
    caption="A two-component block circuit with a directed wire." >}}

Physica provides scientific mathematical notation; its published feature list
does not include digital clock, bus or voltage timing diagrams. Circuiteria is
the documented Typst package for block circuits. The theme does not claim a
timing-diagram feature until an appropriate renderer or package is integrated
and tested.

## Package imports and reproducible builds

Pin the package version in every source file, for example
`#import "@preview/cetz:0.5.2"`.

The Typst CLI downloads a missing Universe package on first use and caches it.
A clean online build therefore needs access to the package repository. For a
fully offline build, populate the Typst package cache or vendor the dependency
and import it by file path. The generated SVG cache allows an unchanged figure
to build without invoking Typst, but CI should still reproduce every figure
from source.

## Inline and remote source

For a small figure, use a `typst` fence in the same way as the D2 and DOT
fences on [Diagrams and Charts](diagrams.md). Put `alt` and `caption` in the
fence attributes. For substantial figures, prefer a source file so the full
program can be viewed, copied and tested independently as in both examples
above.

A remote source uses the same figure component:

```md
{{</* diagram renderer="typst"
    url="https://example.org/figures/network.typ"
    alt="A neural-network diagram"
    caption="Typst source fetched during the Hugo build." */>}}
```

Remote sources are explicit build dependencies. Prefer a versioned,
project-controlled URL. The source is fetched during the build; visitors only
receive the rendered SVG and do not contact the source server.

## Accessibility and output constraints

- Supply an `alt` description that communicates the structure or conclusion.
- Use a caption for provenance, units or interpretation.
- Avoid encoding meaning through colour alone.
- Prefer a transparent or neutral background for colour-mode compatibility.
- Keep each source to a single figure-sized page. Document-oriented or
  multi-page Typst output is outside this renderer's scope.
- Check that fonts used by the source are installed in the build environment.

For automatic graph layout and browser-rendered charts, return to
[Diagrams and Charts](diagrams.md). For finished SVG and bitmap assets, see
[Images](images.md).
