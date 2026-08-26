#import "@preview/primaviz:0.9.1": bar-chart

#set page(width: 120mm, height: auto, margin: 6mm)

#bar-chart(
  (labels: ("Plan", "Build", "Ship"), values: (18, 31, 46)),
  width: 105mm,
  height: 55mm,
  title: "Projects by phase",
)
