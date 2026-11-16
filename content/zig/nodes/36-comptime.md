---
title: Compile-time values
icon: 🌐
branch: comptime
requires:
  - functions
summary: comptime requires evaluation during compilation.
---

comptime requires evaluation during compilation. The same ordinary function can also run at runtime when its inputs are not compile-time known.

A useful term here is [[comptime]]: Evaluation or information required at compilation rather than at program runtime.

```zig
const std = @import("std");
fn square(value: u32) u32 { return value * value; }
pub fn main() !void {
    comptime { std.debug.assert(square(4) == 16); }
    std.debug.assert(square(5) == 25);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time values.
lang: zig
code: |-
  const std = @import("std");
  fn square(value: u32) u32 { return value * value; }
  pub fn main() !void {
      comptime { std.debug.assert(square(4) == 8); }
      std.debug.assert(square(5) == 25);
  }
checks:
  - match: square\(4\)\s+==\s+16
    message: Use square(4) == 16 for this step.
  - notMatch: square\(4\)\s+==\s+8
    message: Replace square(4) == 8 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about compile-time values is correct?
options:
  - comptime requires evaluation during compilation. The same ordinary function can also run at
    runtime when its inputs are not compile-time known.
  - All function calls are necessarily runtime-only.
  - comptime creates a hidden background thread.
answer: 0
explain: comptime requires evaluation during compilation. The same ordinary function can also run at
  runtime when its inputs are not compile-time known.
```
