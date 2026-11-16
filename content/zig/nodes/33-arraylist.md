---
title: Growable lists
icon: "📝"
branch: memory
requires: [allocators, structs]
summary: std.ArrayList grows as you append, and you pass it the allocator each time.
---
Arrays have a fixed length. When you don't know how many items you'll get, such as lines from a file or players joining a game, you need a list that grows: `std.ArrayList`.

```zig title=shopping.zig
const std = @import("std");

pub fn main() !void {
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list: std.ArrayList([]const u8) = .empty;
    defer list.deinit(allocator);

    try list.append(allocator, "eggs");
    try list.append(allocator, "flour");
    try list.append(allocator, "chocolate 🍫");

    for (list.items, 1..) |item, n| {
        std.debug.print("{d}. {s}\n", .{ n, item });
    }
}
```

The essentials:

- **Start empty** with `.empty`. No memory is allocated until the first append.
- **Pass the allocator to every call that might allocate or free**: `append`, `appendSlice`, `insert`, `deinit`. Methods that can't allocate, like `pop` or `orderedRemove`, don't take one.
- **`list.items`** is a plain [[slice]] of everything in the list. Read it, loop over it, index it.
- **`append` can fail** (out of memory), so it needs `try`.

```warn
If you've seen older tutorials, they write `std.ArrayList(T).init(allocator)` and `list.append(x)`. That was the API before Zig 0.15. Now the list doesn't store its allocator, so you pass one in each time.
```

Why pass it each time? It makes the list smaller, and every line that may allocate is visible. It's the "no hidden allocations" motto again.

One gotcha: `list.items` is a view into the list's current memory. Appending can move the items to a bigger block, after which an old copy of `list.items` points at freed memory. Get `items` again after appending.

```compare python
items = []
items.append("eggs")
```

```compare rust
let mut items = Vec::new();
items.push("eggs");
```

```exercise
goal: This is old-style code from before Zig 0.15. Update the two calls to pass the allocator.
code: |-
  var scores: std.ArrayList(u32) = .empty;
  defer scores.deinit();
  try scores.append(42);
checks:
  - match: 'scores\.deinit\(allocator\)'
    message: deinit needs the allocator too.
  - match: 'scores\.append\(allocator,\s*42\)'
    message: "The allocator comes first: append(allocator, 42)"
solution: |-
  var scores: std.ArrayList(u32) = .empty;
  defer scores.deinit(allocator);
  try scores.append(allocator, 42);
```

```quiz
question: "You append to a list after storing `const old = list.items;`. Why is reading `old` risky?"
options:
  - It's only a copy of the first item.
  - Appending may move the items, leaving old pointing at freed memory.
  - The slice becomes null after any change.
answer: 1
explain: When the list grows, it may reallocate. Always read list.items again after changing the list.
```
