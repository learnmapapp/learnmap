---
title: Inferred parameter types
icon: 🧪
branch: comptime
requires:
  - functions
summary: anytype asks the compiler to specialize a function for its argument’s type.
---

anytype asks the compiler to specialize a function for its argument’s type. Operations inside the function must still be valid for that concrete type.

```zig
const std = @import("std");
fn double(value: anytype) @TypeOf(value) { return value * 2; }
pub fn main() !void {
    std.debug.assert(double(@as(u16, 4)) == 8);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about inferred parameter types.
lang: zig
code: |-
  const std = @import("std");
  fn double(value: anytype) @TypeOf(value) { return value + 1; }
  pub fn main() !void {
      std.debug.assert(double(@as(u16, 4)) == 8);
  }
checks:
  - match: return\s+value\s+\*\s+2
    message: Use return value * 2 for this step.
  - notMatch: return\s+value\s+\+\s+1
    message: Replace return value + 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about inferred parameter types is correct?
options:
  - Every anytype argument becomes a boxed runtime object.
  - anytype asks the compiler to specialize a function for its argument’s type. Operations inside
    the function must still be valid for that concrete type.
  - anytype disables all compile-time checking.
answer: 1
explain: anytype asks the compiler to specialize a function for its argument’s type. Operations
  inside the function must still be valid for that concrete type.
```
