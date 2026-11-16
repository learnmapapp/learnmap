---
title: Explicit types
icon: "🔖"
branch: basics
requires: [bindings]
summary: Nim infers types, lets you write them out, and never converts between them silently.
---
Every value in Nim has a type, decided when compiling. Usually Nim works it out:

```nim
let count = 3          # int
let ratio = 0.75       # float
let name = "Ada"       # string
let initial = 'A'      # char: one character, single quotes
let done = false       # bool
```

You can also write the type yourself, after a colon:

```nim
let count: int = 3
var total: float = 0
```

Notice `0`, not `0.0`, on the last line. Because the type says `float`, the literal `0` is read as a float. That's one of the few places Nim adapts a value for you.

**The basic types:**

| Type | Holds | Example |
| --- | --- | --- |
| `int` | whole numbers, 64-bit on most machines | `42`, `-7`, `1_000_000` |
| `float` | decimal numbers, 64-bit | `3.14`, `2e6` |
| `string` | text | `"hello"` |
| `char` | a single byte-sized character | `'x'` |
| `bool` | `true` or `false` | |

Sized types exist too, like `int8`, `uint16` and `float32`, for file formats and memory-tight code. Use plain `int` and `float` unless you have a reason not to.

**No silent conversions between variables.** This is where Nim differs from Python and JavaScript:

```nim
let apples = 3
let weight = 1.5
echo apples * weight          # Error: type mismatch
echo float(apples) * weight   # 4.5
```

Convert explicitly by calling the type: `float(x)`, `int(y)`. Converting a float to an int cuts off the decimals: `int(2.9)` is `2`. Use `toInt(2.9)` (rounds to 3) or `round` when you want rounding.

**Why write types when Nim can infer them?** Two good reasons: in [procedure](node:procedures) parameters, where they're required, and when you want a different type than the literal suggests, like `var total: float = 0`.

```compare python
apples * weight   # Python converts 3 to 3.0 silently
```

```compare javascript
apples * weight;  // JS has one number type, so no question arises
```

```compare rust
apples as f64 * weight   // explicit, like Nim
```

```exercise
goal: "Fix the type mismatch: convert `minutes` to a float before dividing."
code: |-
  let minutes = 90
  let hours = minutes / 60.0
  echo hours
checks:
  - match: 'float\(\s*minutes\s*\)\s*/\s*60\.0'
    message: Write float(minutes) / 60.0
solution: |-
  let minutes = 90
  let hours = float(minutes) / 60.0
  echo hours
```

```quiz
question: "What is `int(7.8)`?"
options:
  - "7"
  - "8"
  - A compile error.
answer: 0
explain: Converting to int cuts off the fractional part. toInt or round would give 8.
```
