---
title: Typed functions
icon: 🧪
branch: flow
requires:
  - integers
summary: Functions declare parameter and return types.
---

Functions declare parameter and return types. A return statement makes the result explicit; unused results must be intentionally handled.

```zig
const std = @import("std");
fn square(value: u32) u32 { return value * value; }
pub fn main() !void {
    std.debug.assert(square(6) == 36);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
def square(value: int) -> int:
    return value * value

print(square(6))
```

```compare javascript
function square(value) { return value * value; }
console.log(square(6));
```

```compare rust
fn square(value: i32) -> i32 { value * value }
fn main() { println!("{}", square(6)); }
```

```exercise
goal: Repair the starting example using what you learned about typed functions.
lang: zig
code: |-
  const std = @import("std");
  fn square(value: u32) u32 { return value + value; }
  pub fn main() !void {
      std.debug.assert(square(6) == 36);
  }
checks:
  - match: value\s+\*\s+value
    message: Use value * value for this step.
  - notMatch: value\s+\+\s+value
    message: Replace value + value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What must a function returning `u32` do on every normal return path?
options:
  - Return `null` when no result is written.
  - Return a compatible `u32` value.
  - End with an implicit final expression.
answer: 1
explain: Zig uses explicit return statements for normal value results.
```
