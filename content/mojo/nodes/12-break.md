---
title: Stop a loop
icon: 🌐
branch: flow
requires:
  - for
  - if
summary: break exits the nearest loop.
---

break exits the nearest loop. Place it before or after work according to whether the terminating value should be processed.

```mojo
def main() raises:
    for value in range(10):
        if value == 3:
            break
        print(value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about stop a loop.
lang: mojo
code: |-
  def main() raises:
      for value in range(10):
          if value == 5:
              break
          print(value)
checks:
  - match: value\s+==\s+3
    message: Use value == 3 for this step.
  - notMatch: value\s+==\s+5
    message: Replace value == 5 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which loop does `break` exit?
options:
  - The nearest enclosing loop.
  - Every loop in the call stack.
  - The entire program.
answer: 0
explain: Execution continues after that loop.
```
