---
title: Catch exceptions
icon: 🔧
branch: tools
requires:
  - procedures
  - strings
summary: Catch the specific exception a boundary operation can raise.
---

Catch the specific exception a boundary operation can raise. parseInt reports invalid numeric text with ValueError.

```nim
import std/strutils
try:
  echo parseInt("oops")
except ValueError as error:
  echo error.msg
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about catch exceptions.
lang: nim
code: |-
  import std/strutils
  try:
    echo parseInt("oops")
  except IOError as error:
    echo error.msg
checks:
  - match: except\s+ValueError
    message: Use except ValueError for this step.
  - notMatch: except\s+IOError
    message: Replace except IOError in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which exception should handle invalid text passed to `parseInt`?
options:
  - "`IOError`"
  - "`KeyError`"
  - "`ValueError`"
answer: 2
explain: Invalid numeric text is a conversion-value failure.
```
