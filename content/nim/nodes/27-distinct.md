---
title: Distinct domain types
icon: 🔢
branch: data
requires:
  - types
summary: distinct creates a type separate from its underlying representation.
---

distinct creates a type separate from its underlying representation. Explicit conversions prevent accidental mixing of unrelated identifiers.

```nim
type UserId = distinct int
let user = UserId(42)
echo int(user)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about distinct domain types.
lang: nim
code: |-
  type UserId = distinct int
  let user = UserId(0)
  echo int(user)
checks:
  - match: UserId\(42\)
    message: Use UserId(42) for this step.
  - notMatch: UserId\(0\)
    message: Replace UserId(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why define `UserId = distinct int`?
options:
  - To require deliberate conversion between user IDs and unrelated integers.
  - To make user IDs interchangeable with every integer type.
  - To turn each integer into a string automatically.
answer: 0
explain: A distinct type creates a separate static domain type.
```
