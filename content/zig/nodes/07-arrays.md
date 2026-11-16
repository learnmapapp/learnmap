---
title: Fixed arrays
icon: 📋
branch: data
requires:
  - integers
summary: An array’s length is part of its type.
---

An array’s length is part of its type. The underscore in [_] asks the compiler to infer that length from the initializer.

```zig
const std = @import("std");

pub fn main() !void {
    const values = [_]u8{ 2, 4, 6 };
    std.debug.assert(values.len == 3);
    std.debug.assert(values[0] == 2);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
values = [2, 4, 6]
print(values[0], len(values))
```

```compare javascript
const values = [2, 4, 6];
console.log(values[0], values.length);
```

```compare rust
fn main() {
    let values = vec![2, 4, 6];
    println!("{} {}", values[0], values.len());
}
```

```exercise
goal: Repair the starting example using what you learned about fixed arrays.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const values = [_]u8{ 2, 4, 6 };
      std.debug.assert(values.len == 3);
      std.debug.assert(values[1] == 2);
  }
checks:
  - match: values\[0\]\s+==\s+2
    message: Use values[0] == 2 for this step.
  - notMatch: values\[1\]\s+==\s+2
    message: Replace values[1] == 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about fixed arrays is correct?
options:
  - Arrays use one-based indices.
  - An array’s length is part of its type. The underscore in [_] asks the compiler to infer that
    length from the initializer.
  - Arrays grow automatically on append.
answer: 1
explain: An array’s length is part of its type. The underscore in [_] asks the compiler to infer
  that length from the initializer.
```
