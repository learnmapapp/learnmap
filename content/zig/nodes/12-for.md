---
title: For with indices
icon: 🌐
branch: flow
requires:
  - arrays
summary: A for loop can traverse multiple inputs, including an index range.
---

A for loop can traverse multiple inputs, including an index range. Captures bind the current values without hidden iterator allocation.

```zig
const std = @import("std");

pub fn main() !void {
    const values = [_]u8{ 2, 4, 6 };
    var total: usize = 0;
    for (values, 0..) |value, index| { total += value + index; }
    std.debug.assert(total == 15);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about for with indices.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const values = [_]u8{ 2, 4, 6 };
      var total: usize = 0;
      for (values, 0..) |value, index| { total -= value + index; }
      std.debug.assert(total == 15);
  }
checks:
  - match: total\s+\+=\s+value\s+\+\s+index
    message: Use total += value + index for this step.
  - notMatch: total\s+\-=\s+value\s+\+\s+index
    message: Replace total -= value + index in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `for (values, 0..) |value, index|` capture?
options:
  - An element and its zero-based index.
  - Two copies of the element.
  - An element and the total collection length.
answer: 0
explain: The second iterable supplies consecutive indices starting at zero.
```
