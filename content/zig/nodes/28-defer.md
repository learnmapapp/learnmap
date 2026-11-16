---
title: Scope-exit cleanup
icon: 💬
branch: errors
requires:
  - blocks
summary: defer executes when the current scope exits.
---

defer executes when the current scope exits. Place cleanup beside resource acquisition and remember that deferred actions run in reverse order.

```zig
const std = @import("std");

pub fn main() !void {
    var value: u8 = 0;
    {
        defer value += 1;
        value = 4;
    }
    std.debug.assert(value == 5);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about scope-exit cleanup.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var value: u8 = 0;
      {
          defer value += 2;
          value = 4;
      }
      std.debug.assert(value == 5);
  }
checks:
  - match: defer\s+value\s+\+=\s+1
    message: Use defer value += 1 for this step.
  - notMatch: defer\s+value\s+\+=\s+2
    message: Replace defer value += 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When does an ordinary `defer` execute?
options:
  - Immediately when it is declared.
  - On exit from its enclosing scope.
  - Only when that scope returns an error.
answer: 1
explain: Ordinary scope cleanup applies to both successful and error exits.
```
