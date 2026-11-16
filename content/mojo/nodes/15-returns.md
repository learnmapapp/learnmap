---
title: Return paths
icon: 🔢
branch: functions
requires:
  - functions
  - if
summary: Every normal path through a value-returning function must produce a compatible result.
---

Every normal path through a value-returning function must produce a compatible result. An early return can handle one branch cleanly.

```mojo
def absolute(value: Int) -> Int:
    if value < 0:
        return -value
    return value

def main() raises:
    print(absolute(-4))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about return paths.
lang: mojo
code: |-
  def absolute(value: Int) -> Int:
      if value < 0:
          return value
      return value

  def main() raises:
      print(absolute(-4))
checks:
  - match: |-
      return\s+\-value\
      \s+\s+\s+\s+return\s+value
    message: |-
      Use return -value
          return value for this step.
  - notMatch: |-
      return\s+value\
      \s+\s+\s+\s+return\s+value
    message: |-
      Replace return value
          return value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why does the absolute-value function return from both its negative and nonnegative paths?
options:
  - Each normal path must supply an integer result.
  - A missing return automatically supplies zero.
  - Returning from one branch also returns from every other branch.
answer: 0
explain: All successful paths must uphold the declared result contract.
```
