---
title: Struct fields
icon: 🚦
branch: data
requires:
  - strings
summary: Structs combine named fields and defaults into a domain type.
---

Structs combine named fields and defaults into a domain type. Field initialization makes which data is being supplied visible.

```zig
const std = @import("std");
const Task = struct { title: []const u8, done: bool = false };
pub fn main() !void {
    const task = Task{ .title = "Practice" };
    std.debug.assert(!task.done);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about struct fields.
lang: zig
code: |-
  const std = @import("std");
  const Task = struct { title: []const u8, done: bool = true };
  pub fn main() !void {
      const task = Task{ .title = "Practice" };
      std.debug.assert(!task.done);
  }
checks:
  - match: done:\s+bool\s+=\s+false
    message: "Use done: bool = false for this step."
  - notMatch: done:\s+bool\s+=\s+true
    message: "Replace done: bool = true in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "For a field declared `done: bool = false`, what happens if initialization omits it?"
options:
  - The field is left `undefined`.
  - The initializer always fails.
  - The field uses `false`.
answer: 2
explain: A declared field default supplies an omitted initializer value.
```
