---
title: Optional fallbacks
icon: 💬
branch: flow
requires:
  - optionals
summary: orelse provides a value or control-flow action for null.
---

orelse provides a value or control-flow action for null. Use .? only when absence would be a violated invariant.

```zig
const std = @import("std");

pub fn main() !void {
    const requested: ?u8 = null;
    const limit = requested orelse 10;
    std.debug.assert(limit == 10);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional fallbacks.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const requested: ?u8 = null;
      const limit = requested orelse 0;
      std.debug.assert(limit == 10);
  }
checks:
  - match: requested\s+orelse\s+10
    message: Use requested orelse 10 for this step.
  - notMatch: requested\s+orelse\s+0
    message: Replace requested orelse 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about optional fallbacks is correct?
options:
  - .? converts null into zero automatically.
  - orelse provides a value or control-flow action for null. Use .? only when absence would be a
    violated invariant.
  - orelse replaces every zero value.
answer: 1
explain: orelse provides a value or control-flow action for null. Use .? only when absence would be
  a violated invariant.
```
