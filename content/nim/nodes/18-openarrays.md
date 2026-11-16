---
title: Flexible array arguments
icon: 🔁
branch: data
requires:
  - procedures
  - arrays
  - sequences
summary: openArray parameters accept array and sequence inputs without forcing callers to use one
  concrete container type.
---

openArray parameters accept array and sequence inputs without forcing callers to use one concrete container type.

```nim
proc total(values: openArray[int]): int =
  for value in values:
    result += value
echo total([1, 2, 3])
echo total(@[4, 5])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about flexible array arguments.
lang: nim
code: |-
  proc total(values: openArray[int]): int =
    for value in values:
      result -= value
  echo total([1, 2, 3])
  echo total(@[4, 5])
checks:
  - match: result\s+\+=\s+value
    message: Use result += value for this step.
  - notMatch: result\s+\-=\s+value
    message: Replace result -= value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What can a parameter of type `openArray[int]` accept?
options:
  - Compatible integer arrays and sequences.
  - Only fixed arrays of exactly three integers.
  - Only a mutable `Table`.
answer: 0
explain: "`openArray` lets a procedure consume several compatible container forms."
```
