---
title: Error-only cleanup
icon: 🚦
branch: errors
requires:
  - defer
  - try
summary: errdefer runs only when the enclosing scope exits with an error.
---

errdefer runs only when the enclosing scope exits with an error. Use it to release partially constructed resources before ownership transfers on success.

```zig
const std = @import("std");
fn createValue(fail: bool) error{Failed}!u8 {
    var marker: u8 = 0;
    errdefer marker = 1;
    if (fail) return error.Failed;
    return 4;
}
pub fn main() !void {
    std.debug.assert(try createValue(false) == 4);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about error-only cleanup.
lang: zig
code: |-
  const std = @import("std");
  fn createValue(fail: bool) error{Failed}!u8 {
      var marker: u8 = 0;
      errdefer marker = 1;
      if (fail) return error.Failed;
      return 0;
  }
  pub fn main() !void {
      std.debug.assert(try createValue(false) == 4);
  }
checks:
  - match: return\s+4;
    message: Use return 4; for this step.
  - notMatch: return\s+0;
    message: Replace return 0; in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about error-only cleanup is correct?
options:
  - errdefer always runs after every successful return.
  - errdefer replaces try with a fallback.
  - errdefer runs only when the enclosing scope exits with an error. Use it to release partially
    constructed resources before ownership transfers on success.
answer: 2
explain: errdefer runs only when the enclosing scope exits with an error. Use it to release
  partially constructed resources before ownership transfers on success.
```
