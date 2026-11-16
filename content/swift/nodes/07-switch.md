---
title: Exhaustive switch
icon: 📋
branch: flow
requires:
  - if
summary: Swift switch statements must cover all possible values.
---

Swift switch statements must cover all possible values. Cases do not fall through automatically.

```swift
let command = "list"
switch command {
case "list": print("Tasks")
case "add": print("New task")
default: print("Unknown command")
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about exhaustive switch.
lang: swift
code: |-
  let command = "list"
  switch command {
  case "show": print("Tasks")
  case "add": print("New task")
  default: print("Unknown command")
  }
checks:
  - match: 'case\s+"list":'
    message: 'Use case "list": for this step.'
  - notMatch: 'case\s+"show":'
    message: 'Replace case "show": in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: After a matching Swift `switch` case completes normally, what happens?
options:
  - The case repeats until `break` is added.
  - Execution continues after the switch.
  - The next case executes automatically.
answer: 1
explain: Swift cases do not implicitly fall through.
```
