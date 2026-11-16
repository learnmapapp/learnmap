---
title: "Numbers"
icon: "🔢"
branch: "basics"
requires: ["variables"]
summary: "Integers, floats, division, and explicit conversions."
---

Python has whole numbers (`int`) and floating-point numbers (`float`). Integers grow as needed, subject to available memory; floats have limited precision.

```python
print(7 / 2)    # 3.5: division
print(7 // 2)   # 3: floor division
print(7 % 2)    # 1: remainder
print(2 ** 3)   # 8: exponentiation
print(-7 // 2)  # -4: rounds toward negative infinity
```

Parentheses make the intended order clear: `(2 + 3) * 4` gives `20`. Use underscores to make large literals readable, such as `1_000_000`.

## Convert at the boundary

Text from a file or an input field is not automatically a number. `int("42")` returns `42`; `float("3.5")` returns `3.5`. Invalid text such as `int("hello")` raises `ValueError`.

Floats represent many decimal fractions approximately. `0.1 + 0.2 == 0.3` is `false`; use `math.isclose` when testing approximate results. For financial decimal arithmetic, the standard library's `decimal` module is often a better fit.

Keep arithmetic separate from presentation: calculate with numbers, then format the result when displaying it.

```exercise
goal: Convert the text count to an integer before adding one.
lang: python
code: |
  count = "41"
  print(count + 1)
checks:
  - match: int\(\s*count\s*\)\s*\+\s*1
    message: Use int(count) + 1.
hint: Use `int(count)` + 1.
```

```quiz
question: What is `-7 // 2`?
options:
  - "-3"
  - "-3.5"
  - "-4"
answer: 2
explain: Floor division rounds down toward negative infinity, not toward zero.
```
