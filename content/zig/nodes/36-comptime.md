---
title: Compile-time values
icon: 🌐
branch: comptime
requires:
  - functions
summary: comptime requires evaluation during compilation.
---

`comptime` requires evaluation during compilation. The same ordinary function can also run at runtime when its inputs are not compile-time known.

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
question: What does a `comptime` block require?
options:
  - Evaluation during compilation.
  - Evaluation on a background runtime thread.
  - Evaluation only when the first visitor opens a page.
answer: 0
explain: The code must be evaluable before the executable runs.
```
