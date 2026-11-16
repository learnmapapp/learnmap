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
question: How does a labeled block produce a value?
options:
  - With `continue :label value`.
  - By assigning to the label's name.
  - With `break :label value`.
answer: 2
explain: A labeled break supplies the block expression's result.
```
