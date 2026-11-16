---
title: Built-in tests
icon: 🧩
branch: tools
requires:
  - functions
  - try
summary: Run zig test file.zig to discover test blocks.
---

Run `zig test file.zig` to discover test blocks. `std.testing.allocator` can also detect leaked allocations in tests.

```zig
const std = @import("std");
fn square(value: u32) u32 { return value * value; }
test "square handles zero and positive inputs" {
    try std.testing.expectEqual(@as(u32, 0), square(0));
    try std.testing.expectEqual(@as(u32, 9), square(3));
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about built-in tests.
lang: zig
code: |-
  const std = @import("std");
  fn square(value: u32) u32 { return value * value; }
  test "square handles zero and positive inputs" {
      try std.testing.expectEqual(@as(u32, 0), square(0));
      try std.testing.expectEqual(@as(u32, 6), square(3));
  }
checks:
  - match: "@as\\(u32,\\s+9\\),\\s+square\\(3\\)"
    message: Use @as(u32, 9), square(3) for this step.
  - notMatch: "@as\\(u32,\\s+6\\),\\s+square\\(3\\)"
    message: Replace @as(u32, 6), square(3) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which command discovers and runs Zig `test` blocks?
options:
  - "`zig test file.zig`"
  - "`zig build-exe file.zig`"
  - "`zig fmt file.zig`"
answer: 0
explain: The test command builds and executes the test runner.
```
