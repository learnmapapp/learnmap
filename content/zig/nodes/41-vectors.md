---
title: SIMD vectors
icon: 🚦
branch: comptime
requires:
  - arrays
summary: Vector arithmetic operates lane by lane.
---

Vector arithmetic operates lane by lane. @splat fills each lane and @reduce combines lanes using a selected operation.

```zig
const std = @import("std");

pub fn main() !void {
    const a: @Vector(4, i32) = .{ 1, 2, 3, 4 };
    const b: @Vector(4, i32) = @splat(2);
    const result = a * b;
    std.debug.assert(@reduce(.Add, result) == 20);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about simd vectors.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const a: @Vector(4, i32) = .{ 1, 2, 3, 4 };
      const b: @Vector(4, i32) = @splat(2);
      const result = a + b;
      std.debug.assert(@reduce(.Add, result) == 20);
  }
checks:
  - match: const\s+result\s+=\s+a\s+\*\s+b
    message: Use const result = a * b for this step.
  - notMatch: const\s+result\s+=\s+a\s+\+\s+b
    message: Replace const result = a + b in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What is `@reduce(.Add, @Vector(4, i32){ 2, 4, 6, 8 })`?
options:
  - A vector containing `2, 4, 6, 8`.
  - "`8`"
  - "`20`"
answer: 2
explain: An additive horizontal reduction sums the vector's lanes.
```
