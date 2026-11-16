---
title: Boolean conditions
icon: 🚦
branch: basics
requires:
  - types
summary: Logical operators combine Bool values.
---

Logical operators combine `Bool` values. Swift does not treat integers or strings as implicit truth values.

```swift
let signedIn = true
let blocked = false
print(signedIn && !blocked)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about boolean conditions.
lang: swift
code: |-
  let signedIn = true
  let blocked = false
  print(signedIn || blocked)
checks:
  - match: signedIn\s+\&\&\s+!blocked
    message: Use signedIn && !blocked for this step.
  - notMatch: signedIn\s+\|\|\s+blocked
    message: Replace signedIn || blocked in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which value can be used directly as a Swift `if` condition?
options:
  - Any nonzero `Int`.
  - Any nonempty `String`.
  - A `Bool`.
answer: 2
explain: Swift requires a Boolean condition rather than implicit truthiness.
```
