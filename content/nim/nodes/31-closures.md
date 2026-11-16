---
title: Captured functions
icon: 📋
branch: design
requires:
  - procedures
  - bindings
summary: A closure can retain local state after the creating procedure returns.
---

A closure can retain local state after the creating procedure returns. Each makeCounter invocation creates separate state.

```nim
proc makeCounter(): proc(): int =
  var value = 0
  result = proc(): int =
    inc value
    value
let next = makeCounter()
echo next(), " ", next()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about captured functions.
lang: nim
code: |-
  proc makeCounter(): proc(): int =
    var value = 0
    result = proc(): int =
      dec value
      value
  let next = makeCounter()
  echo next(), " ", next()
checks:
  - match: inc\s+value
    message: Use inc value for this step.
  - notMatch: dec\s+value
    message: Replace dec value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What happens to the local counter captured by the returned closure?
options:
  - It becomes a shared global for every factory invocation.
  - It persists for that closure's later calls.
  - It is reset every time the closure is called.
answer: 1
explain: Each factory invocation creates its own captured state.
```
