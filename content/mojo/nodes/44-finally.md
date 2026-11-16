---
title: Always-run cleanup
icon: 🔧
branch: tools
requires:
  - handling
summary: finally runs when control leaves the protected block.
---

finally runs when control leaves the protected block. Use it for cleanup that must happen on both success and failure.

```mojo
def main() raises:
    try:
        print("work")
    finally:
        print("cleanup")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about always-run cleanup.
lang: mojo
code: |-
  def main() raises:
      try:
          print("work")
      finally:
          print("later")
checks:
  - match: print\("cleanup"\)
    message: Use print("cleanup") for this step.
  - notMatch: print\("later"\)
    message: Replace print("later") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which exits trigger the `finally` block?
options:
  - Only successful exits.
  - Only exits caused by errors.
  - Both successful and error exits from the protected work.
answer: 2
explain: Finally keeps cleanup independent of the operation's outcome.
```
