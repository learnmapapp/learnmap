---
title: Arena lifetimes
icon: 📋
branch: memory
requires:
  - allocators
summary: An arena groups allocations under one lifetime and releases them together at deinit.
---

An arena groups allocations under one lifetime and releases them together at deinit. Do not retain pointers after the arena is destroyed.

```zig
const std = @import("std");

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const values = try arena.allocator().alloc(u8, 4);
    @memset(values, 2);
    std.debug.assert(values.len == 4);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about arena lifetimes.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
      defer arena.deinit();
      const values = try arena.allocator().alloc(u8, 2);
      @memset(values, 2);
      std.debug.assert(values.len == 4);
  }
checks:
  - match: alloc\(u8,\s+4\)
    message: Use alloc(u8, 4) for this step.
  - notMatch: alloc\(u8,\s+2\)
    message: Replace alloc(u8, 2) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When do slices backed by an arena become invalid?
options:
  - Never, because arenas keep memory permanently alive.
  - When the arena releases their backing storage.
  - Only when each slice is explicitly set to `null`.
answer: 1
explain: Do not retain references beyond the arena's lifetime.
```
