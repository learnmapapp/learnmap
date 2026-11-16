---
title: Boolean expressions
icon: 🔁
branch: basics
requires:
  - variables
summary: Mojo spells Boolean constants True and False and combines conditions with and, or, and not.
---

Mojo spells Boolean constants `True` and `False` and combines conditions with and, or, and not.

```mojo
def main() raises:
    var ready = True
    var blocked = False
    print(ready and not blocked)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about boolean expressions.
lang: mojo
code: |-
  def main() raises:
      var ready = True
      var blocked = False
      print(ready and blocked)
checks:
  - match: ready\s+and\s+not\s+blocked
    message: Use ready and not blocked for this step.
  - notMatch: ready\s+and\s+blocked
    message: Replace ready and blocked in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which expression means “ready and not blocked” in Mojo?
options:
  - "`ready and not blocked`"
  - "`ready && !blocked`"
  - "`ready or blocked`"
answer: 0
explain: Mojo uses the word operators `and`, `or`, and `not`.
```
