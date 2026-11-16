---
title: Sorting sequences
icon: 📦
branch: tools
requires:
  - sequences
  - procedures
summary: sort mutates a collection into its chosen order.
---

sort mutates a collection into its chosen order. Copy first if callers need to retain the original sequence.

```nim
import std/algorithm
var scores = @[7, 2, 5]
scores.sort()
echo scores
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about sorting sequences.
lang: nim
code: |-
  import std/algorithm
  var scores = @[7, 2, 5]
  scores.sort(Descending)
  echo scores
checks:
  - match: scores\.sort\(\)
    message: Use scores.sort() for this step.
  - notMatch: scores\.sort\(Descending\)
    message: Replace scores.sort(Descending) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about sorting sequences is correct?
options:
  - Sorting changes the element type.
  - sort mutates a collection into its chosen order. Copy first if callers need to retain the
    original sequence.
  - sort always returns a fresh collection.
answer: 1
explain: sort mutates a collection into its chosen order. Copy first if callers need to retain the
  original sequence.
```
