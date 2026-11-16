---
title: String interpolation
icon: 🧩
branch: tools
requires:
  - strings
summary: std/strformat provides fmt strings with expressions in braces.
---

std/strformat provides fmt strings with expressions in braces. Use explicit formatting when presentation precision matters.

```nim
import std/strformat
let name = "Ada"
let count = 3
echo fmt"{name} completed {count} lessons"
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about string interpolation.
lang: nim
code: |-
  import std/strformat
  let name = "Ada"
  let count = 3
  echo fmt"{name} completed {count + 1} lessons"
checks:
  - match: \{count\}\s+lessons
    message: Use {count} lessons for this step.
  - notMatch: \{count\s+\+\s+1\}\s+lessons
    message: Replace {count + 1} lessons in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `fmt"{name} completed {count} lessons"` produce?
options:
  - Text with the expressions interpolated.
  - A JSON object with two fields.
  - A mutation of the original variables.
answer: 0
explain: "`fmt` constructs formatted text from the supplied expressions."
```
