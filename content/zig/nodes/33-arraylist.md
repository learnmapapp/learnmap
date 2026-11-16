---
title: Growable lists
icon: 🧩
branch: memory
requires:
  - allocators
  - structs
summary: In Zig 0.15.2 ArrayList receives an allocator for allocating operations.
---

In Zig 0.15.2 `ArrayList` receives an allocator for allocating operations. Growing a list can invalidate slices and pointers into its old storage.

```zig
const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var values: std.ArrayList(u8) = .empty;
    defer values.deinit(allocator);
    try values.append(allocator, 7);
    std.debug.assert(values.items[0] == 7);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about growable lists.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const allocator = std.heap.page_allocator;
      var values: std.ArrayList(u8) = .empty;
      defer values.deinit(allocator);
      try values.append(allocator, 0);
      std.debug.assert(values.items[0] == 7);
  }
checks:
  - match: append\(allocator,\s+7\)
    message: Use append(allocator, 7) for this step.
  - notMatch: append\(allocator,\s+0\)
    message: Replace append(allocator, 0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: In Zig 0.15.2, which append call supplies the allocator explicitly?
options:
  - "`try values.append(allocator, 7)`"
  - "`try values.append(7)`"
  - "`values.items.append(7)`"
answer: 0
explain: Allocating `ArrayList` operations in this version take an allocator argument.
```
