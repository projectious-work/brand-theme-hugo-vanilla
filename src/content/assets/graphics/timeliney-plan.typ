#import "@preview/timeliney:0.4.0"

#set page(width: 125mm, height: auto, margin: 6mm)

#timeliney.timeline(show-grid: true, {
  import timeliney: *
  headerline(group(([Week 1], 1), ([Week 2], 1), ([Week 3], 1)))
  taskgroup(title: [Delivery], {
    task("Design", (from: 0, to: 1))
    task("Build", (from: 1, to: 2))
    task("Release", (from: 2, to: 3))
  })
})
