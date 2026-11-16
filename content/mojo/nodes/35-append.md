---
title: Append elements
icon: 🛠️
branch: data
requires:
  - lists
summary: append adds an element to a list and may grow its backing allocation.
---

append adds an element to a list and may grow its backing allocation. Avoid assuming references remain valid across growth.

```mojo
def main() raises:
    var values: List[Int] = [2, 4]
    values.append(6)
    print(len(values))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about append elements.
lang: mojo
code: |-
  def main() raises:
      var values: List[Int] = [2, 4]
      values.append(0)
      print(len(values))
checks:
  - match: values\.append\(6\)
    message: Use values.append(6) for this step.
  - notMatch: values\.append\(0\)
    message: Replace values.append(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about append elements is correct?
options:
  - append prepends by default.
  - A list’s allocation can never move.
  - append adds an element to a list and may grow its backing allocation. Avoid assuming references
    remain valid across growth.
answer: 2
explain: append adds an element to a list and may grow its backing allocation. Avoid assuming
  references remain valid across growth.
```
