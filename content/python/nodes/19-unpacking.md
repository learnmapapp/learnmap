---
title: "Unpacking"
icon: "🎁"
branch: "collections"
requires: ["tuples", "dictionaries"]
summary: "Bind related values, collect a remainder, and expand call arguments."
---
Unpacking means assigning a whole sequence to several names in one go. Here are five tricks, from everyday to fancy.

**Trick 1: name the parts.**

```python
point = (3, 7)
x, y = point
```

The number of names must match the number of items. Otherwise you get `ValueError: too many values to unpack`.

**Trick 2: the swap.** No temporary variable needed:

```python
a, b = 1, 2
a, b = b, a      # now a is 2 and b is 1
```

The right side is built into a tuple first, then unpacked into the left side.

**Trick 3: catch the rest with a star.** One name can take a `*`, which collects everything the others didn't:

```python
first, *rest = [1, 2, 3, 4]       # first = 1, rest = [2, 3, 4]
*init, last = [1, 2, 3, 4]        # init = [1, 2, 3], last = 4
head, *_, tail = "a,b,c,d".split(",")
```

**Trick 4: ignore what you don't need.** By convention `_` means "I don't care about this one":

```python
name, _, city = ("Ada", 36, "London")
```

**Trick 5: spread into calls and literals.** A star in front of a list spreads it into separate arguments. Two stars spread a dictionary:

```python
numbers = [3, 1, 2]
print(*numbers)                    # print(3, 1, 2) shows: 3 1 2

defaults = {"theme": "dark", "size": 12}
settings = {**defaults, "size": 14}  # merge, the last one wins
```

Unpacking also works in `for` loops, which is what makes `for key, value in d.items()` work.

```compare javascript
const [first, ...rest] = [1, 2, 3, 4];
const settings = { ...defaults, size: 14 };
```

```compare kotlin
val (x, y) = point    // destructuring via componentN()
```

```exercise
goal: "This crashes: two names, three values. Make `rest` collect every item after the first."
lang: python
code: |
  first, rest = [1, 2, 3]
  print(first, rest)
checks:
  - match: '^first\s*,\s*\*rest\s*='
    message: "Put a star before rest: first, *rest = ..."
hint: A starred name catches whatever is left over.
solution: |
  first, *rest = [1, 2, 3]
  print(first, rest)
```

```quiz
question: "After `a, *b, c = [1, 2, 3, 4, 5]`, what is `b`?"
options:
  - "`2`"
  - "`[2, 3, 4]`"
  - "`(2, 3, 4)`"
answer: 1
explain: a takes the first item, c takes the last, and the starred b collects the middle as a list.
```
