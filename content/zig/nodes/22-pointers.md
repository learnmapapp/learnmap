---
title: Single-item pointers
icon: "👉"
branch: data
requires: [bindings]
summary: Take an address with &, follow it with .*, and let functions change your data.
---
A variable is a box in memory. A **[[pointer]]** is a note with the box's address on it. Hand someone the note, and they can go and change what's in the box.

Two operators do all the work:

| Write | Means | Example |
| --- | --- | --- |
| `&x` | the address of x | `const p = &score;` |
| `p.*` | the value at that address | `p.* += 1;` |

The type of a pointer to a `u32` is `*u32`.

```zig title=pointers.zig
const std = @import("std");

fn levelUp(level: *u32) void {
    level.* += 1;
}

pub fn main() void {
    var level: u32 = 1;
    levelUp(&level);
    levelUp(&level);
    std.debug.print("level {d}\n", .{level}); // level 3
}
```

Without the pointer, `levelUp` would get a copy of the number, and could only change the copy (well, it couldn't even do that, because parameters are constant).

A few reassuring facts if pointers make you nervous after C:

- **No null.** A `*u32` always points at something. "Maybe a pointer" is spelled `?*u32`, an optional, and must be checked like any other.
- **No pointer arithmetic** on `*T`. For runs of items, you use [slices](node:slices).
- **Field access follows pointers automatically.** If `p` is a `*Hero`, `p.name` works; you don't need `p.*.name`.

The one real danger is the same as everywhere: a pointer to a local variable is only valid until that function returns.

```compare python
# Python passes references to objects, but you can't
# point at a plain int; you'd return the new value instead.
level = level_up(level)
```

```compare rust
fn level_up(level: &mut u32) {
    *level += 1;
}
level_up(&mut level);
```

```exercise
goal: "`swap` should exchange two values. Complete it using pointers: write `b`'s value into `a`, and the saved value into `b`."
code: |-
  fn swap(a: *i32, b: *i32) void {
      const tmp = a.*;
  }
checks:
  - match: 'a\.\*\s*=\s*b\.\*'
    message: "Copy b's value into a: a.* = b.*;"
  - match: 'b\.\*\s*=\s*tmp'
    message: "Put the saved value into b: b.* = tmp;"
solution: |-
  fn swap(a: *i32, b: *i32) void {
      const tmp = a.*;
      a.* = b.*;
      b.* = tmp;
  }
```

```quiz
question: "`var x: u8 = 5; const p = &x;` What's the type of `p`?"
options:
  - "`u8`"
  - "`*u8`"
  - "`?*u8`"
answer: 1
explain: "&x gives a pointer to x. Because x is a var, the pointer is *u8 and can be used to change it."
```
