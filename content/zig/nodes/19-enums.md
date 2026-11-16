---
title: Enum states
icon: 📋
branch: data
requires:
  - structs
summary: An enum names a finite set of tags.
---

An enum names a finite set of tags. The .tag shorthand works when the surrounding context determines the enum type.

```zig
const std = @import("std");
const Status = enum { todo, doing, done };
pub fn main() !void {
    const status = Status.doing;
    std.debug.assert(status != .done);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about enum states.
lang: zig
code: |-
  const std = @import("std");
  const Status = enum { todo, doing, done };
  pub fn main() !void {
      const status = Status.todo;
      std.debug.assert(status != .done);
  }
checks:
  - match: Status\.doing
    message: Use Status.doing for this step.
  - notMatch: Status\.todo
    message: Replace Status.todo in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about enum states is correct?
options:
  - All enums can hold arbitrary undeclared tags.
  - An enum names a finite set of tags. The .tag shorthand works when the surrounding context
    determines the enum type.
  - Enum tags must always be strings.
answer: 1
explain: An enum names a finite set of tags. The .tag shorthand works when the surrounding context
  determines the enum type.
```
