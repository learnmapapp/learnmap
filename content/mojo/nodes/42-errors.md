---
title: Raise an error
icon: 🔁
branch: tools
requires:
  - functions
  - if
summary: raises declares a fallible function.
---

raises declares a fallible function. Raise Error with a useful message when an input violates the function’s contract.

```mojo
def require_positive(value: Int) raises -> Int:
    if value <= 0:
        raise Error("positive value required")
    return value

def main() raises:
    print(require_positive(4))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about raise an error.
lang: mojo
code: |-
  def require_positive(value: Int) raises -> Int:
      if value <= 0:
          raise Error("positive value required")
      return 0

  def main() raises:
      print(require_positive(4))
checks:
  - match: return\s+value
    message: Use return value for this step.
  - notMatch: return\s+0
    message: Replace return 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `raises` in a function signature declare?
options:
  - The function may return through an error path.
  - Every call must always fail.
  - The result automatically becomes optional.
answer: 0
explain: Callers must handle or propagate a possible error.
```
