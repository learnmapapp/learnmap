---
title: Computed properties
icon: 🔁
branch: types
requires:
  - structs
summary: A computed property derives a result instead of storing a separate copy.
---

A computed property derives a result instead of storing a separate copy. This keeps dependent data consistent automatically.

```swift
struct Rectangle {
  let width: Double
  let height: Double
  var area: Double { width * height }
}
print(Rectangle(width: 3, height: 4).area)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about computed properties.
lang: swift
code: |-
  struct Rectangle {
    let width: Double
    let height: Double
    var area: Double { width + height }
  }
  print(Rectangle(width: 3, height: 4).area)
checks:
  - match: width\s+\*\s+height
    message: Use width * height for this step.
  - notMatch: width\s+\+\s+height
    message: Replace width + height in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about computed properties is correct?
options:
  - A computed property derives a result instead of storing a separate copy. This keeps dependent
    data consistent automatically.
  - Computed properties always store an independent cached field.
  - A computed property must have a setter.
answer: 0
explain: A computed property derives a result instead of storing a separate copy. This keeps
  dependent data consistent automatically.
```
