---
title: "Comprehensions"
icon: "🧮"
branch: "collections"
requires: ["dictionaries", "sets", "conditionals"]
summary: "Transform and filter data in one readable expression."
---
You'll write this loop shape a hundred times: start with an empty list, loop, transform, append.

```python
prices = [12.0, 7.5, 30.0, 4.25]

with_tax = []
for p in prices:
    with_tax.append(p * 1.21)
```

A [[comprehension]] folds those four lines into one:

```python
with_tax = [p * 1.21 for p in prices]
```

Read it as: "**p times 1.21**, for each p in prices". The thing you want comes first, then where it comes from.

## Adding a filter

Put an `if` at the end to keep only some items:

```python
cheap = [p for p in prices if p < 10]            # [7.5, 4.25]
cheap_with_tax = [p * 1.21 for p in prices if p < 10]
```

The order is the same as in the long loop, just written on one line:

```text
[ p * 1.21    for p in prices    if p < 10 ]
  what to keep  the loop           the filter
```

## Not just lists

Swap the brackets and you get other collections:

```python
words = ["apple", "Banana", "cherry", "apple"]

# set: {'apple', 'banana', 'cherry'}
{w.lower() for w in words}
# dict: {'apple': 5, 'Banana': 6, 'cherry': 6}
{w: len(w) for w in words}
```

## When not to use one

Comprehensions are for **building a collection**. If you're printing, saving files, or your comprehension needs two `for`s and three `if`s, a regular loop is kinder to the reader. A comprehension that needs a comment to explain it is probably too clever.

```compare javascript
prices.filter(p => p < 10).map(p => p * 1.21);
```

```compare kotlin
prices.filter { it < 10 }.map { it * 1.21 }
```

```exercise
goal: "Only the even numbers should be squared and kept. Add a filter to the comprehension."
lang: python
code: |
  numbers = [1, 2, 3, 4]
  even_squares = [n ** 2 for n in numbers]
  print(even_squares)
checks:
  - match: 'for\s+n\s+in\s+numbers\s+if\s+n\s*%\s*2\s*==\s*0'
    message: "Add if n % 2 == 0 after for n in numbers."
hint: "A number is even when n % 2 == 0."
solution: |
  numbers = [1, 2, 3, 4]
  even_squares = [n ** 2 for n in numbers if n % 2 == 0]
  print(even_squares)
```

```quiz
question: "What does `{n % 3 for n in range(6)}` produce?"
options:
  - "`[0, 1, 2, 0, 1, 2]`"
  - "`{0, 1, 2}`"
  - "`{0: 0, 1: 1, 2: 2}`"
answer: 1
explain: Curly braces without a colon make a set, so the repeated remainders collapse into three unique values.
```
