---
title: Remove an element
icon: 🏷️
branch: data
requires:
  - append
summary: pop removes and returns the final element by default.
---

pop removes and returns the final element by default. Ensure the list is nonempty before removing an item.

```mojo
def main() raises:
    var values: List[Int] = [2, 4, 6]
    var last = values.pop()
    print(last, len(values))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about remove an element.
lang: mojo
code: |-
  def main() raises:
      var values: List[Int] = [2, 4, 6]
      var last = values.pop(0)
      print(last, len(values))
checks:
  - match: values\.pop\(\)
    message: Use values.pop() for this step.
  - notMatch: values\.pop\(0\)
    message: Replace values.pop(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `pop()` do to `[2, 4, 6]`?
options:
  - Returns `2` and leaves `[4, 6]`.
  - Returns `6` without changing the list.
  - Returns `6` and leaves `[2, 4]`.
answer: 2
explain: With no index argument, pop removes the final element.
```
