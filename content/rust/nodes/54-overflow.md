---
title: Integer overflow
icon: "🌊"
branch: basics
requires: [types]
summary: What happens when a number gets too big, and how to choose.
---
A `u8` holds 0 to 255. So what is `255 + 1`?

In a **debug build** (`cargo run`), Rust stops the program with a panic instead of silently giving you a wrong number:

```repl shell
> cargo run
thread 'main' panicked at src/main.rs:3:13:
attempt to add with overflow
```

In a **release build** (`cargo run --release`), the check is removed for speed and the number wraps around to 0. Because the two builds behave differently, don't rely on either. When overflow is possible, say what you want:

```rust title=src/main.rs
fn main() {
    let health: u8 = 250;

    let a = health.checked_add(10);    // None: it didn't fit
    let b = health.wrapping_add(10);   // 4: wraps around
    let c = health.saturating_add(10); // 255: sticks at the max

    println!("{a:?} {b} {c}");
}
```

- `checked_*` gives an `Option`: `Some(result)` or `None`.
- `wrapping_*` wraps around on purpose, which is handy for hashes and counters.
- `saturating_*` stops at the minimum or maximum, which is handy for things like health bars and volume.

```tip
Most of the time, the fix is simply a bigger type. If a counter might pass 4 billion, use `u64` instead of `u32`.
```

```compare python
255 + 1   # 256: Python ints never overflow
```

```compare java
byte b = (byte) 255; // -1, wraps silently
```

```compare go
var x uint8 = 255
x++ // 0, wraps silently
```

```compare javascript
255 + 1 // 256, but huge numbers lose precision instead
```

```exercise
goal: "The score must never go past the maximum. Replace the `+` with `saturating_add`."
code: |
  let score: u8 = 200;
  let bonus: u8 = 100;
  let total = score + bonus;
checks:
  - match: 'score\.saturating_add\(\s*bonus\s*\)'
    message: Write score.saturating_add(bonus).
  - notMatch: 'score\s*\+\s*bonus'
    message: Remove the plain + so it can't overflow.
output: "total = 255"
solution: |
  let score: u8 = 200;
  let bonus: u8 = 100;
  let total = score.saturating_add(bonus);
```

```quiz
question: "What does `250u8.checked_add(10)` return?"
options:
  - "`4`"
  - "`255`"
  - "`None`"
answer: 2
explain: checked_add returns None when the result doesn't fit in the type.
```
