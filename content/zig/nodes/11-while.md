---
title: While loops
icon: "🔁"
branch: flow
requires: [if, bindings]
summary: Loop with while, and keep the counter update in one visible place.
---
Zig has no C-style `for (i = 0; i < n; i++)`. Counting loops use `while` instead, with an optional **continue expression** after a colon. It runs at the end of every iteration:

```zig title=countdown.zig
const std = @import("std");

pub fn main() void {
    var i: u8 = 3;
    while (i > 0) : (i -= 1) {
        std.debug.print("{d}... ", .{i});
    }
    std.debug.print("liftoff! 🚀\n", .{});
}
```

```repl shell
> zig run countdown.zig
3... 2... 1... liftoff! 🚀
```

Why not just write `i -= 1` at the bottom of the loop body? Because of `continue`. It skips straight to the next iteration, and the continue expression still runs. With the update in the body, a `continue` would skip it, and you'd loop forever:

```zig
var n: u32 = 0;
while (n < 10) : (n += 1) {
    if (n % 2 == 0) continue; // still increments n
    std.debug.print("{d} ", .{n}); // 1 3 5 7 9
}
```

`break` leaves the loop early, as usual. And `while (true)` is a perfectly fine infinite loop, as long as something inside it breaks out.

```compare python
i = 3
while i > 0:
    print(i)
    i -= 1
```

```compare javascript
for (let i = 3; i > 0; i--) {
  console.log(i);
}
```

```exercise
goal: This loop never ends, because `continue` skips the increment. Move the increment into a continue expression.
code: |-
  var n: u32 = 0;
  while (n < 10) {
      if (n == 5) continue;
      total += n;
      n += 1;
  }
checks:
  - match: 'while\s*\(n\s*<\s*10\)\s*:\s*\(n\s*\+=\s*1\)'
    message: "Put the increment after the condition: while (n < 10) : (n += 1)"
  - notMatch: '\n\s*n\s*\+=\s*1;'
    message: Remove the increment from the loop body, or n goes up twice.
solution: |-
  var n: u32 = 0;
  while (n < 10) : (n += 1) {
      if (n == 5) continue;
      total += n;
  }
```

```quiz
question: "In `while (i < 3) : (i += 1)`, when does `i += 1` run?"
options:
  - Only before the first iteration.
  - At the end of every iteration, including after continue.
  - Only when the loop body finishes without continue.
answer: 1
explain: The continue expression runs after every iteration, whichever way the body ended (except break).
```
