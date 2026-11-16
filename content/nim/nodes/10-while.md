---
title: Conditional loops
icon: 📦
branch: flow
requires:
  - if
  - bindings
summary: while repeats while a Boolean condition holds.
---

while repeats while a Boolean condition holds. dec mutates a numeric variable by one unless a step is supplied.

```nim
var remaining = 3
while remaining > 0:
  echo remaining
  dec remaining
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about conditional loops.
lang: nim
code: |-
  var remaining = 3
  while remaining > 1:
    echo remaining
    dec remaining
checks:
  - match: remaining\s+>\s+0
    message: Use remaining > 0 for this step.
  - notMatch: remaining\s+>\s+1
    message: Replace remaining > 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about conditional loops is correct?
options:
  - while always runs at least once.
  - while repeats while a Boolean condition holds. dec mutates a numeric variable by one unless a
    step is supplied.
  - dec returns a fresh variable without changing its input.
answer: 1
explain: while repeats while a Boolean condition holds. dec mutates a numeric variable by one unless
  a step is supplied.
```
