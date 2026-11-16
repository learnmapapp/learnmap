---
title: Named errors
icon: 🌐
branch: errors
requires:
  - enums
summary: An error set names possible failures.
---

An error set names possible failures. Keep domain errors small and descriptive so callers can handle the relevant cases.

A useful term here is [[error set]]: A type containing a declared set of named errors.

```zig
const std = @import("std");
const InputError = error{ Empty, Invalid };
pub fn main() !void {
    const failure: InputError = error.Empty;
    std.debug.assert(failure == error.Empty);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about named errors.
lang: zig
code: |-
  const std = @import("std");
  const InputError = error{ Empty, Invalid };
  pub fn main() !void {
      const failure: InputError = error.Invalid;
      std.debug.assert(failure == error.Empty);
  }
checks:
  - match: error\.Empty;
    message: Use error.Empty; for this step.
  - notMatch: error\.Invalid;
    message: Replace error.Invalid; in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about named errors is correct?
options:
  - An error set names possible failures. Keep domain errors small and descriptive so callers can
    handle the relevant cases.
  - Error sets store arbitrary payload strings.
  - Declaring an error automatically throws it.
answer: 0
explain: An error set names possible failures. Keep domain errors small and descriptive so callers
  can handle the relevant cases.
```
