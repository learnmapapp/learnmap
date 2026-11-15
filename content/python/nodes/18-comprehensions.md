---
title: "Comprehensions"
icon: "🧮"
branch: "collections"
requires: ["dictionaries", "sets", "conditionals"]
summary: "Transform and filter data in one readable expression."
---

A [[comprehension]] builds a collection from an iterable. Read a list comprehension as "produce this expression for each item, optionally keeping only some items":

```python
numbers = [1, 2, 3, 4]
squares = [number ** 2 for number in numbers]
even_squares = [number ** 2 for number in numbers if number % 2 == 0]
print(squares)       # [1, 4, 9, 16]
print(even_squares)  # [4, 16]
```

The trailing `if` filters input items. To choose between two outputs instead, put a conditional expression before `for`: `["even" if n % 2 == 0 else "odd" for n in numbers]`.

## More than lists

```python
names = ["Ada", "Grace", "Ada"]
lengths = {name: len(name) for name in names}
initials = {name[0] for name in names}
print(lengths)          # {'Ada': 3, 'Grace': 5}
print(sorted(initials)) # ['A', 'G']
```

Dictionary comprehensions use `key: value`; set comprehensions use a single expression in braces. Parentheses create a generator expression instead of a tuple comprehension.

Keep comprehensions short. If the expression needs complicated branching, error handling, or side effects, write an ordinary loop with named intermediate values.

```compare javascript
const evenSquares = numbers.filter(n => n % 2 === 0).map(n => n ** 2);
```

```compare rust
let squares: Vec<_> = numbers.iter()
    .filter(|n| *n % 2 == 0)
    .map(|n| n * n)
    .collect();
```

```exercise
goal: "Keep only even numbers while building their squares."
lang: python
code: |
  numbers = [1, 2, 3, 4]
  even_squares = [n ** 2 for n in numbers]
  print(even_squares)
checks:
  - match: "for\\s+n\\s+in\\s+numbers\\s+if\\s+n\\s*%\\s*2\\s*==\\s*0"
    message: "Add if n % 2 == 0 after for n in numbers."
hint: "Add if n % 2 == 0 after for n in numbers."
```

```quiz
question: "Where does the filtering condition go in a list comprehension?"
options:
  - "After the for clause."
  - "Before the opening bracket."
  - "Inside a separate else block."
answer: 0
explain: "A trailing if condition keeps only the matching input items."
```
