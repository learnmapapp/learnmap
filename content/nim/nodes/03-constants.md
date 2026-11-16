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
question: When must a Nim `const` initializer be evaluated?
options:
  - During compilation.
  - At the first loop iteration.
  - After the program exits.
answer: 0
explain: A `const` value must be available at compile time.
```
