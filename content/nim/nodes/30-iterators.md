---
title: Custom iterators
icon: 🔁
branch: design
requires:
  - for
  - procedures
summary: An iterator yields values to a for loop.
---

An iterator yields values to a for loop. This iterator centralizes traversal logic without constructing a sequence first.

```nim
iterator evens(limit: int): int =
  var n = 0
  while n <= limit:
    yield n
    n += 2
for value in evens(6): echo value
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about custom iterators.
lang: nim
code: |-
  iterator evens(limit: int): int =
    var n = 0
    while n <= limit:
      yield n
      n += 1
  for value in evens(6): echo value
checks:
  - match: n\s+\+=\s+2
    message: Use n += 2 for this step.
  - notMatch: n\s+\+=\s+1
    message: Replace n += 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `yield n` do in a Nim iterator?
options:
  - Supplies a value to the consuming loop.
  - Ends the iterator permanently.
  - Appends a value to an implicit sequence.
answer: 0
explain: An iterator yields incrementally without requiring a complete result collection.
```
