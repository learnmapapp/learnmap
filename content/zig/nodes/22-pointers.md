---
title: Pointers to storage
icon: 📦
branch: data
requires:
  - bindings
summary: "& takes an address and .* dereferences a pointer."
---

& takes an address and .* dereferences a pointer. The pointer must not outlive the storage it references.

A useful term here is [[pointer]]: A typed address referring to storage whose lifetime must remain valid.

```zig
const std = @import("std");

pub fn main() !void {
    var count: u8 = 2;
    const pointer = &count;
    pointer.* += 1;
    std.debug.assert(count == 3);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about pointers to storage.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var count: u8 = 2;
      const pointer = &count;
      pointer.* -= 1;
      std.debug.assert(count == 3);
  }
checks:
  - match: pointer\.\*\s+\+=\s+1
    message: Use pointer.* += 1 for this step.
  - notMatch: pointer\.\*\s+\-=\s+1
    message: Replace pointer.* -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `pointer.*` mean?
options:
  - Clone the pointed-to allocation.
  - Dereference the pointer.
  - Take the address of the pointer.
answer: 1
explain: Dereferencing accesses the storage a pointer refers to.
```
