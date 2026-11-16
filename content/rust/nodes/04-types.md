---
title: Types
icon: "🔢"
branch: basics
requires: [variables]
summary: Integers with sizes, floats, bools, chars and strings.
---
Rust numbers say exactly how big they are:

| Type | What |
| --- | --- |
| `i32`, `i64` | signed integers (can be negative) |
| `u8`, `u32`, `usize` | unsigned integers (zero and up) |
| `f64` | floating point |
| `bool` | `true` or `false` |
| `char` | one Unicode character, like `'🦀'` |

Rust never converts between number types behind your back. Mixing them is an error until you convert with `as`:

```rust
let items: u32 = 3;
let price: f64 = 2.5;
let total = items as f64 * price; // 7.5
```

Strings come in two flavours. `&str` is a fixed piece of text (like a literal), `String` is text you own and can grow:

```rust
let greeting: &str = "hello";
let mut name = String::from("Fer");
name.push_str("ris");
```

```compare python
# Python has one int that grows forever; Rust makes you pick a size.
total = 3 * 2.5
```

```compare javascript
// JS has `number` for everything; Rust has i32, u8, f64, …
const total = 3 * 2.5;
```

```compare java
// Like Java's int/long/double, but no silent widening between them.
double total = 3 * 2.5;
```

```compare kotlin
// Kotlin also refuses implicit conversions: like Rust, you call
// .toDouble().
val total = 3.toDouble() * 2.5
```

```compare go
// Same rule as Go: float64(items) * price
total := float64(items) * price
```

```exercise
goal: Fix the type error by converting `count` to an `f64`.
code: |
  let count: u32 = 4;
  let average = 10.0 / count;
checks:
  - match: 'count\s+as\s+f64|f64::from\(\s*count\s*\)'
    message: Convert count with `as f64`.
output: "2.5"
```

## Overflow and number literals

What happens when a `u8` (0 to 255) goes past 255? In a debug build the program panics; in a release build it wraps around. When you want a specific behaviour, say so:

```repl
> 250u8.checked_add(10)
None
> 250u8.wrapping_add(10)
4
> 250u8.saturating_add(10)
255
```

Literals can carry their type as a suffix, and underscores make big numbers readable: `1_000_000u64`, `0xff`, `0b1010`, `2.5f32`.

If you don't specify, integers default to `i32` and floats to `f64`.

```quiz
question: Which type should hold the number of items in a list?
options:
  - "`i32`"
  - "`usize`"
  - "`f64`"
answer: 1
explain: "`usize` is the size of a pointer, and it's what `len()` returns and indexing expects."
```
