---
title: Public declarations
icon: 📋
branch: tools
requires:
  - imports
  - structs
summary: pub exposes a declaration to importing code.
---

pub exposes a declaration to importing code. Keep implementation details private and export the smallest useful interface.

```zig
const std = @import("std");
pub const Counter = struct { pub const initial: u8 = 0; };
pub fn main() !void {
    std.debug.assert(Counter.initial == 0);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about public declarations.
lang: zig
code: |-
  const std = @import("std");
  pub const Counter = struct { pub const initial: u8 = 1; };
  pub fn main() !void {
      std.debug.assert(Counter.initial == 0);
  }
checks:
  - match: pub\s+const\s+initial:\s+u8\s+=\s+0
    message: "Use pub const initial: u8 = 0 for this step."
  - notMatch: pub\s+const\s+initial:\s+u8\s+=\s+1
    message: "Replace pub const initial: u8 = 1 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `pub` on a declaration allow?
options:
  - Mutation of every field inside the declaration.
  - Access from importing code.
  - Automatic heap allocation.
answer: 1
explain: Public visibility exposes an API without changing its memory semantics.
```
