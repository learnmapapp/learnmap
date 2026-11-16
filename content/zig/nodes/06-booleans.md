---
title: Boolean logic
icon: 🔁
branch: basics
requires:
  - bindings
summary: Zig uses and, or, and ! for Boolean logic.
---

Zig uses and, or, and ! for Boolean logic. Conditions require bool rather than treating integers as truth values.

```zig
const std = @import("std");

pub fn main() !void {
    const ready = true;
    const blocked = false;
    std.debug.assert(ready and !blocked);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about boolean logic.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const ready = true;
      const blocked = false;
      std.debug.assert(ready and blocked);
  }
checks:
  - match: ready\s+and\s+!blocked
    message: Use ready and !blocked for this step.
  - notMatch: ready\s+and\s+blocked
    message: Replace ready and blocked in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which expression means “ready and not blocked” in Zig?
options:
  - "`ready and !blocked`"
  - "`ready && !blocked`"
  - "`ready and blocked`"
answer: 0
explain: Zig uses `and` for Boolean conjunction and `!` for negation.
```
