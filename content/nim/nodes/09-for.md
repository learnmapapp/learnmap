---
title: Ranges and loops
icon: 🧩
branch: flow
requires:
  - arithmetic
summary: The .
---

The .. range includes both ends; ..< excludes the upper bound. Pick the form that matches your indexing contract.

```nim
var total = 0
for n in 1..5:
  total += n
echo total
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about ranges and loops.
lang: nim
code: |-
  var total = 0
  for n in 1..3:
    total += n
  echo total
checks:
  - match: 1\.\.5
    message: Use 1..5 for this step.
  - notMatch: 1\.\.3
    message: Replace 1..3 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about ranges and loops is correct?
options:
  - The .. range includes both ends; ..< excludes the upper bound. Pick the form that matches your
    indexing contract.
  - ..< includes the upper bound.
  - .. always excludes the lower bound.
answer: 0
explain: The .. range includes both ends; ..< excludes the upper bound. Pick the form that matches
  your indexing contract.
```
