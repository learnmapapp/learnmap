---
title: "Booleans"
icon: "⚖️"
branch: "basics"
requires: ["numbers", "strings"]
summary: "True, False, comparisons, and truthy values."
---
Comparisons give you a boolean: `True` or `False`. Note the capital letters:

```repl
> 3 > 2
True
> "cat" == "dog"
False
> 0 <= 25 <= 30
True
```

That last one is a Python treat: comparisons chain, just like in maths. And instead of `&&`, `||` and `!`, Python spells them out: `and`, `or`, `not`.

## Game: true or false?

Python lets you use **any** value in an `if`, not just booleans. Before you peek at the table, guess what each of these counts as:

| Value | Counts as |
| --- | --- |
| `0` | false |
| `42` | true |
| `""` (empty string) | false |
| `"False"` (a string!) | true |
| `[]` (empty list) | false |
| `[0]` (a list with one item) | true |
| `None` | false |

The rule: **zero, empty and `None` are false; everything else is true**. Python calls this *truthiness*. It makes checks short:

```python
items = []
if not items:
    print("Your basket is empty")
```

`bool(value)` tells you how Python sees any value.

## `or` returns a value, not just True

`and` and `or` stop as soon as they know the answer, and they return the value they stopped at:

```repl
> "" or "guest"
'guest'
> "Ada" or "guest"
'Ada'
```

That makes a neat fallback: `name = typed_name or "guest"`. But careful: `limit = user_limit or 10` also replaces a perfectly valid `0` with 10, because `0` is false.

```tip
Use `==` to compare values. Python also has `is`, which checks whether two names point at the very same object. Its main everyday use is `x is None`, covered in [None](node:none).
```

```compare javascript
// Same idea, different list: in JS, [] is truthy.
// In Python, an empty list is false.
```

```compare go
// Go has no truthiness at all: if needs a real bool.
```

```exercise
goal: "`is_working_age` should be True only when age is at least 18 **and** under 65. Fix the condition."
lang: python
code: |
  age = 20
  is_working_age = age >= 18 or age < 65
  print(is_working_age)
checks:
  - match: 'age\s*>=\s*18\s+and\s+age\s*<\s*65|18\s*<=\s*age\s*<\s*65'
    message: "Both conditions must hold, so combine them with and."
hint: With or, an age of 90 still passes, because 90 >= 18.
solution: |
  age = 20
  is_working_age = age >= 18 and age < 65
  print(is_working_age)
```

```quiz
question: "What does `\"\" or \"guest\"` evaluate to?"
options:
  - "`True`"
  - "`'guest'`"
  - "`''`"
answer: 1
explain: The empty string counts as false, so or moves on and returns the second value.
```
