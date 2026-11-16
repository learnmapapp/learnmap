---
title: Conditional repetition
icon: 🧩
branch: flow
requires:
  - if
  - bindings
summary: while checks before each iteration.
---

while checks before each iteration. repeat-while checks afterward when at least one iteration is required.

```swift
var remaining = 3
while remaining > 0 {
  print(remaining)
  remaining -= 1
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about conditional repetition.
lang: swift
code: |-
  var remaining = 3
  while remaining > 1 {
    print(remaining)
    remaining -= 1
  }
checks:
  - match: remaining\s+>\s+0
    message: Use remaining > 0 for this step.
  - notMatch: remaining\s+>\s+1
    message: Replace remaining > 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What happens if a `while` condition is `false` before its first iteration?
options:
  - The body is skipped.
  - The body runs exactly once.
  - The body runs until an explicit `break`.
answer: 0
explain: "`while` checks its condition before executing the body."
```
