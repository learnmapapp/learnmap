---
title: Switch expressions
icon: 🔧
branch: flow
requires:
  - enums
summary: switch can produce a value and must cover the possible inputs.
---

switch can produce a value and must cover the possible inputs. Enum cases help the compiler identify missing alternatives.

```zig
const std = @import("std");
const Status = enum { todo, doing, done };
pub fn main() !void {
    const status = Status.doing;
    const label: []const u8 = switch (status) {
        .todo => "start",
        .doing => "continue",
        .done => "finished",
    };
    std.debug.assert(std.mem.eql(u8, label, "continue"));
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about switch expressions.
lang: zig
code: |-
  const std = @import("std");
  const Status = enum { todo, doing, done };
  pub fn main() !void {
      const status = Status.doing;
      const label: []const u8 = switch (status) {
          .todo => "start",
          .doing => "wait",
          .done => "finished",
      };
      std.debug.assert(std.mem.eql(u8, label, "continue"));
  }
checks:
  - match: \.doing\s+=>\s+"continue"
    message: Use .doing => "continue" for this step.
  - notMatch: \.doing\s+=>\s+"wait"
    message: Replace .doing => "wait" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What should happen when an exhaustive enum `switch` misses a newly added tag?
options:
  - The switch silently chooses its first branch.
  - The missing tag becomes `null`.
  - Compilation should identify the unhandled case.
answer: 2
explain: Explicit exhaustive handling lets type changes surface in affected switches.
```
