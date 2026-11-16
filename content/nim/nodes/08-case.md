---
title: Case selection
icon: 🔧
branch: flow
requires:
  - if
summary: case selects one matching branch.
---

case selects one matching branch. Use else when the listed alternatives do not exhaust the selector type.

```nim
let command = "list"
case command
of "list": echo "Showing tasks"
of "add": echo "Adding task"
else: echo "Unknown command"
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about case selection.
lang: nim
code: |-
  let command = "list"
  case command
  of "show": echo "Showing tasks"
  of "add": echo "Adding task"
  else: echo "Unknown command"
checks:
  - match: 'of\s+"list":'
    message: 'Use of "list": for this step.'
  - notMatch: 'of\s+"show":'
    message: 'Replace of "show": in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What happens after a matching Nim `case` branch finishes?
options:
  - Execution falls through into the next branch.
  - The matching branch repeats automatically.
  - Execution continues after the `case`.
answer: 2
explain: Nim cases do not have implicit fallthrough.
```
