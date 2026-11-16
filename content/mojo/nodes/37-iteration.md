---
title: Process a list
icon: 🧪
branch: data
requires:
  - lists
  - for
summary: A for loop visits list elements in order.
---

A for loop visits list elements in order. Accumulation expresses a reduction without creating intermediate collections.

```mojo
def main() raises:
    var values: List[Int] = [2, 4, 6]
    var total = 0
    for value in values:
        total += value
    print(total)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about process a list.
lang: mojo
code: |-
  def main() raises:
      var values: List[Int] = [2, 4, 6]
      var total = 0
      for value in values:
          total -= value
      print(total)
checks:
  - match: total\s+\+=\s+value
    message: Use total += value for this step.
  - notMatch: total\s+\-=\s+value
    message: Replace total -= value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about process a list is correct?
options:
  - Every loop iteration copies the entire list.
  - A for loop visits list elements in order. Accumulation expresses a reduction without creating
    intermediate collections.
  - A list loop always visits elements in random order.
answer: 1
explain: A for loop visits list elements in order. Accumulation expresses a reduction without
  creating intermediate collections.
```
