---
title: While loops
icon: 🛠️
branch: flow
requires:
  - if
  - bindings
summary: A while loop can include a continue expression after the colon.
---

A while loop can include a continue expression after the colon. It runs after each completed iteration or continue.

```zig
const std = @import("std");

pub fn main() !void {
    var count: u8 = 0;
    while (count < 3) : (count += 1) {}
    std.debug.assert(count == 3);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about while loops.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      var count: u8 = 0;
      while (count < 2) : (count += 1) {}
      std.debug.assert(count == 3);
  }
checks:
  - match: count\s+<\s+3
    message: Use count < 3 for this step.
  - notMatch: count\s+<\s+2
    message: Replace count < 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "When does the continue expression in `while (condition) : (step)` run?"
options:
  - Before the first condition check.
  - Only after the condition becomes `false`.
  - After a completed iteration or `continue`.
answer: 2
explain: The continue expression advances loop state between iterations.
```
