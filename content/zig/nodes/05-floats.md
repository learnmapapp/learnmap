---
title: Floating-point values
icon: 🚦
branch: basics
requires:
  - integers
summary: Choose f32 or f64 deliberately.
---

Choose f32 or f64 deliberately. Binary floating-point cannot represent every decimal fraction exactly, so use tolerances for approximate calculations.

```zig
const std = @import("std");

pub fn main() !void {
    const ratio: f64 = 1.5;
    const result = ratio * 2.0;
    std.debug.assert(result == 3.0);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about floating-point values.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const ratio: f64 = 1.5;
      const result = ratio + 2.0;
      std.debug.assert(result == 3.0);
  }
checks:
  - match: ratio\s+\*\s+2\.0
    message: Use ratio * 2.0 for this step.
  - notMatch: ratio\s+\+\s+2\.0
    message: Replace ratio + 2.0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about floating-point values is correct?
options:
  - Every decimal fraction has an exact binary floating representation.
  - f32 always offers more precision than f64.
  - Choose f32 or f64 deliberately. Binary floating-point cannot represent every decimal fraction
    exactly, so use tolerances for approximate calculations.
answer: 2
explain: Choose f32 or f64 deliberately. Binary floating-point cannot represent every decimal
  fraction exactly, so use tolerances for approximate calculations.
```
