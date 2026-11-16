---
title: Compile-time constants
icon: "🧊"
branch: basics
requires: [bindings]
summary: const values are computed by the compiler and baked into the program.
---
**Q: I already have `let`. Why another keyword?**

`let` values are fixed *after* they're computed, while the program runs. A `const` is computed *while compiling*. Its value is baked into the executable:

```nim title=limits.nim
const
  MaxPlayers = 8
  SecondsPerDay = 24 * 60 * 60
  Greeting = "Welcome to the arena"

echo Greeting
echo "Up to ", MaxPlayers, " players"
echo SecondsPerDay   # 86400, calculated by the compiler
```

**Q: What can go into a `const`?**

Anything the compiler can work out on its own: literals, arithmetic, string operations, even calls to your own procedures, as long as they don't depend on runtime input. This doesn't compile:

```nim
let name = readLine(stdin)
const Upper = name   # Error: cannot evaluate at compile time
```

The user hasn't typed anything yet when the program is being compiled.

**Q: When should I use `const` instead of `let`?**

| Use | For |
| --- | --- |
| `const` | settings and limits fixed in the source: sizes, table data, version strings |
| `let` | values computed from input, files, the clock, other variables |
| `var` | values that change |

**Q: Why is the name capitalized?**

Style. Nim code commonly uses `PascalCase` for constants (`MaxPlayers`), and `camelCase` for variables and procedures. The compiler doesn't care.

**Q: The section syntax?**

`const`, `let` and `var` can all start an indented block, which saves repeating the keyword. `const MaxPlayers = 8` on one line works just as well.

**Q: Anything else that's special?**

Array sizes must be known at compile time, so they're a classic use: `var board: array[BoardSize, int]` works if `BoardSize` is a `const`, and fails if it's a `let`. You'll see this again with [arrays](node:arrays) and [compile-time checks](node:static).

```compare python
MAX_PLAYERS = 8   # constant by convention only
```

```compare javascript
const MAX_PLAYERS = 8;   // constant binding, but computed at runtime
```

```compare rust
const MAX_PLAYERS: u32 = 8;
const SECONDS_PER_DAY: u32 = 24 * 60 * 60;
```

```exercise
goal: "The tax rate is fixed in the source code. Make `TaxRate` a `const` instead of a `var`."
code: |-
  var TaxRate = 0.21
  let price = 100.0
  echo price * (1 + TaxRate)
checks:
  - match: '^const\s+TaxRate\s*=\s*0\.21'
    message: Write const TaxRate = 0.21
solution: |-
  const TaxRate = 0.21
  let price = 100.0
  echo price * (1 + TaxRate)
```

```quiz
question: "Which of these can be a `const`?"
options:
  - The current date.
  - "`60 * 60 * 1000`"
  - A line read from a file at runtime.
answer: 1
explain: A const must be computable while compiling. Arithmetic on literals is; the date and file contents aren't.
```
