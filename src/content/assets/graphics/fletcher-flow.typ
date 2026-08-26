#import "@preview/fletcher:0.5.8" as fletcher: diagram, node, edge

#set page(width: 105mm, height: auto, margin: 8mm)

#diagram(
  node((0, 0), [Source], radius: 5mm),
  edge("r", "-|>", [validate]),
  node((1, 0), [Transform], radius: 7mm),
  edge("r", "-|>", [publish]),
  node((2, 0), [Output], radius: 5mm),
)
