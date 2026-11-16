---
title: Defer cleanup
icon: "🧹"
branch: errors
requires: [blocks]
summary: Schedule cleanup right next to the setup, and it runs when the scope ends.
---
Guess the output before reading on:

```zig title=order.zig
const std = @import("std");

pub fn main() void {
    std.debug.print("1 check in\n", .{});
    defer std.debug.print("2 check out\n", .{});

    std.debug.print("3 unpack\n", .{});
    defer std.debug.print("4 pack up\n", .{});

    std.debug.print("5 enjoy the view\n", .{});
}
```

```repl shell
> zig run order.zig
1 check in
3 unpack
5 enjoy the view
4 pack up
2 check out
```

`defer` runs its statement **when the enclosing block ends**, however it ends: falling off the end, `return`, `break`, or an error passed on with `try`. When there are several, they run **in reverse order**: last deferred, first run. That's what you want. You pack up before checking out, just as you'd close a file before deleting the folder it's in.

The big win is that cleanup sits right next to setup:

```zig
const file = try std.fs.cwd().openFile("notes.txt", .{});
defer file.close();
// ...fifty lines and three early returns later, the file is still closed
```

You can't forget it on one of the early returns, because there's nothing to remember.

Two details:

- "Scope" means the nearest `{ }`, not the function. A `defer` inside a loop body runs at the end of every iteration.
- The deferred code runs later, but it can't `return` or use `try`. Cleanup has nowhere to send an error.

```compare python
with open("notes.txt") as f:
    ...  # closed when the block ends
```

```compare javascript
const file = await open("notes.txt");
try { /* ... */ } finally { await file.close(); }
```

```compare rust
// Rust closes files automatically when they go out
// of scope (Drop); Zig makes you say it with defer.
```

```exercise
goal: The lock is released at the end, but not on the early return. Use defer straight after taking the lock, and remove the manual unlock.
code: |-
  fn bump(counter: *Counter) void {
      counter.lock();
      if (counter.value == max) return;
      counter.value += 1;
      counter.unlock();
  }
checks:
  - match: 'counter\.lock\(\);\s*\n\s*defer\s+counter\.unlock\(\);'
    message: Put defer counter.unlock(); on the line right after counter.lock();
  - notMatch: '^\s*counter\.unlock\(\);'
    message: Remove the old unlock at the end, or it runs twice.
solution: |-
  fn bump(counter: *Counter) void {
      counter.lock();
      defer counter.unlock();
      if (counter.value == max) return;
      counter.value += 1;
  }
```

```quiz
question: "`defer a(); defer b(); defer c();` In which order do they run at the end of the scope?"
options:
  - a, b, c
  - c, b, a
  - All at once, in any order
answer: 1
explain: Defers run in reverse, so the last thing set up is the first thing torn down.
```
