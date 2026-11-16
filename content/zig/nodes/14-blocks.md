---
title: Labeled blocks
icon: 🏷️
branch: flow
requires:
  - if
summary: A labeled block can produce a value through break :label value.
---

A labeled block can produce a value through break :label value. This expresses local selection without a helper function.

```zig
const std = @import("std");

pub fn main() !void {
    const selected: u8 = choose: {
        break :choose 7;
    };
    std.debug.assert(selected == 7);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about labeled blocks.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const selected: u8 = choose: {
          break :choose 0;
      };
      std.debug.assert(selected == 7);
  }
checks:
  - match: break\s+:choose\s+7
    message: Use break :choose 7 for this step.
  - notMatch: break\s+:choose\s+0
    message: Replace break :choose 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about labeled blocks is correct?
options:
  - break can target only loops.
  - A labeled block always creates a thread.
  - A labeled block can produce a value through break :label value. This expresses local selection
    without a helper function.
answer: 2
explain: A labeled block can produce a value through break :label value. This expresses local
  selection without a helper function.
```
