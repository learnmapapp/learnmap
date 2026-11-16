---
title: Borrowed slices
icon: "🍕"
branch: data
requires: [arrays]
summary: A slice is a window onto an array, made of a pointer and a length.
---
An array owns its elements. A **[[slice]]** just *looks at* elements that live somewhere else. Under the hood it's two things: a pointer to the first element, and a length. Its type is written `[]T`, with no number in the brackets, because the length is only known at runtime.

You make one with a range, `start..end`. The end is excluded, just like Python's slicing:

```zig title=slices.zig
const std = @import("std");

pub fn main() void {
    var pizza = [_]u8{ 1, 2, 3, 4, 5, 6, 7, 8 };
    const my_half: []u8 = pizza[0..4];
    const your_half: []u8 = pizza[4..];

    my_half[0] = 0; // eat a slice
    std.debug.print("{d} {any}\n", .{ pizza[0], your_half });
}
```

```repl shell
> zig run slices.zig
0 { 5, 6, 7, 8 }
```

`my_half[0] = 0` changed `pizza[0]`. The slice didn't copy anything: both names point at the same memory.

Slices are the usual way to pass "some number of things" to a function. The same function then works for arrays of any length:

```zig
fn sum(numbers: []const u32) u32 {
    var total: u32 = 0;
    for (numbers) |n| total += n;
    return total;
}
```

`[]const u32` is a read-only slice: the function promises not to change the numbers. That's what you want most of the time.

```warn
A slice borrows. If the array it points into goes away, for example because it was a local variable in a function that returned, the slice points at garbage. Zig won't always catch this for you, unlike Rust.
```

```exercise
goal: Make `middle` a slice of the three middle elements of `row` (indexes 1, 2 and 3).
code: |-
  const row = [_]u8{ 9, 1, 2, 3, 9 };
  const middle = row[1..3];
checks:
  - match: 'row\[1\.\.4\]'
    message: The end of a range is excluded. Which end index includes index 3?
solution: |-
  const row = [_]u8{ 9, 1, 2, 3, 9 };
  const middle = row[1..4];
```

```quiz
question: "`var a = [_]u8{ 1, 2, 3 }; const s = a[1..]; s[0] = 7;` What is `a` now?"
options:
  - "`{ 1, 2, 3 }`"
  - "`{ 7, 2, 3 }`"
  - "`{ 1, 7, 3 }`"
answer: 2
explain: s starts at index 1 of a, so s[0] is a[1]. The slice shares memory with the array.
```
