---
title: String operations
icon: 🔁
branch: basics
requires:
  - constants
summary: Import strutils for operations such as strip and toUpperAscii.
---

Import strutils for operations such as strip and toUpperAscii. ASCII case conversion is not full Unicode case folding.

```nim
import std/strutils
let name = "  Ada  ".strip()
echo name.toUpperAscii()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about string operations.
lang: nim
code: |-
  import std/strutils
  let name = "  Ada  ".strip()
  echo name.toLowerAscii()
checks:
  - match: name\.toUpperAscii\(\)
    message: Use name.toUpperAscii() for this step.
  - notMatch: name\.toLowerAscii\(\)
    message: Replace name.toLowerAscii() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which import provides `strip` and `toUpperAscii`?
options:
  - "`import std/strutils`"
  - "`import std/json`"
  - "`import std/tables`"
answer: 0
explain: "`strutils` contains these string manipulation helpers."
```
