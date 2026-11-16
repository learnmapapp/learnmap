---
title: const and var
icon: "📌"
branch: basics
requires: [zig]
summary: Name values with const, and use var only for things that change.
---
Zig has two ways to name a value. `const` can never change; `var` can.

```zig title=bindings.zig
const std = @import("std");

pub fn main() void {
    const name = "Ziggy";
    var score: u32 = 0;
    score += 10;
    std.debug.print("{s} has {d} points\n", .{ name, score });
}
```

Two things in there are worth a closer look:

- `var score: u32 = 0` gives the variable a **type**: `u32`, an unsigned 32-bit integer. For `const`, Zig can usually work out the type itself.
- In the format string, `{s}` prints a string and `{d}` prints a number. The values come from the list `.{ name, score }`, in order.

Zig is strict about tidiness. Both of these are compile **errors**, not warnings:

```repl shell
> zig run bindings.zig
error: local variable is never mutated
note: consider using 'const'
```

That's what you get for a `var` that never changes. An unused local is also an error. If you really want to ignore a value, assign it to `_`:

```zig
_ = unused_value;
```

It feels fussy for a day or two. After that, it's nice to know that every `var` you read really does change.

```compare javascript
const name = "Ziggy";
let score = 0;
score += 10;
```

```compare rust
let name = "Ziggy";
let mut score: u32 = 0;
score += 10;
```

```exercise
goal: The compiler rejects this code. Fix the declaration that's never changed.
code: |-
  pub fn main() void {
      var max_players = 4;
      var players: u32 = 1;
      players += 1;
      _ = max_players;
  }
checks:
  - notMatch: 'var\s+max_players'
    message: max_players never changes, so it shouldn't be a var.
  - match: 'const\s+max_players\s*=\s*4'
    message: Declare max_players with const.
  - match: 'var\s+players'
    message: players does change, so keep it a var.
solution: |-
  pub fn main() void {
      const max_players = 4;
      var players: u32 = 1;
      players += 1;
      _ = max_players;
  }
hint: Which of the two values is updated later on?
```

```quiz
question: "You declare `var total: u32 = 0;` but never change it. What happens?"
options:
  - It compiles, with a warning.
  - It's a compile error suggesting const.
  - Zig turns it into a const for you.
answer: 1
explain: Zig refuses to compile a var that's never mutated, and tells you to use const instead.
```
