---
title: Named tuples
icon: 🔧
branch: data
requires:
  - types
summary: Tuples group a fixed number of typed values and support destructuring.
---

Tuples group a fixed number of typed values and support destructuring. Named fields also allow point.x access.

```nim
let point = (x: 3, y: 4)
let (x, y) = point
echo x + y
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about named tuples.
lang: nim
code: |-
  let point = (x: 3, y: 4)
  let (x, y) = point
  echo x - y
checks:
  - match: echo\s+x\s+\+\s+y
    message: Use echo x + y for this step.
  - notMatch: echo\s+x\s+\-\s+y
    message: Replace echo x - y in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about named tuples is correct?
options:
  - Tuples must contain values of one type.
  - Destructuring reverses field order.
  - Tuples group a fixed number of typed values and support destructuring. Named fields also allow
    point.x access.
answer: 2
explain: Tuples group a fixed number of typed values and support destructuring. Named fields also
  allow point.x access.
```
