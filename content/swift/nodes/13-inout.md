---
title: Mutating arguments
icon: 🧪
branch: functions
requires:
  - functions
  - bindings
summary: inout allows a function to update a caller’s variable.
---

`inout` allows a function to update a caller’s variable. The & at the call site makes that mutation visible.

```swift
func advance(_ value: inout Int) {
  value += 1
}
var count = 2
advance(&count)
print(count)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about mutating arguments.
lang: swift
code: |-
  func advance(_ value: inout Int) {
    value += 1
  }
  var count = 2
  advance(count)
  print(count)
checks:
  - match: advance\(\&count\)
    message: Use advance(&count) for this step.
  - notMatch: advance\(count\)
    message: Replace advance(count) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How do you pass mutable `count` to a parameter declared `inout Int`?
options:
  - "`advance(inout: count)`"
  - "`advance(&count)`"
  - "`advance(count)`"
answer: 1
explain: The ampersand makes the call's mutable access explicit.
```
