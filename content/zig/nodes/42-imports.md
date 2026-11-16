---
title: Import namespaces
icon: 🔁
branch: tools
requires:
  - functions
summary: "`@import` loads a module namespace."
---

`@import` loads a module namespace. Import local `.zig` files with relative paths and keep public APIs explicit.

```zig
const std = @import("std");

pub fn main() !void {
    std.debug.assert(std.math.maxInt(u8) == 255);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about import namespaces.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      std.debug.assert(std.math.maxInt(u16) == 255);
  }
checks:
  - match: maxInt\(u8\)\s+==\s+255
    message: Use maxInt(u8) == 255 for this step.
  - notMatch: maxInt\(u16\)\s+==\s+255
    message: Replace maxInt(u16) == 255 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `@import("std")` provide?
options:
  - The standard-library module namespace.
  - An automatically allocated instance of every library type.
  - A shell command that installs Zig.
answer: 0
explain: Imports make module declarations available to code.
```
