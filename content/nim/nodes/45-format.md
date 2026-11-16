---
title: String interpolation
icon: "💬"
branch: tools
requires: [strings]
summary: fmt and & from std/strformat put values into strings, with widths, decimals and alignment.
---
**Before:** building a receipt line with `&` and `$`:

```nim
echo "Item: " & name & ", qty " & $qty & ", total " & $(qty.float * price)
```

**After:** the same with `std/strformat`:

```nim title=receipt.nim
import std/strformat

let name = "Tea"
let qty = 3
let price = 2.4

echo fmt"Item: {name}, qty {qty}, total {qty.float * price:.2f}"
# Item: Tea, qty 3, total 7.20
```

Anything inside `{}` is Nim code, evaluated where the string is written, and turned into text with `$`. No `&` chains, and no forgetting a space.

**Formatting after the colon.** `{value:spec}` controls the output, and this is where `fmt` really earns its place:

| Spec | Example | Result |
| --- | --- | --- |
| `.2f` | `{7.2:.2f}` | `7.20` |
| `>8` | `{"tea":>8}` | `     tea` (right-aligned) |
| `<8` | `{"tea":<8}` | `tea     ` (left-aligned) |
| `^8` | `{"tea":^8}` | `  tea   ` (centered) |
| `06` | `{42:06}` | `000042` |
| `x` | `{255:x}` | `ff` |

Widths make aligned tables easy:

```nim
for (item, cost) in [("Tea", 7.2), ("Scone", 12.5)]:
  echo fmt"{item:<8}{cost:>8.2f}"
# Tea         7.20
# Scone      12.50
```

**`fmt"..."` versus `&"..."`.** Both interpolate. The difference is escapes: `fmt"..."` is a *raw* string, so `\n` stays as a backslash and an `n`, while `&"line\n"` handles `\n` as a newline. Use `&` when you need escape sequences.

**Literal braces:** double them. `fmt"{{x}}"` gives `{x}`.

**Debugging shortcut:** `{x=}` prints the expression along with its value. `fmt"{qty=}"` gives `qty=3`.

```compare python
print(f"Item: {name}, total {qty * price:.2f}")
print(f"{item:<8}{cost:>8.2f}")
```

```compare javascript
console.log(`Item: ${name}, total ${(qty * price).toFixed(2)}`);
```

```compare rust
println!("Item: {name}, total {:.2}", qty as f64 * price);
println!("{item:<8}{cost:>8.2}");
```

```exercise
goal: "Rewrite the message with `fmt`, showing `ratio` with exactly one decimal: `fmt\"Progress: {ratio:.1f}%\"`."
code: |-
  import std/strformat

  let ratio = 66.666
  echo "Progress: " & $ratio & "%"
checks:
  - match: 'fmt"Progress: \{ratio:\.1f\}%"'
    message: 'Write fmt"Progress: {ratio:.1f}%"'
solution: |-
  import std/strformat

  let ratio = 66.666
  echo fmt"Progress: {ratio:.1f}%"
```

```quiz
question: "What does `fmt\"{7:03}\"` produce?"
options:
  - "\"7\""
  - "\"007\""
  - "\"7.000\""
answer: 1
explain: A leading 0 in the width pads with zeros, so a width of 3 gives 007.
```
