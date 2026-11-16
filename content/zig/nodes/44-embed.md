---
title: Compile-time assets
icon: 🔧
branch: tools
requires:
  - imports
  - comptime
summary: "@embedFile includes file bytes at compile time."
---

@embedFile includes file bytes at compile time. This example embeds its own zig_embed.zig file; adjust the path if you save it under another name.

```zig
const std = @import("std");

pub fn main() !void {
    const source = @embedFile("zig_embed.zig");
    std.debug.assert(source.len > 0);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time assets.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const source = @embedFile("zig_embed.zig");
      std.debug.assert(source.len == 0);
  }
checks:
  - match: source\.len\s+>\s+0
    message: Use source.len > 0 for this step.
  - notMatch: source\.len\s+==\s+0
    message: Replace source.len == 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about compile-time assets is correct?
options:
  - "@embedFile rereads the file on every function call."
  - Embedded data requires a deployed filesystem file.
  - "@embedFile includes file bytes at compile time. This example embeds its own zig_embed.zig file;
    adjust the path if you save it under another name."
answer: 2
explain: "@embedFile includes file bytes at compile time. This example embeds its own zig_embed.zig
  file; adjust the path if you save it under another name."
```
