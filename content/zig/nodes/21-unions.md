---
title: Tagged unions
icon: 🧩
branch: data
requires:
  - switch
summary: union(enum) pairs a tag with a case-specific payload.
---

`union(enum)` pairs a tag with a case-specific payload. Switch captures give access to the active payload only.

```zig
const std = @import("std");
const Value = union(enum) { text: []const u8, count: u32 };
pub fn main() !void {
    const value = Value{ .count = 8 };
    switch (value) {
        .text => |text| std.debug.print("{s}\n", .{text}),
        .count => |count| std.debug.assert(count == 8),
    }
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about tagged unions.
lang: zig
code: |-
  const std = @import("std");
  const Value = union(enum) { text: []const u8, count: u32 };
  pub fn main() !void {
      const value = Value{ .count = 0 };
      switch (value) {
          .text => |text| std.debug.print("{s}\n", .{text}),
          .count => |count| std.debug.assert(count == 8),
      }
  }
checks:
  - match: \.count\s+=\s+8
    message: Use .count = 8 for this step.
  - notMatch: \.count\s+=\s+0
    message: Replace .count = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How do you safely use a `union(enum)` payload?
options:
  - Switch on the active tag and capture that case's payload.
  - Read every payload field unconditionally.
  - Assume the first declared payload is always active.
answer: 0
explain: Only the selected union alternative has an active payload.
```
