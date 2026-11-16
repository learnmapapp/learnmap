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
question: What total results from adding every element of `[2, 4, 6]` to an initial zero?
options:
  - "`24`"
  - "`12`"
  - "`6`"
answer: 1
explain: The accumulator adds each visited element once.
```
