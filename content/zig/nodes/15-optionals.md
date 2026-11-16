---
title: Optional values
icon: "❓"
branch: flow
requires: [integers]
summary: ?T means "a T, or nothing", and Zig makes you check which.
---
In 2009, Tony Hoare, the inventor of the null reference, called it his "billion-dollar mistake". In most languages any reference might secretly be null, and you find out at runtime.

Zig fixes this with an **[[optional]]** type. A plain `u32` is always a number. A `?u32` is either a number or `null`, and the compiler won't let you treat it as a number until you've checked.

```zig title=find.zig
const std = @import("std");

fn indexOf(haystack: []const u8, needle: u8) ?usize {
    for (haystack, 0..) |c, i| {
        if (c == needle) return i;
    }
    return null;
}

pub fn main() void {
    if (indexOf("hello", 'l')) |i| {
        std.debug.print("found at {d}\n", .{i});
    } else {
        std.debug.print("not found\n", .{});
    }
}
```

The `|i|` is a **[[capture]]**. It's only available inside the `if`, and there it's a real `usize`, not an optional. Outside the `if`, you can't accidentally use the missing value, because there's no name for it.

`while` can capture too. It keeps looping as long as the value isn't null, which suits iterators:

```zig
var it = std.mem.splitScalar(u8, "a,b,c", ',');
while (it.next()) |part| {
    std.debug.print("{s}\n", .{part});
}
```

```compare python
def index_of(haystack, needle):
    for i, c in enumerate(haystack):
        if c == needle:
            return i
    return None    # nothing stops the caller from forgetting this
```

```compare rust
fn index_of(haystack: &[u8], needle: u8) -> Option<usize> {
    haystack.iter().position(|&c| c == needle)
}
```

```exercise
goal: "`findUser` may return nothing. Make the return type optional and return null when there's no match."
code: |-
  fn findUser(id: u32) u32 {
      if (id == 1) return 1001;
      return 0; // 0 means "not found"
  }
checks:
  - match: '\)\s*\?u32'
    message: The return type should be ?u32.
  - match: 'return\s+null'
    message: Return null instead of a magic 0.
solution: |-
  fn findUser(id: u32) ?u32 {
      if (id == 1) return 1001;
      return null;
  }
hint: Put a question mark in front of the return type.
```

```quiz
question: "`const x: ?u8 = 5;` Which line compiles?"
options:
  - "`const y = x + 1;`"
  - "`if (x) |v| { const y = v + 1; _ = y; }`"
  - "`if (x != 0) { const y = x + 1; _ = y; }`"
answer: 1
explain: You have to unwrap the optional before using the number inside. A capture does exactly that.
```
