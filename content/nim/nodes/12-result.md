---
title: Implicit result
icon: 🌐
branch: functions
requires:
  - procedures
summary: A value-returning procedure has a result variable.
---

A value-returning procedure has a result variable. Assigning it sets the return value; explicit return is also available.

```nim
proc double(n: int): int =
  result = n * 2
echo double(4)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about implicit result.
lang: nim
code: |-
  proc double(n: int): int =
    result = n + 2
  echo double(4)
checks:
  - match: result\s+=\s+n\s+\*\s+2
    message: Use result = n * 2 for this step.
  - notMatch: result\s+=\s+n\s+\+\s+2
    message: Replace result = n + 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does assigning to `result` inside a value-returning procedure do?
options:
  - Sets the procedure's eventual return value.
  - Immediately exits the procedure.
  - Changes a global shared by all procedures.
answer: 0
explain: "`result` is an implicit local result variable, not an early-return statement."
```
