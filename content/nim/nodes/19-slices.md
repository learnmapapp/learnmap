---
title: Slices and indices
icon: 📋
branch: data
requires:
  - sequences
summary: Slices use range syntax, and ^1 addresses the last element.
---

Slices use range syntax, and ^1 addresses the last element. Check that the collection is nonempty before indexing from the end.

```nim
let values = @[2, 4, 6, 8]
echo values[1..2]
echo values[^1]
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about slices and indices.
lang: nim
code: |-
  let values = @[2, 4, 6, 8]
  echo values[0..1]
  echo values[^1]
checks:
  - match: values\[1\.\.2\]
    message: Use values[1..2] for this step.
  - notMatch: values\[0\.\.1\]
    message: Replace values[0..1] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about slices and indices is correct?
options:
  - Slices always exclude their last index.
  - Slices use range syntax, and ^1 addresses the last element. Check that the collection is
    nonempty before indexing from the end.
  - ^1 refers to the first element.
answer: 1
explain: Slices use range syntax, and ^1 addresses the last element. Check that the collection is
  nonempty before indexing from the end.
```
