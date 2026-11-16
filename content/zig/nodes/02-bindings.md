---
title: const and var
icon: 🏷️
branch: basics
requires:
  - zig
summary: const prevents changing a binding; var supplies mutable storage.
---

const prevents changing a binding; var supplies mutable storage. Zig diagnoses local var declarations that are never mutated.

```zig
const std = @import("std");

pub fn main() !void {
    const step: u8 = 2;
    var score: u8 = 1;
    score += step;
    std.debug.assert(score == 3);
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
score = 1
score += 2
print(score)
```

```compare javascript
let score = 1;
score += 2;
console.log(score);
```

```compare rust
fn main() {
    let mut score = 1;
    score += 2;
    println!("{score}");
}
```

```exercise
goal: Repair the starting example using what you learned about const and var.
lang: zig
code: |-
  const std = @import("std");

  pub fn main() !void {
      const step: u8 = 2;
      var score: u8 = 1;
      score -= step;
      std.debug.assert(score == 3);
  }
checks:
  - match: score\s+\+=\s+step
    message: Use score += step for this step.
  - notMatch: score\s+\-=\s+step
    message: Replace score -= step in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which binding can be reassigned?
options:
  - "`const score: u8 = 1;`"
  - "`const score = @as(u8, 1);`"
  - "`var score: u8 = 1;`"
answer: 2
explain: Use `var` for mutable storage and `const` when the binding does not change.
```
