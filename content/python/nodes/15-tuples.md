---
title: "Tuples"
icon: "📍"
branch: "collections"
requires: ["lists", "functions"]
summary: "Fixed sequences, multiple return values, and the singleton comma."
---
A tuple looks like a list with round brackets, but it's meant for something different. Compare:

```python
temperatures = [18, 21, 19, 24]      # list: more of the same thing
location = (52.37, 4.89)             # tuple: one thing, made of parts
```

A list is a **collection**: you might add a fifth temperature. A tuple is a **record**: a point always has a latitude and a longitude, and position 0 always means latitude. Tuples are also [[immutable]]; once made, they can't change.

```repl
> location = (52.37, 4.89)
> location[0]
52.37
> location[0] = 0
error: TypeError: 'tuple' object does not support item assignment
```

## Returning several values

Tuples are how Python functions return more than one thing. You don't even need the brackets:

```python
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([4, 9, 1, 7])
print(low, high)   # 1 9
```

The function returns one tuple, `(1, 9)`, and the assignment unpacks it into two names. [Unpacking](node:unpacking) has more tricks like this.

## The one-item gotcha

It's the **comma** that makes a tuple, not the brackets. Brackets are just grouping, like in maths:

```repl
> type((42))
<class 'int'>
> type((42,))
<class 'tuple'>
> type(42,)
<class 'int'>
```

The last one is a trap: inside a function call, the comma separates arguments, so `42` is passed on its own. So a one-item tuple is written `(42,)`, with both the comma and the brackets. It looks odd, and you'll rarely need it.

```tip
Since tuples can't change, they can be dictionary keys and set members, which lists can't. `{(0, 0): "origin"}` works; `{[0, 0]: "origin"}` doesn't.
```

```compare java
record Point(double lat, double lon) {}   // Java uses a named record
```

```compare go
func minMax(n []int) (int, int) { ... }   // multiple return values
lo, hi := minMax(nums)
```

```exercise
goal: "`coordinates` is just the number 42. Make it a tuple holding one item."
lang: python
code: |
  coordinates = (42)
  print(coordinates)
checks:
  - match: 'coordinates\s*=\s*\(\s*42\s*,\s*\)'
    message: "Add a comma after 42."
hint: The comma makes the tuple.
solution: |
  coordinates = (42,)
  print(coordinates)
```

```quiz
question: "Which is the best fit for a tuple rather than a list?"
options:
  - The lines of a file.
  - An RGB colour like (255, 128, 0).
  - A queue of jobs that grows over time.
answer: 1
explain: A colour has a fixed number of parts with fixed meanings. The others are collections that grow or shrink.
```
