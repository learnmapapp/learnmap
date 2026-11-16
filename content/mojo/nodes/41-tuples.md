---
title: Group fixed results
icon: 🚦
branch: data
requires:
  - functions
summary: A tuple groups a fixed number of values and supports index access.
---

A tuple groups a fixed number of values and supports index access. Prefer a named struct when field meaning is part of a public API.

```mojo
def main() raises:
    var point = (3, 4)
    print(point[0], point[1])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about group fixed results.
lang: mojo
code: |-
  def main() raises:
      var point = (3, 4)
      print(point[1], point[0])
checks:
  - match: point\[0\],\s+point\[1\]
    message: Use point[0], point[1] for this step.
  - notMatch: point\[1\],\s+point\[0\]
    message: Replace point[1], point[0] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: For `var point = (3, 4)`, what is `point[0]`?
options:
  - "`4`"
  - The whole tuple.
  - "`3`"
answer: 2
explain: Tuple index zero refers to its first element.
```
