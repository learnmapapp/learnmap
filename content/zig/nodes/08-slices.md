---
title: Borrowed slices
icon: 🔧
branch: data
requires:
  - arrays
summary: A slice combines a pointer and length; it borrows backing storage.
---

A slice combines a pointer and length; it borrows backing storage. Changing an element through a mutable slice changes that storage.

A useful term here is [[slice]]: A pointer-and-length view into contiguous storage, written []T.

```zig
const std = @import("std");

pub fn main() !void {
    var values = [_]u8{ 2, 4, 6 };
    const middle: []u8 = values[1..];
    middle[0] = 9;
    std.debug.assert(values[1] == 9);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about borrowed slices.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var values = [_]u8{ 2, 4, 6 };
      const middle: []u8 = values[1..];
      middle[0] = 0;
      std.debug.assert(values[1] == 9);
  }
checks:
  - match: middle\[0\]\s+=\s+9
    message: Use middle[0] = 9 for this step.
  - notMatch: middle\[0\]\s+=\s+0
    message: Replace middle[0] = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about borrowed slices is correct?
options:
  - A slice always owns a copied allocation.
  - A slice keeps stack storage alive after its function returns.
  - A slice combines a pointer and length; it borrows backing storage. Changing an element through a
    mutable slice changes that storage.
answer: 2
explain: A slice combines a pointer and length; it borrows backing storage. Changing an element
  through a mutable slice changes that storage.
```
