---
title: Code templates
icon: 🏷️
branch: design
requires:
  - procedures
summary: A template expands code at the call site.
---

A template expands code at the call site. Repeating an expression also repeats its effects, so expansion semantics matter.

```nim
template twice(body: untyped) =
  body
  body
var count = 0
twice:
  inc count
echo count
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about code templates.
lang: nim
code: |-
  template twice(body: untyped) =
    body
    body
  var count = 0
  twice:
    dec count
  echo count
checks:
  - match: inc\s+count
    message: Use inc count for this step.
  - notMatch: dec\s+count
    message: Replace dec count in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about code templates is correct?
options:
  - Templates always evaluate their input exactly once.
  - untyped requires a string argument.
  - A template expands code at the call site. Repeating an expression also repeats its effects, so
    expansion semantics matter.
answer: 2
explain: A template expands code at the call site. Repeating an expression also repeats its effects,
  so expansion semantics matter.
```
