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
question: Which statement about integer arithmetic is correct?
options:
  - div always returns a float.
  - mod returns the quotient.
  - div computes an integer quotient and mod the remainder. Integer division truncates toward zero.
answer: 2
explain: div computes an integer quotient and mod the remainder. Integer division truncates toward zero.
```
