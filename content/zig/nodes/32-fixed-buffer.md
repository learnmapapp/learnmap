---
title: Bounded allocation
icon: 🔧
branch: memory
requires:
  - allocators
  - arrays
summary: FixedBufferAllocator allocates inside caller-provided storage and reports exhaustion.
---

FixedBufferAllocator allocates inside caller-provided storage and reports exhaustion. The backing buffer must outlive every allocation.

```zig
const std = @import("std");

pub fn main() !void {
    var buffer: [64]u8 = undefined;
    var fixed = std.heap.FixedBufferAllocator.init(&buffer);
    const values = try fixed.allocator().alloc(u8, 8);
    @memset(values, 1);
    std.debug.assert(values.len == 8);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about bounded allocation.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var buffer: [64]u8 = undefined;
      var fixed = std.heap.FixedBufferAllocator.init(&buffer);
      const values = try fixed.allocator().alloc(u8, 4);
      @memset(values, 1);
      std.debug.assert(values.len == 8);
  }
checks:
  - match: alloc\(u8,\s+8\)
    message: Use alloc(u8, 8) for this step.
  - notMatch: alloc\(u8,\s+4\)
    message: Replace alloc(u8, 4) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about bounded allocation is correct?
options:
  - A fixed buffer expands automatically using the heap.
  - undefined initializes all bytes to zero.
  - FixedBufferAllocator allocates inside caller-provided storage and reports exhaustion. The
    backing buffer must outlive every allocation.
answer: 2
explain: FixedBufferAllocator allocates inside caller-provided storage and reports exhaustion. The
  backing buffer must outlive every allocation.
```
