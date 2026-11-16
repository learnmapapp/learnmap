---
title: Inspect types
icon: 🔢
branch: comptime
requires:
  - generic-types
summary: "@typeInfo exposes compile-time type metadata."
---

@typeInfo exposes compile-time type metadata. Use reflection deliberately for serialization or validation rather than duplicating field lists by hand.

```zig
const std = @import("std");
const Point = struct { x: i32, y: i32 };
pub fn main() !void {
    const fields = @typeInfo(Point).@"struct".fields;
    std.debug.assert(fields.len == 2);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about inspect types.
lang: zig
code: |-
  const std = @import("std");
  const Point = struct { x: i32, y: i32 };
  pub fn main() !void {
      const fields = @typeInfo(Point).@"struct".fields;
      std.debug.assert(fields.len == 3);
  }
checks:
  - match: fields\.len\s+==\s+2
    message: Use fields.len == 2 for this step.
  - notMatch: fields\.len\s+==\s+3
    message: Replace fields.len == 3 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `@typeInfo(Point)` expose?
options:
  - Compile-time metadata about the type.
  - Only the address of a runtime point.
  - A serialized copy of every point instance.
answer: 0
explain: Reflection can inspect fields and other type properties during compilation.
```
