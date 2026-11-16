---
title: Explicit overflow
icon: 💬
branch: basics
requires:
  - integers
summary: Wrapping operators such as +% make overflow behavior explicit.
---

Wrapping operators such as +% make overflow behavior explicit. Ordinary overflowing arithmetic is illegal behavior and is checked in safety-enabled builds.

```zig
const std = @import("std");

pub fn main() !void {
    const value: u8 = 255;
    const wrapped = value +% 1;
    std.debug.assert(wrapped == 0);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about explicit overflow.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const value: u8 = 255;
      const wrapped = value -% 1;
      std.debug.assert(wrapped == 0);
  }
checks:
  - match: value\s+\+%\s+1
    message: Use value +% 1 for this step.
  - notMatch: value\s+\-%\s+1
    message: Replace value -% 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about explicit overflow is correct?
options:
  - +% saturates at the largest representable value.
  - Wrapping operators such as +% make overflow behavior explicit. Ordinary overflowing arithmetic
    is illegal behavior and is checked in safety-enabled builds.
  - Ordinary + always wraps in every build mode.
answer: 1
explain: Wrapping operators such as +% make overflow behavior explicit. Ordinary overflowing
  arithmetic is illegal behavior and is checked in safety-enabled builds.
```
