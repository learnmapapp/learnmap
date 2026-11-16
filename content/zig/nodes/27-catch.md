---
title: Handle errors
icon: 🔢
branch: errors
requires:
  - try
summary: catch handles an error union locally, with either a fallback or an error capture.
---

catch handles an error union locally, with either a fallback or an error capture. Unlike try, it need not propagate the failure.

```zig
const std = @import("std");
fn positive(value: u8) error{Zero}!u8 {
    if (value == 0) return error.Zero;
    return value;
}
pub fn main() !void {
    const value = positive(0) catch 10;
    std.debug.assert(value == 10);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about handle errors.
lang: zig
code: |-
  const std = @import("std");
  fn positive(value: u8) error{Zero}!u8 {
      if (value == 0) return error.Zero;
      return value;
  }
  pub fn main() !void {
      const value = positive(0) catch 0;
      std.debug.assert(value == 10);
  }
checks:
  - match: catch\s+10
    message: Use catch 10 for this step.
  - notMatch: catch\s+0
    message: Replace catch 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `operation() catch 10` do on failure?
options:
  - Uses `10` as the local fallback.
  - Returns the error from the current function.
  - Treats `10` as an optional error code.
answer: 0
explain: "`catch` handles the failure locally instead of necessarily propagating it."
```
