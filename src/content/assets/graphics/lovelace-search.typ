#import "@preview/lovelace:0.3.1": pseudocode-list

#set page(width: 105mm, height: auto, margin: 8mm)

#pseudocode-list[
  + *for each* item in data
    + *if* item matches query *then*
      + append item to results
    + *end*
  + *return* results
]
