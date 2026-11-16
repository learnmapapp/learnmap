---
title: Named arguments
icon: 🚦
branch: functions
requires:
  - defaults
summary: Named arguments make the role of each input clear, particularly when types match.
---

Named arguments make the role of each input clear, particularly when types match. Match names to the declaration.

```mojo
def subtract(left: Int, right: Int) -> Int:
    return left - right

def main() raises:
    print(subtract(right=2, left=9))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about named arguments.
lang: mojo
code: |-
  def subtract(left: Int, right: Int) -> Int:
      return left - right

  def main() raises:
      print(subtract(right=9, left=2))
checks:
  - match: right=2,\s+left=9
    message: Use right=2, left=9 for this step.
  - notMatch: right=9,\s+left=2
    message: Replace right=9, left=2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about named arguments is correct?
options:
  - Named argument order always changes subtraction semantics.
  - Named arguments must have string values.
  - Named arguments make the role of each input clear, particularly when types match. Match names to
    the declaration.
answer: 2
explain: Named arguments make the role of each input clear, particularly when types match. Match
  names to the declaration.
```
