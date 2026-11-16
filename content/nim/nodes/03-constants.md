---
title: Compile-time constants
icon: 🔢
branch: basics
requires:
  - bindings
summary: const expressions are evaluated at compile time.
---

const expressions are evaluated at compile time. The $ operator converts a value to a string for concatenation with &.

```nim
const retries = 3
let message = "retries: " & $retries
echo message
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time constants.
lang: nim
code: |-
  const retries = 1
  let message = "retries: " & $retries
  echo message
checks:
  - match: const\s+retries\s+=\s+3
    message: Use const retries = 3 for this step.
  - notMatch: const\s+retries\s+=\s+1
    message: Replace const retries = 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about compile-time constants is correct?
options:
  - const expressions are evaluated at compile time. The $ operator converts a value to a string for
    concatenation with &.
  - const expressions are always evaluated at every use at runtime.
  - The & operator performs integer addition.
answer: 0
explain: const expressions are evaluated at compile time. The $ operator converts a value to a
  string for concatenation with &.
```
