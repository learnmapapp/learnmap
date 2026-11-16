---
title: Types and conversions
icon: 🔢
branch: basics
requires:
  - bindings
summary: Swift checks types at compile time and uses explicit numeric conversions.
---

Swift checks types at compile time and uses explicit numeric conversions. An `Int` and a Double do not combine through arbitrary implicit conversion.

```swift
let count: Int = 4
let ratio: Double = 1.5
print(Double(count) * ratio)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about types and conversions.
lang: swift
code: |-
  let count: Int = 4
  let ratio: Double = 1.5
  print(Double(count) + ratio)
checks:
  - match: Double\(count\)\s+\*\s+ratio
    message: Use Double(count) * ratio for this step.
  - notMatch: Double\(count\)\s+\+\s+ratio
    message: Replace Double(count) + ratio in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How can you multiply an `Int` count by a `Double` ratio explicitly?
options:
  - "`Double(count) * ratio`"
  - "`String(count) * ratio`"
  - "`count * Int.self`"
answer: 0
explain: Convert the integer to the numeric type expected by the operation.
```
