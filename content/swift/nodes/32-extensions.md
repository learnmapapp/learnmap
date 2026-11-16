---
title: Extend existing types
icon: 🔧
branch: types
requires:
  - protocols
summary: Extensions add computed properties, methods, and conformances.
---

Extensions add computed properties, methods, and conformances. They do not add stored instance properties to an existing type.

```swift
extension Int {
  var isEven: Bool { self % 2 == 0 }
}
print(4.isEven)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about extend existing types.
lang: swift
code: |-
  extension Int {
    var isEven: Bool { self % 2 == 1 }
  }
  print(4.isEven)
checks:
  - match: self\s+%\s+2\s+==\s+0
    message: Use self % 2 == 0 for this step.
  - notMatch: self\s+%\s+2\s+==\s+1
    message: Replace self % 2 == 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which addition is supported by an extension of `Int`?
options:
  - A new stored instance field.
  - A replacement set of built-in integer values.
  - A computed `isEven` property.
answer: 2
explain: Extensions can add behavior and computed properties without adding stored instance storage.
```
