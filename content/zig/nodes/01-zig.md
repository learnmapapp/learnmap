---
title: Meet Zig
icon: ⚡
branch: core
requires: []
summary: Save hello.zig and run zig run hello.zig with Zig 0.15.2.
kind: hub
---

Save `hello.zig` and run `zig run hello.zig` with Zig 0.15.2. This course pins that version because standard-library interfaces evolve.

```zig
const std = @import("std");

pub fn main() !void {
    std.debug.print("Hello, Zig!\n", .{});
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Zig 0.15.2**. Check your local tool version before following examples. See the [official reference](https://ziglang.org/documentation/0.15.2/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Make the program print `Hello, Zig!`.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      std.debug.print("Hello, world!\n", .{});
  }
checks:
  - match: Hello,\s+Zig!
    message: Use Hello, Zig! for this step.
  - notMatch: Hello,\s+world!
    message: Replace Hello, world! in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does the terminal command `zig run hello.zig` do?
options:
  - Checks types without producing or running code.
  - Compiles and runs the source program.
  - Formats the source without executing it.
answer: 1
explain: "`zig run` builds and executes the requested Zig source file."
```
