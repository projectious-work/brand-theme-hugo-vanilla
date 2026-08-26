#import "@preview/genotypst:0.11.0": parse-newick, render-rectangular-tree

#set page(width: 120mm, height: auto, margin: 7mm)

#let tree = parse-newick(
  "(('API':0.2,'Worker':0.1)'Services':0.3,'Database':0.6)Platform;"
)

#render-rectangular-tree(
  tree,
  width: 100mm,
  height: 35mm,
  align-tip-labels: true,
)
