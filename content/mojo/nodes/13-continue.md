---
title: Skip an iteration
icon: 🧪
branch: flow
requires:
  - for
  - if
summary: continue skips the rest of the current iteration.
---

continue skips the rest of the current iteration. Here it filters even values so only odd values are printed.

```mojo
def main() raises:
    for value in range(5):
        if value % 2 == 0:
            continue
        print(value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about skip an iteration.
lang: mojo
code: |-
  def main() raises:
      for value in range(5):
          if value % 2 != 0:
              continue
          print(value)
checks:
  - match: value\s+%\s+2\s+==\s+0
    message: Use value % 2 == 0 for this step.
  - notMatch: value\s+%\s+2\s+!=\s+0
    message: Replace value % 2 != 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `continue` do inside the odd-number filtering example?
options:
  - Restarts the loop at its first value.
  - Skips the remaining work for the current iteration.
  - Exits the loop permanently.
answer: 1
explain: The loop advances to its next iteration without executing the skipped body statements.
```
