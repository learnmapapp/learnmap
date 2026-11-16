---
title: Closure expressions
icon: 🛠️
branch: functions
requires:
  - functions
  - arrays
summary: A closure packages behavior as a value.
---

A closure packages behavior as a value. Trailing closure syntax keeps operations such as custom sorting concise.

```swift
let values = [3, 1, 2]
let sorted = values.sorted { left, right in left < right }
print(sorted)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about closure expressions.
lang: swift
code: |-
  let values = [3, 1, 2]
  let sorted = values.sorted { left, right in left > right }
  print(sorted)
checks:
  - match: left\s+<\s+right
    message: Use left < right for this step.
  - notMatch: left\s+>\s+right
    message: Replace left > right in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which sort closure orders integers from smallest to largest?
options:
  - "`{ left, right in left > right }`"
  - "`{ left, right in left <= right }`"
  - "`{ left, right in left < right }`"
answer: 2
explain: A sort predicate must describe a strict ordering.
```
