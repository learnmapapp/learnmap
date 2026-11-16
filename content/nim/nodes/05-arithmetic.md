---
title: Integer arithmetic
icon: "➗"
branch: basics
requires: [types]
summary: div and mod for whole numbers, / for decimals, and what happens on overflow.
---
**Predict the output** of each line, then check:

```nim title=math.nim
echo 17 div 5    # ?
echo 17 mod 5    # ?
echo 17 / 5      # ?
echo -17 div 5   # ?
```

```repl shell
> nim r math.nim
3
2
3.4
-3
```

The surprises, explained:

- **`/` always gives a `float`**, even for two ints. `17 / 5` is `3.4`, never `3`. Nim won't throw your decimals away unless you ask.
- **`div` is integer division**, spelled as a word. It rounds toward zero, so `-17 div 5` is `-3`. (Python's `//` would give `-4`.)
- **`mod` is the remainder.** Handy for "every third item" (`i mod 3 == 0`) and for wrapping around a clock (`(hour + 5) mod 24`).

**The full set:**

| Operator | Meaning | `17 ? 5` |
| --- | --- | --- |
| `+`, `-`, `*` | the usual | 22, 12, 85 |
| `/` | division, float result | 3.4 |
| `div` | integer division | 3 |
| `mod` | remainder | 2 |
| `+=`, `-=`, `*=` | update a `var` | |

There's no `**` operator for powers. Use `^` from `std/math`: `2 ^ 10` is `1024`.

**Overflow is caught.** An `int` has a limit, around 9.2 quintillion. Go past it and Nim, by default, stops the program with an `OverflowDefect` instead of quietly wrapping around to a negative number:

```nim
var big = high(int)   # the largest int
big += 1              # Error: over- or underflow
```

`high(int)` and `low(int)` give the limits of a type, which also works for `int8`, `uint16` and friends. Builds made with `-d:danger` remove these checks for speed; more on that in [build configurations](node:build).

```compare python
17 // 5    # 3, but -17 // 5 is -4
17 % 5     # 2
17 / 5     # 3.4
```

```compare javascript
Math.trunc(17 / 5);  // 3
17 % 5;              // 2
```

```compare rust
17 / 5      // 3 for integers
17 % 5      // 2
```

```exercise
goal: "Split 50 sweets fairly among 8 children: each gets `50 div 8`, and the leftover is `50 mod 8`. Fix both lines."
code: |-
  let each = 50 / 8
  let leftover = 50 - 8
  echo each, " each, ", leftover, " left"
checks:
  - match: 'let\s+each\s*=\s*50\s+div\s+8'
    message: Use div for whole-number division.
  - match: 'let\s+leftover\s*=\s*50\s+mod\s+8'
    message: Use mod for the remainder.
solution: |-
  let each = 50 div 8
  let leftover = 50 mod 8
  echo each, " each, ", leftover, " left"
```

```quiz
question: "What type is `10 / 2` in Nim?"
options:
  - "int (5)"
  - "float (5.0)"
  - It depends on the variable.
answer: 1
explain: The / operator always produces a float. Use div for an int result.
```
