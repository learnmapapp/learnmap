---
title: UTF-8 byte strings
icon: "🔤"
branch: data
requires: [slices]
summary: A Zig string is just a slice of bytes, and that has consequences.
---
Zig has no special string type. A string is a slice of bytes: `[]const u8`. The text is stored as UTF-8, so English letters take one byte each, and characters like `é` or `🦎` take more.

That has a few consequences that surprise newcomers:

```zig title=strings.zig
const std = @import("std");

pub fn main() void {
    const word = "café";
    std.debug.print("{d} bytes\n", .{word.len}); // 5, not 4!
    std.debug.print("first byte: {c}\n", .{word[0]}); // c

    const a = "zig";
    const b = "zig";
    std.debug.print("equal: {}\n", .{std.mem.eql(u8, a, b)});
}
```

1. **`.len` counts bytes, not characters.** `é` is two bytes in UTF-8.
2. **Indexing gives you a byte**, a `u8`. `{c}` prints it as a character.
3. **`==` doesn't compare text.** It isn't allowed on slices at all. Use `std.mem.eql(u8, a, b)`, where `u8` says what kind of elements to compare.

A few more tools from `std.mem` that you'll use all the time:

```zig
std.mem.startsWith(u8, "zig build", "zig"); // true
std.mem.indexOf(u8, "hello", "ll"); // 2 (or null if not found)
std.mem.trim(u8, "  hi  ", " "); // "hi"
```

To print a string, use `{s}`. Without it, Zig doesn't know whether you mean text or a list of numbers.

```compare python
word = "café"
len(word)          # 4 characters
word == "café"     # True
```

```compare javascript
const word = "café";
word.length;       // 4 UTF-16 units
word === "café";   // true
```

```compare rust
let word = "café";
word.len();        // 5 bytes, like Zig
word == "café";    // true
```

```exercise
goal: Check whether the command is "quit". `==` doesn't work on strings in Zig.
code: |-
  const std = @import("std");

  fn isQuit(command: []const u8) bool {
      return command == "quit";
  }
checks:
  - notMatch: 'command\s*=='
    message: Slices can't be compared with ==.
  - match: 'std\.mem\.eql\(u8,\s*command,\s*"quit"\)'
    message: Use std.mem.eql(u8, command, "quit").
solution: |-
  const std = @import("std");

  fn isQuit(command: []const u8) bool {
      return std.mem.eql(u8, command, "quit");
  }
```

```quiz
question: What does `"naïve".len` return?
options:
  - "5"
  - "6"
  - It doesn't compile.
answer: 1
explain: "ï is two bytes in UTF-8, so five characters take six bytes. .len counts bytes."
```
