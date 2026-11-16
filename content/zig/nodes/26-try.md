---
title: Propagate errors
icon: 🏷️
branch: errors
requires:
  - error-unions
summary: try unwraps success or returns the error from the current function.
---

try unwraps success or returns the error from the current function. It makes propagation concise while preserving the caller’s choice of handling.

```zig
const std = @import("std");
fn positive(value: u8) error{Zero}!u8 {
    if (value == 0) return error.Zero;
    return value;
}
pub fn main() !void {
    const value = try positive(4);
    std.debug.assert(value == 4);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about propagate errors.
lang: zig
code: |-
  const std = @import("std");
  fn positive(value: u8) error{Zero}!u8 {
      if (value == 0) return error.Zero;
      return value;
  }
  pub fn main() !void {
      const value = try positive(0);
      std.debug.assert(value == 4);
  }
checks:
  - match: try\s+positive\(4\)
    message: Use try positive(4) for this step.
  - notMatch: try\s+positive\(0\)
    message: Replace try positive(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about propagate errors is correct?
options:
  - try catches and discards every error.
  - try changes every failure into null.
  - try unwraps success or returns the error from the current function. It makes propagation concise
    while preserving the caller’s choice of handling.
answer: 2
explain: try unwraps success or returns the error from the current function. It makes propagation
  concise while preserving the caller’s choice of handling.
```
