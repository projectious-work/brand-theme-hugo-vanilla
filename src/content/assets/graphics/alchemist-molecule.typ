#import "@preview/alchemist:0.2.0": *

#set page(width: 95mm, height: auto, margin: 8mm)

#skeletize({
  fragment("C")
  single()
  fragment("C")
  branch({
    single(angle: 1)
    fragment("O")
  })
  single()
  fragment("C")
})
