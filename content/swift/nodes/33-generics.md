---
title: Generic functions
icon: 🧩
branch: types
requires:
  - functions
  - protocols
summary: A generic type parameter preserves the input type in the result.
---

A generic type parameter preserves the input type in the result. The same function can duplicate strings, integers, or custom values.

```swift
func duplicate<T>(_ value: T) -> [T] {
  [value, value]
}
print(duplicate("Swift"))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about generic functions.
lang: swift
code: |-
  func duplicate<T>(_ value: T) -> [T] {
    [value]
  }
  print(duplicate("Swift"))
checks:
  - match: \[value,\s+value\]
    message: Use [value, value] for this step.
  - notMatch: \[value\]
    message: Replace [value] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about generic functions is correct?
options:
  - A generic type parameter preserves the input type in the result. The same function can duplicate
    strings, integers, or custom values.
  - T loses all static type information.
  - A generic function must return Any.
answer: 0
explain: A generic type parameter preserves the input type in the result. The same function can
  duplicate strings, integers, or custom values.
```
