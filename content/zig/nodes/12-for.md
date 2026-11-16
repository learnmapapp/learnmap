---
title: For with indices
icon: "🔂"
branch: flow
requires: [arrays]
summary: for walks over arrays and slices, optionally with an index or a range.
---
`for` in Zig is only for walking over things: arrays, slices and ranges. The current element is **captured** between pipes:

```zig
const fruits = [_][]const u8{ "apple", "banana", "cherry" };
for (fruits) |fruit| {
    std.debug.print("{s}\n", .{fruit});
}
```

Need the index too? Loop over a second thing at the same time: the range `0..`, which counts up from zero for as long as the first sequence lasts.

```zig title=menu.zig
const std = @import("std");

pub fn main() void {
    const dishes = [_][]const u8{ "soup", "pasta", "tiramisu" };
    for (dishes, 0..) |dish, i| {
        std.debug.print("{d}. {s}\n", .{ i + 1, dish });
    }
}
```

```repl shell
> zig run menu.zig
1. soup
2. pasta
3. tiramisu
```

That "multiple sequences" trick works for any two slices of the same length. Zig checks that the lengths match:

```zig
for (names, ages) |name, age| { ... }
```

A plain range works as well, for when you just want to count: `for (0..5) |i|` gives 0 to 4.

To change the elements while looping, capture a pointer with `*` (you'll learn about [pointers](node:pointers) later):

```zig
var prices = [_]u32{ 10, 20, 30 };
for (&prices) |*price| price.* *= 2; // 20, 40, 60
```

```compare python
for i, dish in enumerate(dishes):
    print(i + 1, dish)
```

```compare javascript
dishes.forEach((dish, i) => console.log(i + 1, dish));
```

```compare rust
for (i, dish) in dishes.iter().enumerate() {
    println!("{}. {}", i + 1, dish);
}
```

```exercise
goal: Print each player with their position. Add the index to the loop.
code: |-
  for (players) |player| {
      std.debug.print("{d}: {s}\n", .{ i, player });
  }
checks:
  - match: 'for\s*\(\s*players\s*,\s*0\.\.\s*\)\s*\|\s*player\s*,\s*i\s*\|'
    message: Loop over players and 0.. together, and capture |player, i|.
solution: |-
  for (players, 0..) |player, i| {
      std.debug.print("{d}: {s}\n", .{ i, player });
  }
```

```quiz
question: What does `for (0..3) |i|` loop over?
options:
  - 0, 1, 2
  - 0, 1, 2, 3
  - 1, 2, 3
answer: 0
explain: Ranges exclude the end, like slices. 0..3 gives 0, 1 and 2.
```
