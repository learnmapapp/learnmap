---
title: Optional values
icon: 🔢
branch: flow
requires:
  - integers
summary: ?T represents either a T or null.
---

?T represents either a T or null. An optional capture exposes the present value safely inside the branch.

A useful term here is [[optional]]: A type that explicitly holds a value or null, written ?T.

```zig
const std = @import("std");

pub fn main() !void {
    const value: ?u8 = 7;
    if (value) |present| { std.debug.assert(present == 7); }
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional values.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const value: ?u8 = null;
      if (value) |present| { std.debug.assert(present == 7); }
  }
checks:
  - match: \?u8\s+=\s+7
    message: Use ?u8 = 7 for this step.
  - notMatch: \?u8\s+=\s+null
    message: Replace ?u8 = null in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about optional values is correct?
options:
  - ?T represents either a T or null. An optional capture exposes the present value safely inside
    the branch.
  - null is a valid ordinary u8.
  - Optional captures always force a panic.
answer: 0
explain: ?T represents either a T or null. An optional capture exposes the present value safely
  inside the branch.
```
