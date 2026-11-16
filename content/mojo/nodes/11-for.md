---
title: Ranges and iteration
icon: 🛠️
branch: flow
requires:
  - while
summary: range excludes its stop value.
---

range excludes its stop value. This loop sums 1 through 5 without creating a list of all those integers.

```mojo
def main() raises:
    var total = 0
    for value in range(1, 6):
        total += value
    print(total)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about ranges and iteration.
lang: mojo
code: |-
  def main() raises:
      var total = 0
      for value in range(1, 5):
          total += value
      print(total)
checks:
  - match: range\(1,\s+6\)
    message: Use range(1, 6) for this step.
  - notMatch: range\(1,\s+5\)
    message: Replace range(1, 5) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about ranges and iteration is correct?
options:
  - range includes its stop argument.
  - range always allocates a List of every integer.
  - range excludes its stop value. This loop sums 1 through 5 without creating a list of all those
    integers.
answer: 2
explain: range excludes its stop value. This loop sums 1 through 5 without creating a list of all
  those integers.
```
