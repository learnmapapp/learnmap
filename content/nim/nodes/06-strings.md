---
title: String operations
icon: "🧵"
branch: basics
requires: [constants]
summary: Join with &, convert with $, and find the useful tools in std/strutils.
---
**Two operators to learn before anything else:**

- **`&`** joins two strings: `"snow" & "ball"` is `"snowball"`.
- **`$`** turns almost anything into a string: `$42` is `"42"`, `$3.5` is `"3.5"`, `$true` is `"true"`.

Together:

```nim title=receipt.nim
import std/strutils

let item = "coffee"
let cups = 3
var line = "Order: " & $cups & "x " & item
echo line                 # Order: 3x coffee

line.add(" (to go)")      # append in place
echo line.len             # 24
echo line.toUpperAscii()  # ORDER: 3X COFFEE (TO GO)
echo "fee" in line        # true
```

**Why `&` instead of `+`?** Because `+` means addition, and `"3" + 4` shouldn't be guesswork. In Nim, `"Cups: " & 3` is a compile error; you write `"Cups: " & $3`. It's one extra character, and you always know what you get.

**`std/strutils`** has the everyday string tools. Import it once at the top of the file:

| Call | Result |
| --- | --- |
| `"a,b,c".split(',')` | `@["a", "b", "c"]` |
| `"  hi  ".strip()` | `"hi"` |
| `"hello".startsWith("he")` | `true` |
| `"cat".repeat(3)` | `"catcatcat"` |
| `"a-b".replace("-", "+")` | `"a+b"` |
| `parseInt("42")` | `42` (raises `ValueError` for bad input) |

**Method style.** `line.toUpperAscii()` and `toUpperAscii(line)` are the same call. In Nim, any procedure can be called with a dot on its first argument. You'll learn why in [procedures](node:procedures).

**Strings are mutable values.** A `var` string can be changed in place with `add` or `&=`. Assigning a string to another variable copies it, so the two don't affect each other.

**Indexing** gives a `char`: `"Nim"[0]` is `'N'`. `len` counts bytes, which equals the number of characters for plain ASCII text.

```compare python
line = "Order: " + str(cups) + "x " + item
line.upper()
```

```compare javascript
const line = "Order: " + cups + "x " + item;   // JS converts cups silently
```

```compare rust
let line = format!("Order: {}x {}", cups, item);
```

```exercise
goal: "This doesn't compile: `&` only joins strings. Convert `score` with `$`."
code: |-
  let score = 42
  echo "Score: " & score
checks:
  - match: '"Score: "\s*&\s*\$score'
    message: 'Write "Score: " & $score'
solution: |-
  let score = 42
  echo "Score: " & $score
```

```quiz
question: "What is `\"ab\" & $1 & \"c\"`?"
options:
  - "\"ab1c\""
  - "\"ab 1 c\""
  - A compile error.
answer: 0
explain: $1 converts the number to "1", and & joins the three strings without spaces.
```
