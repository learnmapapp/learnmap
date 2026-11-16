---
title: Read-only access
icon: 🛠️
branch: data
requires:
  - pointers
summary: "*const T prevents writing through that pointer."
---

*const T prevents writing through that pointer. A const pointer binding and a pointer to const data are separate concepts.

```zig
const std = @import("std");

pub fn main() !void {
    var count: u8 = 2;
    count += 1;
    const pointer: *const u8 = &count;
    std.debug.assert(pointer.* == 3);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about read-only access.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var count: u8 = 2;
      count += 1;
      const pointer: *const u8 = &count;
      std.debug.assert(pointer.* == 2);
  }
checks:
  - match: pointer\.\*\s+==\s+3
    message: Use pointer.* == 3 for this step.
  - notMatch: pointer\.\*\s+==\s+2
    message: Replace pointer.* == 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `*const u8` prohibit?
options:
  - Changing the value through every possible mutable alias.
  - Reading the pointed-to byte.
  - Writing through that pointer.
answer: 2
explain: Read-only access through one pointer is distinct from globally immutable storage.
```
