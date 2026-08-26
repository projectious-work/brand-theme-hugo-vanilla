#import "@preview/circuiteria:0.2.1"

#set page(width: 110mm, height: auto, margin: 8mm)

#circuiteria.circuit({
  import circuiteria: *
  element.block(x: 0, y: 0, w: 2.4, h: 1.2, name: [Sensor], id: "sensor")
  element.block(x: 4, y: 0, w: 2.4, h: 1.2, name: [Controller], id: "control")
  wire.wire("signal", ("sensor.east", "control.west"), directed: true)
})
