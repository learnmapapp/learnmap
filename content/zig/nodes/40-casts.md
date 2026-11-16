---
title: Checked conversions
icon: 💬
branch: comptime
requires:
  - integers
summary: "@intCast converts to an inferred integer destination and requires the value to fit."
---

@intCast converts to an inferred integer destination and requires the value to fit. @truncate deliberately discards high bits and expresses a different operation.

```zig
const std = @import("std");

pub fn main() !void {
    const wide: u16 = 42;
    const narrow: u8 = @intCast(wide);
    std.debug.assert(narrow == 42);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about checked conversions.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const wide: u16 = 42;
      const narrow: u8 = @truncate(wide);
      std.debug.assert(narrow == 42);
  }
checks:
  - match: "@intCast\\(wide\\)"
    message: Use @intCast(wide) for this step.
  - notMatch: "@truncate\\(wide\\)"
    message: Replace @truncate(wide) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How does `@intCast` differ from `@truncate`?
options:
  - "`@truncate` returns an error union while `@intCast` returns an optional."
  - "`@intCast` requires representability; `@truncate` deliberately discards high bits."
  - Both always discard high bits without a representability requirement.
answer: 1
explain: Choose the conversion that expresses the intended treatment of out-of-range values.
```
