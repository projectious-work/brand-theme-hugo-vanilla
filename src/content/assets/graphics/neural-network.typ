#import "@preview/cetz:0.5.2"
#set page(width: auto, height: auto, margin: .35cm)

#cetz.canvas(length: 1cm, {
  import cetz.draw: *
  let input = rgb("#d8efdf")
  let hidden = rgb("#dce8f7")
  let output = rgb("#f8ded8")
  let edge = rgb("#8193a8")
  let ink = rgb("#263f5b")
  let y(count, index) = (count - 1) / 2 - index

  // Connections are drawn first so the nodes remain visually dominant.
  for i in range(4) {
    for j in range(5) {
      line((0, y(4, i)), (2.2, y(5, j)),
        stroke: (paint: edge, thickness: .35pt))
    }
  }
  for i in range(5) {
    for j in range(5) {
      line((2.2, y(5, i)), (4.4, y(5, j)),
        stroke: (paint: edge, thickness: .35pt))
    }
  }
  for i in range(5) {
    for j in range(3) {
      line((4.4, y(5, i)), (6.6, y(3, j)),
        stroke: (paint: edge, thickness: .35pt))
    }
  }

  for (x, count, fill, symbol) in (
    (0, 4, input, $x$),
    (2.2, 5, hidden, $h$),
    (4.4, 5, hidden, $h$),
    (6.6, 3, output, $y$),
  ) {
    for i in range(count) {
      circle((x, y(count, i)), radius: .32, fill: fill,
        stroke: (paint: ink, thickness: .8pt))
      content((x, y(count, i)), $ #symbol _#(i + 1) $)
    }
  }

  content((0, 2.65), text(fill: ink, weight: "bold")[Input])
  content((3.3, 3.15), text(fill: ink, weight: "bold")[Hidden layers])
  content((6.6, 2.15), text(fill: ink, weight: "bold")[Output])
})
