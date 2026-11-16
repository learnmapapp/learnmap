---
title: Fold a collection
icon: 🧪
branch: functions
requires:
  - map-filter
summary: reduce combines elements into an accumulator starting from an explicit initial value.
---

reduce combines elements into an accumulator starting from an explicit initial value. Empty input returns that initial value.

```swift
let values = [2, 4, 6]
let total = values.reduce(0) { partial, value in partial + value }
print(total)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about fold a collection.
lang: swift
code: |-
  let values = [2, 4, 6]
  let total = values.reduce(0) { partial, value in partial - value }
  print(total)
checks:
  - match: partial\s+\+\s+value
    message: Use partial + value for this step.
  - notMatch: partial\s+\-\s+value
    message: Replace partial - value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does an empty integer array return from `reduce(0, +)`?
options:
  - A bounds-check failure.
  - "`0`"
  - "`nil`"
answer: 1
explain: With no elements, reduce returns its initial accumulator.
```
