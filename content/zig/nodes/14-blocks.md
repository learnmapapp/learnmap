---
title: Labeled blocks
icon: "🏷️"
branch: flow
requires: [if]
summary: Give a block a label, and break out of it with a value.
---
Puzzle first. What does this print?

```zig title=puzzle.zig
const std = @import("std");

pub fn main() void {
    const word = "racecar";
    const result = check: {
        for (0..word.len / 2) |i| {
            if (word[i] != word[word.len - 1 - i]) break :check "nope";
        }
        break :check "palindrome!";
    };
    std.debug.print("{s}\n", .{result});
}
```

It prints `palindrome!`. The interesting part is the shape: `check: { ... }` is a **labeled block**. Inside it, `break :check value` leaves the block immediately, and the whole block takes on that value.

That solves a common annoyance. Without it, you'd write something like:

```zig
var result: []const u8 = "palindrome!";
for (0..word.len / 2) |i| {
    if (word[i] != word[word.len - 1 - i]) {
        result = "nope";
        break;
    }
}
```

That gives you a `var`, a default that's set far away from the logic, and a `break` that only breaks the loop. The labeled version keeps everything in one expression, and `result` stays a `const`.

Any name works as a label. You'll often see `blk:` in real code, because nobody could think of a better one.

Labels also work on loops. `break :outer` jumps out of nested loops in one go:

```zig
outer: for (grid) |row| {
    for (row) |cell| {
        if (cell == target) break :outer;
    }
}
```

```exercise
goal: Turn this into a labeled block called `blk`, so that `size` can be a const.
code: |-
  var size: u32 = 0;
  if (bytes > 1000) {
      size = bytes / 1000;
  } else {
      size = bytes;
  }
checks:
  - match: 'const\s+size\s*=\s*blk:\s*\{'
    message: "Start with const size = blk: {"
  - match: 'break\s+:blk\s+bytes\s*/\s*1000'
    message: Use break :blk to give the block its value.
  - notMatch: 'var\s+size'
    message: size shouldn't be a var any more.
solution: |-
  const size = blk: {
      if (bytes > 1000) break :blk bytes / 1000;
      break :blk bytes;
  };
hint: Each path out of the block needs a break :blk with the value for that case.
```

```quiz
question: What does `break :blk 42` do?
options:
  - Breaks out of the nearest loop and returns 42 from the function.
  - Leaves the block labeled blk and makes the block's value 42.
  - Jumps back to the start of the block labeled blk.
answer: 1
explain: break with a label exits that specific block, and the value after it becomes the block's result.
```
