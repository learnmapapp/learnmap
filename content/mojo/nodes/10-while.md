---
title: While loops
icon: 📦
branch: flow
requires:
  - if
  - variables
summary: while checks its condition before each iteration.
---

while checks its condition before each iteration. Update the controlling state so the loop can finish.

```mojo
def main() raises:
    var remaining = 3
    while remaining > 0:
        print(remaining)
        remaining -= 1
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about while loops.
lang: mojo
code: |-
  def main() raises:
      var remaining = 3
      while remaining > 1:
          print(remaining)
          remaining -= 1
checks:
  - match: remaining\s+>\s+0
    message: Use remaining > 0 for this step.
  - notMatch: remaining\s+>\s+1
    message: Replace remaining > 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What happens when a `while` condition is initially `false`?
options:
  - The body runs until a separate `break`.
  - The body is not executed.
  - The body executes once before checking.
answer: 1
explain: "`while` checks its condition before entering the body."
```
