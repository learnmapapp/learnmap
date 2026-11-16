---
title: Explicit allocators
icon: 🔁
branch: memory
requires:
  - slices
  - defer
  - try
summary: Allocation is explicit and fallible.
---

Allocation is explicit and fallible. Pair owned allocations with free and pass an allocator into reusable code instead of hiding a global policy.

A useful term here is [[allocator]]: An interface that supplies and releases memory using an explicit allocation policy.

```zig
const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    const values = try allocator.alloc(u8, 3);
    defer allocator.free(values);
    @memset(values, 7);
    std.debug.assert(values[2] == 7);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about explicit allocators.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const allocator = std.heap.page_allocator;
      const values = try allocator.alloc(u8, 3);
      defer allocator.free(values);
      @memset(values, 0);
      std.debug.assert(values[2] == 7);
  }
checks:
  - match: "@memset\\(values,\\s+7\\)"
    message: Use @memset(values, 7) for this step.
  - notMatch: "@memset\\(values,\\s+0\\)"
    message: Replace @memset(values, 0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Who releases a buffer returned by `allocator.alloc`?
options:
  - The code responsible for that allocation's ownership.
  - The slice value automatically on scope exit.
  - The compiler's implicit garbage collector.
answer: 0
explain: Pair owned allocations with the allocator's matching release policy.
```
