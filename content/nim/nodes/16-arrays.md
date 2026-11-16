---
title: Fixed arrays
icon: 💬
branch: data
requires:
  - types
  - for
summary: An array has its bounds and element type in its type.
---

An array has its bounds and element type in its type. This array uses indices 0 through 2.

```nim
var scores: array[3, int] = [2, 4, 6]
scores[0] = 8
echo scores
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about fixed arrays.
lang: nim
code: |-
  var scores: array[3, int] = [2, 4, 6]
  scores[1] = 8
  echo scores
checks:
  - match: scores\[0\]\s+=\s+8
    message: Use scores[0] = 8 for this step.
  - notMatch: scores\[1\]\s+=\s+8
    message: Replace scores[1] = 8 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about fixed arrays is correct?
options:
  - This array starts at index 1.
  - An array has its bounds and element type in its type. This array uses indices 0 through 2.
  - Arrays always grow when assigned beyond their bounds.
answer: 1
explain: An array has its bounds and element type in its type. This array uses indices 0 through 2.
```
