---
title: Struct methods
icon: 🔁
branch: data
requires:
  - structs
  - functions
summary: A method is a function in a type’s namespace.
---

A method is a function in a type’s namespace. A *Self receiver allows mutation; @`This()` names the containing type.

```zig
const std = @import("std");
const Counter = struct {
    value: u8 = 0,
    fn increment(self: *@This()) void { self.value += 1; }
};
pub fn main() !void {
    var counter = Counter{};
    counter.increment();
    std.debug.assert(counter.value == 1);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about struct methods.
lang: zig
code: |-
  const std = @import("std");
  const Counter = struct {
      value: u8 = 0,
      fn increment(self: *@This()) void { self.value -= 1; }
  };
  pub fn main() !void {
      var counter = Counter{};
      counter.increment();
      std.debug.assert(counter.value == 1);
  }
checks:
  - match: self\.value\s+\+=\s+1
    message: Use self.value += 1 for this step.
  - notMatch: self\.value\s+\-=\s+1
    message: Replace self.value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "Why declare the counter receiver as `self: *@This()`?"
options:
  - To permit mutation of the original counter.
  - To copy the counter into a read-only parameter.
  - To allocate a counter automatically.
answer: 0
explain: A mutable pointer receiver can update the caller's instance.
```
