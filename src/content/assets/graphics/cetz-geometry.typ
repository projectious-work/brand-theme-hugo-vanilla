#import "@preview/cetz:0.5.2"
#import cetz.draw: *

#set page(width: 80mm, height: auto, margin: 8mm)

#cetz.canvas({
  circle((0, 0), radius: 1.4, stroke: 1pt + blue)
  line((-1.4, 0), (1.4, 0), stroke: gray)
  line((0, -1.4), (0, 1.4), stroke: gray)
  line((0, 0), (1.05, 0.92), stroke: 1.2pt + red, mark: (end: ">"))
  content((0.5, 0.6), [$r$], anchor: "south-east")
})
