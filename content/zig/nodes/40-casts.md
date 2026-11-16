---
title: Checked conversions
icon: "🔄"
branch: comptime
requires: [integers]
summary: Converting between number types, and how Zig keeps it from going wrong.
---
Converting a big integer to a smaller type can lose data. Zig makes you choose what should happen when it doesn't fit. Here's the toolkit, from strictest to loosest:

**`@intCast`**: "I'm sure it fits." In debug builds it's checked, and panics if you were wrong.

```zig
const big: u32 = 200;
const small: u8 = @intCast(big); // 200 fits in a u8
```

**`std.math.cast`**: "It might not fit, tell me." It returns an [optional](node:optionals), so you have to handle the `null`:

```zig
const maybe: ?u8 = std.math.cast(u8, big);
const safe = std.math.cast(u8, user_input) orelse return error.TooLarge;
```

**`@truncate`**: "Keep the low bits, throw away the rest." Never fails, sometimes surprises:

```zig
const x: u16 = 0x1234;
const low: u8 = @truncate(x); // 0x34
```

**`@as`**: not a conversion at all, just a type annotation. It only allows changes that are always safe, like `u8` to `u32`.

```zig
const total = @as(u64, count) * 1000; // do the maths in u64
```

You may have noticed that `@intCast` and `@truncate` don't name a target type. They take it from where the result goes: the type of the variable, the parameter, or the return type. So this doesn't compile, because Zig can't tell what you want:

```zig
const what = @intCast(big); // error: @intCast must have a known result type
```

Wrap it in `@as` to give it one: `@as(u8, @intCast(big))`.

For other kinds of numbers there are `@floatFromInt`, `@intFromFloat`, `@intFromEnum` and `@enumFromInt`. The naming pattern is always `@` + target + `From` + source.

```compare rust
let small: u8 = big as u8;                 // silently truncates
let checked: Option<u8> = big.try_into().ok();
```

```exercise
goal: The count comes from the user, so it might be too large for a u8. Return `error.TooMany` instead of crashing.
code: |-
  fn toCount(n: u32) !u8 {
      return @intCast(n);
  }
checks:
  - notMatch: '@intCast'
    message: "@intCast panics when the value doesn't fit."
  - match: 'std\.math\.cast\(u8,\s*n\)\s+orelse\s+(return\s+)?error\.TooMany'
    message: Use std.math.cast(u8, n) orelse error.TooMany.
solution: |-
  fn toCount(n: u32) !u8 {
      return std.math.cast(u8, n) orelse error.TooMany;
  }
```

```quiz
question: "`const x: u16 = 300; const y: u8 = @truncate(x);` What is `y`?"
options:
  - "255"
  - "44"
  - It panics.
answer: 1
explain: "@truncate keeps the lowest 8 bits. 300 − 256 = 44."
```
