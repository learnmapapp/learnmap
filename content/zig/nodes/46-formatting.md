---
title: Formatted output
icon: "🖨️"
branch: tools
requires: [strings, allocators]
summary: The format specifiers you'll use daily, and three places to send the output.
---
You've been using format strings since lesson one. Here's the whole picture, in cheat-sheet form.

**What goes inside the braces**

| Specifier | For | `42` or `"hi"` prints |
| --- | --- | --- |
| `{d}` | numbers, in decimal | `42` |
| `{x}` | numbers, in hexadecimal | `2a` |
| `{b}` | numbers, in binary | `101010` |
| `{c}` | a byte, as a character | `*` |
| `{s}` | strings | `hi` |
| `{any}` | anything, debug style | `42` |
| `{}` | the type's default format | `42` |

Add options after a colon: `{d:.2}` for two decimals, `{d:0>4}` to pad with zeros to four digits (`0042`). `{{` and `}}` print literal braces.

**Where the result goes**

```zig title=format.zig
const std = @import("std");

pub fn main() !void {
    // 1. Straight to stderr, for debugging and quick scripts
    std.debug.print("score: {d}\n", .{42});

    // 2. Into a buffer you provide: no allocation at all
    var buf: [32]u8 = undefined;
    const id = try std.fmt.bufPrint(&buf, "user-{d:0>4}", .{7});

    // 3. Into new memory from an allocator: you free it
    const allocator = std.heap.page_allocator;
    const msg = try std.fmt.allocPrint(allocator, "{s} logged in", .{id});
    defer allocator.free(msg);

    std.debug.print("{s}\n", .{msg}); // user-0007 logged in
}
```

Pick `bufPrint` when you know a maximum size (it returns `error.NoSpaceLeft` if the text doesn't fit), and `allocPrint` when you don't.

The format string is checked **at compile time**. Too few arguments, too many, or `{d}` given a string: all compile errors, not mysterious output.

```repl shell
> zig run format.zig
error: too few arguments
```

```compare python
f"user-{7:04d}"   # 'user-0007'
```

```compare javascript
`user-${String(7).padStart(4, "0")}`
```

```compare rust
format!("user-{:04}", 7)
```

```exercise
goal: The receipt line doesn't compile. Use the right specifiers, a string for the item and a number with two decimals for the price.
code: |-
  std.debug.print("{d}: {s}\n", .{ item, price });
checks:
  - match: '"\{s\}: \{d:\.2\}\\n"'
    message: "Use {s} for the item and {d:.2} for the price."
solution: |-
  std.debug.print("{s}: {d:.2}\n", .{ item, price });
hint: The specifiers are matched to the arguments in order.
```

```quiz
question: What happens if a format string has two `{d}`s but you pass only one argument?
options:
  - The second prints as empty.
  - It's a compile error.
  - It panics at runtime.
answer: 1
explain: Zig checks format strings during compilation, so mismatches never reach runtime.
```
