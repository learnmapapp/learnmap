---
title: Formatting output
icon: 📦
branch: tools
requires:
  - strings
  - allocators
summary: bufPrint formats into caller-provided storage and can fail if it does not fit.
---

bufPrint formats into caller-provided storage and can fail if it does not fit. The returned slice borrows that buffer.

```zig
const std = @import("std");

pub fn main() !void {
    var buffer: [64]u8 = undefined;
    const text = try std.fmt.bufPrint(&buffer, "task-{d}", .{42});
    std.debug.assert(std.mem.eql(u8, text, "task-42"));
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about formatting output.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var buffer: [64]u8 = undefined;
      const text = try std.fmt.bufPrint(&buffer, "task-{x}", .{42});
      std.debug.assert(std.mem.eql(u8, text, "task-42"));
  }
checks:
  - match: '"task\-\{d\}"'
    message: Use "task-{d}" for this step.
  - notMatch: '"task\-\{x\}"'
    message: Replace "task-{x}" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about formatting output is correct?
options:
  - The returned slice outlives its stack buffer automatically.
  - bufPrint formats into caller-provided storage and can fail if it does not fit. The returned
    slice borrows that buffer.
  - bufPrint always returns an owned heap string.
answer: 1
explain: bufPrint formats into caller-provided storage and can fail if it does not fit. The returned
  slice borrows that buffer.
```
