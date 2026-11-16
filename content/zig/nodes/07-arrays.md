---
title: Fixed arrays
icon: "🧱"
branch: data
requires: [integers]
summary: Arrays have a length that's part of their type.
---
An array in Zig has a fixed length, and that length is part of its **type**. `[3]u8` and `[4]u8` are two different types, just like `u8` and `u16`.

```zig title=arrays.zig
const std = @import("std");

pub fn main() void {
    const primes = [5]u32{ 2, 3, 5, 7, 11 };
    const days = [_][]const u8{ "Mon", "Tue", "Wed" }; // _ means "count them for me"

    std.debug.print("first prime: {d}\n", .{primes[0]});
    std.debug.print("{d} primes, {d} days\n", .{ primes.len, days.len });
}
```

Three handy things to know:

1. **`[_]`** lets the compiler count the elements, so you don't have to.
2. **`.len`** gives the length. It's known while compiling, so it costs nothing at runtime.
3. **Indexes are checked.** `primes[5]` on a 5-element array is a compile error when the index is a constant. When it's computed at runtime, it panics in debug builds instead of quietly reading garbage memory.

You can fill an array with one repeated value using `**`:

```zig
const zeros = [_]u8{0} ** 8; // eight zeros
```

To change an element, the array itself must be a `var`:

```zig
var board = [_]u8{0} ** 9;
board[4] = 1; // put a piece in the middle
```

```tip
Arrays are **values**. Assigning one to another variable copies all of its elements. When you'd rather pass a view of the data than copy it, you'll want a [slice](node:slices).
```

```exercise
goal: Declare `scores` as an array of four `u16` values (10, 20, 30, 40), letting the compiler count them.
code: |-
  const scores = [4]u16{ 10, 20, 30 };
checks:
  - match: '\[_\]u16'
    message: Use [_] so the compiler counts the elements.
  - match: '10,\s*20,\s*30,\s*40'
    message: The array should hold 10, 20, 30 and 40.
solution: |-
  const scores = [_]u16{ 10, 20, 30, 40 };
```

```quiz
question: "`const a = [_]u8{ 1, 2, 3 };` What's the type of `a`?"
options:
  - "`[]u8`"
  - "`[3]u8`"
  - "`[_]u8`"
answer: 1
explain: The compiler counts the three elements, so the type is [3]u8. The length is part of the type.
```
