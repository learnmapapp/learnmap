---
title: Integer arithmetic
icon: 🚦
branch: basics
requires:
  - types
summary: div computes an integer quotient and mod the remainder.
---

div computes an integer quotient and mod the remainder. Integer division truncates toward zero.

```nim
let total = 17
echo total div 5, " ", total mod 5
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about integer arithmetic.
lang: nim
code: |-
  let total = 17
  echo total div 3, " ", total mod 5
checks:
  - match: total\s+div\s+5
    message: Use total div 5 for this step.
  - notMatch: total\s+div\s+3
    message: Replace total div 3 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What are `17 div 5` and `17 mod 5`?
options:
  - "`3.4` and `0`."
  - "`2` and `3`."
  - "`3` and `2`."
answer: 2
explain: "`div` returns the integer quotient; `mod` returns the remainder."
```
