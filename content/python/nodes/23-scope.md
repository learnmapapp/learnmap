---
title: "Scope"
icon: "🔭"
branch: "functions"
requires: ["functions"]
summary: "Local names, enclosing functions, and explicit state."
---

A [[scope]] determines where a name is found. For a normal function, Python searches local names, enclosing function scopes, module globals, then built-ins. This is often called LEGB.

```python
factor = 2

def double(number):
    return number * factor

print(double(3))  # 6
```

Reading the global `factor` works. Assigning to `factor` inside the function would normally make it local throughout that function, even before the assignment executes. Reading that local before it has a value raises `UnboundLocalError`.

## Prefer parameters and results

Passing state explicitly makes a function easier to test:

```python
def scale(number, factor):
    return number * factor

print(scale(3, 2))  # 6
```

`global name` allows rebinding a module-level name. `nonlocal name` allows rebinding an existing name in an enclosing function. Those features have uses, but do not reach for them just to update a calculation.

A nested function can retain access to enclosing values after the outer function returns; that combination is a [[closure]]. Loop variables captured by closures are looked up when the closure runs, so take care when creating callbacks in a loop.

```exercise
goal: "Return the updated total instead of hiding it in a local variable."
lang: python
code: |
  def add(total, amount):
      total += amount

  print(add(10, 5))
checks:
  - match: "^\\s+return\\s+total\\s*$"
    message: "Add return total after the update."
hint: "Add return total after the update."
```

```quiz
question: "What does an assignment to a name inside a function normally make that name?"
options:
  - "Local to that function."
  - "Automatically global."
  - "A class attribute."
answer: 0
explain: "Assignment normally makes a name local unless declared global or nonlocal."
```
