---
title: Compile-time code
icon: "⏱️"
branch: comptime
requires: [functions]
summary: Run ordinary Zig code while compiling, and bake the result into your program.
---
Most languages have two languages inside them: the real one, and a separate system for macros, templates or preprocessors. Zig has just one. Ordinary Zig code can run **while the program compiles**, and the keyword for that is **[[comptime]]**.

```zig title=squares.zig
const std = @import("std");

fn squares(comptime n: usize) [n]u32 {
    var result: [n]u32 = undefined;
    for (&result, 0..) |*slot, i| slot.* = @intCast(i * i);
    return result;
}

// Computed by the compiler. The finished table is stored in the binary.
const table = comptime squares(10);

pub fn main() void {
    std.debug.print("{any}\n", .{table});
}
```

```repl shell
> zig run squares.zig
{ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 }
```

There's no special macro language here. `squares` is a normal function; `comptime` in front of the call just says "run it now, while compiling". At runtime, `table` is a ready-made array.

Notice `comptime n: usize` on the parameter as well. It means the caller must pass a value known at compile time, which is what lets `n` appear in the *return type*: `[n]u32`. An array's length is part of its type, so it has to be known before the program runs.

Some places are compile-time automatically: values at the top level of a file, array lengths, and types. That's why `const max = 100;` at the top of a file costs nothing at runtime.

Compile-time code has limits, of course: no files, no network, no clock. And if it loops too long, the compiler gives up with an error, rather than hanging.

```compare rust
// Rust splits this between const fn (limited) and macros (a separate language).
const fn square(n: u32) -> u32 { n * n }
```

```compare python
# Python has no compile step; the closest is computing at import time.
TABLE = [i * i for i in range(10)]
```

```exercise
goal: "`buffer` uses `size` as an array length, so `size` must be known at compile time. Mark the parameter as comptime."
code: |-
  fn buffer(size: usize) [size]u8 {
      return [_]u8{0} ** size;
  }
checks:
  - match: 'fn\s+buffer\(\s*comptime\s+size\s*:\s*usize\s*\)'
    message: Put comptime in front of the parameter name.
solution: |-
  fn buffer(comptime size: usize) [size]u8 {
      return [_]u8{0} ** size;
  }
```

```quiz
question: "What does `const t = comptime squares(10);` mean?"
options:
  - squares is called each time t is used.
  - squares runs during compilation, and the result is stored in the program.
  - squares runs once, when the program starts.
answer: 1
explain: The compiler runs the function itself. The program contains only the finished array.
```
