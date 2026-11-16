---
title: "Tuples"
icon: "📍"
branch: "collections"
requires: ["lists", "functions"]
summary: "Fixed sequences, multiple return values, and the singleton comma."
---

A [[tuple]] groups values in a fixed sequence. Commas create it; parentheses usually make the grouping clearer:

```python
point = (3, 4)
x, y = point
print(x + y)  # 7

single = (42,)
not_a_tuple = (42)
```

The comma in `(42,)` is essential. Without it, parentheses only group the integer expression.

Tuple elements cannot be replaced, appended, or removed. However, a tuple can contain a mutable object such as a list; that object's contents can still change. Immutable outer structure does not mean every nested object is immutable.

## Return related values

```python
def bounds(values):
    return min(values), max(values)

low, high = bounds([4, 2, 9])
print(low, high)  # 2 9
```

What looks like multiple return values is one tuple unpacked by the caller. Choose a tuple for a small group of related values. If callers struggle to remember what each position means, consider a [dataclass](node:dataclasses) with named fields.

Unpacking normally requires exactly as many values as names. [Starred unpacking](node:unpacking) can collect the remainder.

```exercise
goal: "Make coordinates a one-element tuple rather than an integer."
lang: python
code: |
  coordinates = (42)
  print(coordinates)
checks:
  - match: "coordinates\\s*=\\s*\\(\\s*42\\s*,\\s*\\)"
    message: "Add a comma after 42."
hint: "Add a comma after 42."
```

```quiz
question: Which expression creates a one-element tuple?
options:
  - "`(42)`"
  - "`(42,)`"
  - "`[42]`"
answer: 1
explain: The trailing comma makes it a tuple; parentheses alone do not.
```
