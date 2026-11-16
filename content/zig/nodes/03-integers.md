---
title: Integer types
icon: 🔢
branch: basics
requires:
  - bindings
summary: Integer types encode signedness and bit width.
---

Integer types encode signedness and bit width. Widening a u8 into u16 preserves its range without an explicit narrowing cast.

```zig
const std = @import("std");

pub fn main() !void {
    const count: u8 = 200;
    const wide: u16 = count;
    std.debug.assert(wide == 200);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about integer types.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const count: u8 = 200;
      const wide: u16 = count;
      std.debug.assert(wide == 100);
  }
checks:
  - match: wide\s+==\s+200
    message: Use wide == 200 for this step.
  - notMatch: wide\s+==\s+100
    message: Replace wide == 100 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about integer types is correct?
options:
  - Integer types encode signedness and bit width. Widening a u8 into u16 preserves its range
    without an explicit narrowing cast.
  - u8 can represent negative integers.
  - Every integer type occupies exactly 64 bits.
answer: 0
explain: Integer types encode signedness and bit width. Widening a u8 into u16 preserves its range
  without an explicit narrowing cast.
```
