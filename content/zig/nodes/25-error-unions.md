---
title: Fallible return types
icon: 🧪
branch: errors
requires:
  - error-sets
  - functions
summary: E!T represents either an error from E or a successful T.
---

E!T represents either an error from E or a successful T. A !T return type lets the compiler infer the function’s error set.

```zig
const std = @import("std");
fn validate(text: []const u8) error{Empty}!usize {
    if (text.len == 0) return error.Empty;
    return text.len;
}
pub fn main() !void {
    const result = try validate("Zig");
    std.debug.assert(result == 3);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about fallible return types.
lang: zig
code: |-
  const std = @import("std");
  fn validate(text: []const u8) error{Empty}!usize {
      if (text.len == 0) return error.Empty;
      return 0;
  }
  pub fn main() !void {
      const result = try validate("Zig");
      std.debug.assert(result == 3);
  }
checks:
  - match: return\s+text\.len;
    message: Use return text.len; for this step.
  - notMatch: return\s+0;
    message: Replace return 0; in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about fallible return types is correct?
options:
  - A fallible function cannot return a normal value.
  - E!T represents either an error from E or a successful T. A !T return type lets the compiler
    infer the function’s error set.
  - "!T means an optional T."
answer: 1
explain: E!T represents either an error from E or a successful T. A !T return type lets the compiler
  infer the function’s error set.
```
