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
question: Does `StringHashMap` automatically duplicate and own its key bytes?
options:
  - Only when the key contains uppercase letters.
  - No; key storage ownership remains the caller's responsibility.
  - Yes; every insertion always duplicates and frees key bytes.
answer: 1
explain: The map manages its internal storage, not arbitrary memory owned by its keys.
```
