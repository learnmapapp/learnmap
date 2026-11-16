---
title: "Booleans"
icon: "⚖️"
branch: "basics"
requires: ["numbers", "strings"]
summary: "True, False, comparisons, and truthy values."
---

Comparisons produce `True` or `False`, with capital first letters:

```python
age = 20
print(age >= 18)             # True
print(18 <= age < 65)        # True
print(age != 0 and age < 30) # True
print(not False)            # True
```

Combine conditions with `and`, `or`, and `not`, rather than `&&` or `!`. Comparisons can be chained: `0 <= temperature <= 30` checks both bounds and evaluates the middle expression once.

## Truthiness

Empty strings and collections, numeric zero, and `None` are `false` in a condition. Most other values are `true`. `bool(value)` converts that truthiness into an explicit boolean.

`and` and `or` short-circuit and return an operand, not necessarily a boolean. For example, `"" or "guest"` returns `"guest"`. That makes fallback expressions convenient, but `count or 10` also replaces a legitimate zero.

Use `==` to compare values. Reserve `is` for object identity and sentinel checks such as `value is None`, covered in [None](node:none).

```compare javascript
const isAdult = age >= 18 && age < 65;
```

```exercise
goal: "Check that age is at least 18 and less than 65."
lang: python
code: |
  age = 20
  is_adult = age >= 18 or age < 65
  print(is_adult)
checks:
  - match: "age\\s*>=\\s*18\\s+and\\s+age\\s*<\\s*65"
    message: "Combine the two comparisons with and."
hint: "Combine the two comparisons with and."
```

```quiz
question: What does `"" or "guest"` evaluate to?
options:
  - The empty string.
  - The string `"guest"`.
  - The Boolean `True`.
answer: 1
explain: The empty string is falsey, so or returns the fallback operand.
```
