---
title: Functions returning types
icon: 🏷️
branch: comptime
requires:
  - comptime
  - structs
summary: A compile-time function can return a type.
---

A compile-time function can return a type. This is how reusable containers express their element type without runtime type erasure.

```zig
const std = @import("std");
fn Box(comptime T: type) type { return struct { value: T }; }
pub fn main() !void {
    var value = Box(u8){ .value = 7 };
    value.value += 1;
    std.debug.assert(value.value == 8);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about functions returning types.
lang: zig
code: |-
  const std = @import("std");
  fn Box(comptime T: type) type { return struct { value: T }; }
  pub fn main() !void {
      var value = Box(u8){ .value = 7 };
      value.value += 2;
      std.debug.assert(value.value == 8);
  }
checks:
  - match: value\.value\s+\+=\s+1
    message: Use value.value += 1 for this step.
  - notMatch: value\.value\s+\+=\s+2
    message: Replace value.value += 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about functions returning types is correct?
options:
  - Types can only be hard-coded at the top level.
  - A generic container requires heap allocation.
  - A compile-time function can return a type. This is how reusable containers express their element
    type without runtime type erasure.
answer: 2
explain: A compile-time function can return a type. This is how reusable containers express their
  element type without runtime type erasure.
```
