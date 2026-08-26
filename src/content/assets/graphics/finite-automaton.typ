#import "@preview/finite:0.5.1": automaton

#set page(width: 95mm, height: auto, margin: 8mm)

#automaton(
  (
    idle: (active: "start"),
    active: (idle: "stop", active: "work"),
  ),
  initial: "idle",
  final: ("active",),
)
