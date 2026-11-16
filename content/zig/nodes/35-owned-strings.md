---
title: Owned string copies
icon: 🛠️
branch: memory
requires:
  - allocators
  - strings
summary: dupe allocates a copy that the caller owns.
---

dupe allocates a copy that the caller owns. A mutable copy can be changed while a string literal cannot.

```zig
const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    const copy = try allocator.dupe(u8, "Zig");
    defer allocator.free(copy);
    copy[0] = 'z';
    std.debug.assert(std.mem.eql(u8, copy, "zig"));
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about owned string copies.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const allocator = std.heap.page_allocator;
      const copy = try allocator.dupe(u8, "Zig");
      defer allocator.free(copy);
      copy[0] = 'Z';
      std.debug.assert(std.mem.eql(u8, copy, "zig"));
  }
checks:
  - match: copy\[0\]\s+=\s+'z'
    message: Use copy[0] = 'z' for this step.
  - notMatch: copy\[0\]\s+=\s+'Z'
    message: Replace copy[0] = 'Z' in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about owned string copies is correct?
options:
  - dupe returns an alias of the original string literal.
  - String literals are mutable heap allocations.
  - dupe allocates a copy that the caller owns. A mutable copy can be changed while a string literal
    cannot.
answer: 2
explain: dupe allocates a copy that the caller owns. A mutable copy can be changed while a string
  literal cannot.
```
