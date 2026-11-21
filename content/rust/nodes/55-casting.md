---
title: Converting numbers
icon: "🔁"
branch: basics
requires: [types]
summary: Rust never converts number types for you. Use as, or try_from.
---
In many languages you can add an `int` and a `float` without thinking. Rust refuses:

```repl shell
> cargo build
error[E0277]: cannot add `f64` to `i32`
```

That sounds annoying, but it means a conversion never happens by accident. You write it yourself with `as`:

```rust title=src/main.rs
fn main() {
    let apples: i32 = 7;
    let people: i32 = 2;

    let share = apples as f64 / people as f64;
    println!("{share}"); // 3.5

    let rounded = 3.99_f64 as i32;
    println!("{rounded}"); // 3: as cuts off the decimals
}
```

`as` always succeeds, even when the value doesn't fit. A big number squeezed into a small type quietly loses bits:

```rust
let big: i32 = 300;
let small = big as u8; // 44, not 300!
```

When the value might not fit, use `try_from` instead. It returns a `Result`, so you have to deal with the failure:

```rust
let small = u8::try_from(big);    // Err(...)
let fine = u8::try_from(200_i32); // Ok(200)
```

```tip
Rule of thumb: `as` for float/int conversions and for widening (`u8` to `u32`). `try_from` when shrinking.
```

```compare python
share = apples / people   # Python converts for you
```

```compare java
double share = (double) apples / people;
```

```compare go
share := float64(apples) / float64(people)
```

```compare kotlin
val share = apples.toDouble() / people
```

```exercise
goal: "Convert both numbers to `f64` with `as`, so the division keeps the decimals."
code: |
  let distance: i32 = 15;
  let minutes: i32 = 4;
  let speed = distance / minutes;
checks:
  - match: 'distance\s+as\s+f64'
    message: Convert distance with distance as f64.
  - match: 'minutes\s+as\s+f64'
    message: Convert minutes too.
output: "speed = 3.75"
solution: |
  let distance: i32 = 15;
  let minutes: i32 = 4;
  let speed = distance as f64 / minutes as f64;
```

```quiz
question: "What is `2.9_f64 as i32`?"
options:
  - "`3`"
  - "`2`"
  - A compile error.
answer: 1
explain: as drops the fractional part. For rounding, call 2.9_f64.round() first.
```
