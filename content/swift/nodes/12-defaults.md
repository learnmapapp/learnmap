---
title: Default parameters
icon: 🌐
branch: functions
requires:
  - functions
summary: A default parameter lets a caller omit that argument.
---

A default parameter lets a caller omit that argument. Explicitly supplied values still override the default.

```swift
func add(_ value: Int, amount: Int = 1) -> Int {
  value + amount
}
print(add(4))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about default parameters.
lang: swift
code: |-
  func add(_ value: Int, amount: Int = 0) -> Int {
    value + amount
  }
  print(add(4))
checks:
  - match: amount:\s+Int\s+=\s+1
    message: "Use amount: Int = 1 for this step."
  - notMatch: amount:\s+Int\s+=\s+0
    message: "Replace amount: Int = 0 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "For `func add(_ value: Int, amount: Int = 1)`, what does `add(4)` use for `amount`?"
options:
  - "`1`"
  - "`0`"
  - The value from the previous call.
answer: 0
explain: An omitted argument uses the default declared in the signature.
```
