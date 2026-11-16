---
title: Keyed storage
icon: 📦
branch: memory
requires:
  - allocators
  - strings
summary: StringHashMap compares byte-string keys by contents.
---

StringHashMap compares byte-string keys by contents. It does not automatically copy or free the memory owned by your key strings.

```zig
const std = @import("std");

pub fn main() !void {
    var counts = std.StringHashMap(u32).init(std.heap.page_allocator);
    defer counts.deinit();
    try counts.put("Zig", 2);
    std.debug.assert(counts.get("Zig").? == 2);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about keyed storage.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var counts = std.StringHashMap(u32).init(std.heap.page_allocator);
      defer counts.deinit();
      try counts.put("Zig", 0);
      std.debug.assert(counts.get("Zig").? == 2);
  }
checks:
  - match: put\("Zig",\s+2\)
    message: Use put("Zig", 2) for this step.
  - notMatch: put\("Zig",\s+0\)
    message: Replace put("Zig", 0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about keyed storage is correct?
options:
  - get returns zero for every missing key.
  - StringHashMap compares byte-string keys by contents. It does not automatically copy or free the
    memory owned by your key strings.
  - StringHashMap always owns and duplicates every key string.
answer: 1
explain: StringHashMap compares byte-string keys by contents. It does not automatically copy or free
  the memory owned by your key strings.
```
