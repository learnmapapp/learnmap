---
title: A task store
icon: 🏷️
branch: tools
requires:
  - arraylist
  - methods
  - tests
  - errdefer
summary: "Make ownership visible: this list owns its allocation while titles borrow string literals."
---

Make ownership visible: this list owns its allocation while titles borrow string literals. If titles become allocated input, add per-title cleanup and allocation-failure tests.

```zig
const std = @import("std");
const Task = struct { title: []const u8, done: bool = false };
pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var tasks: std.ArrayList(Task) = .empty;
    defer tasks.deinit(allocator);
    try tasks.append(allocator, .{ .title = "Learn Zig" });
    tasks.items[0].done = true;
    std.debug.assert(tasks.items[0].done);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a task store.
lang: zig
code: |-
  const std = @import("std");
  const Task = struct { title: []const u8, done: bool = false };
  pub fn main() !void {
      const allocator = std.heap.page_allocator;
      var tasks: std.ArrayList(Task) = .empty;
      defer tasks.deinit(allocator);
      try tasks.append(allocator, .{ .title = "Learn Zig" });
      tasks.items[0].done = false;
      std.debug.assert(tasks.items[0].done);
  }
checks:
  - match: tasks\.items\[0\]\.done\s+=\s+true
    message: Use tasks.items[0].done = true for this step.
  - notMatch: tasks\.items\[0\]\.done\s+=\s+false
    message: Replace tasks.items[0].done = false in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: The list owns its allocation while task titles borrow string literals. What changes if
  titles become allocated input?
options:
  - List deinitialization automatically frees every nested allocation.
  - Allocated titles can be treated as immortal literals.
  - Each owned title needs an explicit cleanup policy too.
answer: 2
explain: Container storage and element-owned resources have separate lifetimes.
```
