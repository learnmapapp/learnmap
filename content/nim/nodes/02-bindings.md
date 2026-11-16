---
title: var and let
icon: "🏷️"
branch: basics
requires: [nim]
summary: let for values that never change, var for values that do, and how to choose.
---
Nim gives you two ways to name a value, and the difference is one question: **will it change?**

```nim title=checkout.nim
let price = 25        # fixed: this item costs 25
let quantity = 3
var total = 0         # changes as we go

total = price * quantity
total += 5            # shipping
echo "Total: ", total   # Total: 80
```

| | `let` | `var` |
| --- | --- | --- |
| Can be reassigned | no | yes |
| Must be given a value right away | yes | no (it starts at zero, `""` or empty) |
| Use it for | most values | counters, totals, things that build up |

**Try to change a `let`:**

```nim
let price = 25
price = 30   # Error: 'price' cannot be assigned to
```

The compiler stops before the program runs. That's the point of `let`: when you read code later, every `let` is a promise that the value is the same everywhere.

**Start with `let`.** Switch to `var` only when you need to change something. Most values in a well-written program are calculated once and never changed, and `let` makes that visible.

**A `var` without a value** gets a default: `0` for numbers, `""` for strings, `false` for booleans. Unlike in some languages, you never read random leftover memory:

```nim
var count: int
echo count   # 0
```

Each [[binding]] also has a fixed type, inferred from its first value. `var total = 0` makes `total` an `int` forever; `total = "lots"` doesn't compile. There's a third kind, `const`, for values known while compiling; that's the [next lesson](node:constants).

```compare python
price = 25      # Python has no let: everything can be reassigned
total = 0
```

```compare javascript
const price = 25;   // like Nim's let
let total = 0;      // like Nim's var
```

```compare rust
let price = 25;       // like Nim's let
let mut total = 0;    // like Nim's var
```

```exercise
goal: "`lives` goes down when the player is hit, so it can't be a `let`. Change it to `var`."
code: |-
  let lives = 3
  lives -= 1
  echo lives
checks:
  - match: '^var\s+lives\s*=\s*3'
    message: Declare lives with var.
solution: |-
  var lives = 3
  lives -= 1
  echo lives
```

```quiz
question: "Watch out for JavaScript habits: which Nim keyword creates a binding that can't be reassigned?"
options:
  - "`var`"
  - "`let`"
  - Both.
answer: 1
explain: In Nim, let can't be reassigned. JavaScript's let can, which is a common mix-up.
```
