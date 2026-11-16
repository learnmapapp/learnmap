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
question: Which statement about return paths is correct?
options:
  - Every normal path through a value-returning function must produce a compatible result. An early
    return can handle one branch cleanly.
  - Only the first branch needs a result.
  - A missing Int result is automatically filled with zero.
answer: 0
explain: Every normal path through a value-returning function must produce a compatible result. An
  early return can handle one branch cleanly.
```
