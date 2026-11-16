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
question: Which statement about default parameters is correct?
options:
  - A default parameter lets a caller omit that argument. Explicitly supplied values still override
    the default.
  - Default parameters cannot be overridden.
  - Default values must be written at every call.
answer: 0
explain: A default parameter lets a caller omit that argument. Explicitly supplied values still
  override the default.
```
