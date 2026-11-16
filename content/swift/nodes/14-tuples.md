---
title: Tuple results
icon: 🏷️
branch: functions
requires:
  - functions
summary: A tuple groups a fixed collection of values and can name its elements.
---

A tuple groups a fixed collection of values and can name its elements. It is useful for small related return values.

```swift
func bounds() -> (low: Int, high: Int) {
  (2, 8)
}
let result = bounds()
print(result.low, result.high)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about tuple results.
lang: swift
code: |-
  func bounds() -> (low: Int, high: Int) {
    (8, 2)
  }
  let result = bounds()
  print(result.low, result.high)
checks:
  - match: \(2,\s+8\)
    message: Use (2, 8) for this step.
  - notMatch: \(8,\s+2\)
    message: Replace (8, 2) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about tuple results is correct?
options:
  - Every tuple element must have the same type.
  - Tuple element names create a new class.
  - A tuple groups a fixed collection of values and can name its elements. It is useful for small
    related return values.
answer: 2
explain: A tuple groups a fixed collection of values and can name its elements. It is useful for
  small related return values.
```
