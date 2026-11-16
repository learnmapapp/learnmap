---
title: "Numbers"
icon: "🔢"
branch: "basics"
requires: ["variables"]
summary: "Integers, floats, division, and explicit conversions."
---
Python has two everyday number types: `int` for whole numbers and `float` for numbers with a decimal point. The arithmetic is what you'd expect, mostly. Here are the four places where it isn't.

**Surprise 1: `/` always gives a float.**

```repl
> 10 / 2
5.0
> 7 / 2
3.5
```

If you want whole-number division, use `//`, and `%` for the remainder:

```repl
> 7 // 2
3
> 7 % 2
1
```

**Surprise 2: `//` rounds down, not toward zero.** For negative numbers that matters: `-7 // 2` is `-4`, not `-3`. It's "floor" division.

**Surprise 3: integers never overflow.** There's no maximum `int`; it just grows:

```repl
> 2 ** 100
1267650600228229401496703205376
```

(`**` is "to the power of".) Floats are the usual 64-bit kind, with the usual rounding quirks:

```repl
> 0.1 + 0.2
0.30000000000000004
```

Compare floats with `math.isclose(a, b)` rather than `==`. And for money, use the `decimal` module, which does exact decimal arithmetic.

**Surprise 4: text is not a number.** Anything you read from a file, a form or the keyboard arrives as a string. Python won't guess what you meant:

```repl
> "41" + 1
error: TypeError: can only concatenate str (not "int") to str
> int("41") + 1
42
> float("2.5")
2.5
```

Convert at the edge, as soon as the data comes in, and work with real numbers after that:

```python
raw_price = "19.99"       # say, read from a form
raw_count = "3"

total = float(raw_price) * int(raw_count)
print(round(total, 2))    # 59.97
```

 `int("hello")` raises a `ValueError`, which you'll learn to handle in [Exceptions](node:exceptions).

Two small niceties: underscores make long numbers readable (`1_000_000`), and `round(3.14159, 2)` gives `3.14`.

```compare javascript
7 / 2          // 3.5, same as Python
Math.floor(7 / 2) // what Python writes as 7 // 2
```

```compare java
7 / 2   // 3 in Java: int division. Python's / never truncates.
```

```exercise
goal: "`count` arrives as text. Convert it to an integer before adding one, so this prints 42."
lang: python
code: |
  count = "41"
  print(count + 1)
checks:
  - match: 'int\(\s*count\s*\)\s*\+\s*1'
    message: Use int(count) + 1.
hint: int(...) turns a string of digits into a number.
solution: |
  count = "41"
  print(int(count) + 1)
```

```quiz
question: What does `-7 // 2` give?
options:
  - "`-3`"
  - "`-4`"
  - "`-3.5`"
answer: 1
explain: "// rounds down toward negative infinity. -3.5 rounded down is -4."
```
