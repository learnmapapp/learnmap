---
title: Explicit types
icon: 💬
branch: basics
requires:
  - bindings
summary: Type annotations document contracts; conversions such as float(count) make numeric intent
  explicit when combining distinct types.
---

Type annotations document contracts; conversions such as float(count) make numeric intent explicit when combining distinct types.

```nim
let count: int = 4
let ratio: float = 1.5
let ready: bool = true
echo float(count) * ratio, " ", ready
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about explicit types.
lang: nim
code: |-
  let count: int = 4
  let ratio: float = 1.5
  let ready: bool = true
  echo float(count) + ratio, " ", ready
checks:
  - match: float\(count\)\s+\*\s+ratio
    message: Use float(count) * ratio for this step.
  - notMatch: float\(count\)\s+\+\s+ratio
    message: Replace float(count) + ratio in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about explicit types is correct?
options:
  - A bool is a string type.
  - Type annotations document contracts; conversions such as float(count) make numeric intent
    explicit when combining distinct types.
  - Nim implicitly accepts every string as a number.
answer: 1
explain: Type annotations document contracts; conversions such as float(count) make numeric intent
  explicit when combining distinct types.
```
