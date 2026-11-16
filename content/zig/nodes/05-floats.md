---
title: Floating-point values
icon: "🎈"
branch: basics
requires: [integers]
summary: f32 and f64 for fractions, and why you can't mix them with integers.
---
For numbers with a fractional part, Zig has `f16`, `f32`, `f64` and `f128`. Use `f64` unless you have a reason not to; `f32` is common in graphics and games, where memory and speed matter.

```zig title=floats.zig
const std = @import("std");

pub fn main() void {
    const price: f64 = 19.99;
    const quantity: f64 = 3;
    const total = price * quantity;
    std.debug.print("total: {d:.2}\n", .{total});
}
```

`{d:.2}` prints the number with two decimals, so this shows `total: 59.97`.

Zig won't mix integers and floats in one calculation. This is a compile error:

```zig
const count: u32 = 3;
const average = 10.5 / count; // error: incompatible types
```

Convert explicitly with the builtin `@floatFromInt`. The target type comes from the variable you're assigning to:

```zig
const count: u32 = 3;
const n: f64 = @floatFromInt(count);
const average = 10.5 / n;
```

That looks wordy next to Python, but it means a conversion can never sneak in unnoticed.

```compare python
count = 3
average = 10.5 / count   # Python converts for you
```

```compare javascript
const count = 3;
const average = 10.5 / count; // every number is a float
```

```exercise
goal: Convert `count` to a float so the division compiles.
code: |-
  fn average(sum: f64, count: u32) f64 {
      return sum / count;
  }
checks:
  - match: '@floatFromInt\(count\)'
    message: Use @floatFromInt(count) to turn the integer into a float.
solution: |-
  fn average(sum: f64, count: u32) f64 {
      const n: f64 = @floatFromInt(count);
      return sum / n;
  }
hint: Store @floatFromInt(count) in a const with type f64 first, then divide by it.
```

```quiz
question: What does `{d:.2}` do in a format string?
options:
  - Prints the second argument.
  - Prints a number with two decimals.
  - Prints a number padded to two characters.
answer: 1
explain: The part after the colon is the precision. .2 means two digits after the decimal point.
```
