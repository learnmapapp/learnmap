---
title: Mutable parameters
icon: 🏷️
branch: functions
requires:
  - procedures
  - bindings
summary: A var parameter allows a procedure to mutate the caller’s storage.
---

A var parameter allows a procedure to mutate the caller’s storage. The call must supply a suitable mutable value.

```nim
proc advance(value: var int) =
  inc value
var count = 2
advance(count)
echo count
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about mutable parameters.
lang: nim
code: |-
  proc advance(value: var int) =
    dec value
  var count = 2
  advance(count)
  echo count
checks:
  - match: inc\s+value
    message: Use inc value for this step.
  - notMatch: dec\s+value
    message: Replace dec value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about mutable parameters is correct?
options:
  - Every ordinary int parameter aliases mutable caller storage.
  - A var parameter can always receive a numeric literal.
  - A var parameter allows a procedure to mutate the caller’s storage. The call must supply a
    suitable mutable value.
answer: 2
explain: A var parameter allows a procedure to mutate the caller’s storage. The call must supply a
  suitable mutable value.
```
