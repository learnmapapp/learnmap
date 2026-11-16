---
title: Allocator parameters
icon: "🧠"
branch: memory
requires: [slices, defer, try]
summary: Zig never allocates behind your back; functions that need memory ask for an allocator.
---
In most languages, memory just appears: create a list, concatenate a string, and somewhere a heap allocation happens. In Zig, any function that needs heap memory takes an **[[allocator]]** as a parameter. You can see from a function's signature whether it allocates.

```zig title=shout.zig
const std = @import("std");

fn shout(allocator: std.mem.Allocator, text: []const u8) ![]u8 {
    const loud = try allocator.alloc(u8, text.len);
    for (text, loud) |c, *out| out.* = std.ascii.toUpper(c);
    return loud;
}

pub fn main() !void {
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const msg = try shout(allocator, "hello");
    defer allocator.free(msg);
    std.debug.print("{s}\n", .{msg}); // HELLO
}
```

The core of the allocator interface fits on a sticky note:

| Call | Returns | Undo with |
| --- | --- | --- |
| `allocator.alloc(T, n)` | `![]T`, room for n items | `allocator.free(slice)` |
| `allocator.create(T)` | `!*T`, room for one item | `allocator.destroy(ptr)` |

Both can fail with `error.OutOfMemory`, hence the `try`.

Notice `shout` doesn't free `loud`, it returns it. **Ownership passes to the caller**, and `main` frees it with `defer`. Good Zig documentation says who owns what, and a function that hands back allocated memory will tell you to free it.

**`DebugAllocator`** is the one to use while developing. It's a general-purpose allocator that also tracks every allocation. Forget a `free`, and `gpa.deinit()` reports the leak, with a stack trace showing where the memory was allocated:

```repl shell
> zig run shout.zig
HELLO
error(gpa): memory address 0x7f... leaked:
shout.zig:4:41: in shout
```

The next few lessons look at other allocators, each with a different strategy. Because every function takes the `std.mem.Allocator` interface, they all work everywhere.

```exercise
goal: This program leaks the greeting. Free it as soon as it's created, using defer.
code: |-
  const greeting = try std.fmt.allocPrint(allocator, "hi {s}", .{name});
  std.debug.print("{s}\n", .{greeting});
checks:
  - match: 'defer\s+allocator\.free\(greeting\)'
    message: Add defer allocator.free(greeting); after the allocation.
solution: |-
  const greeting = try std.fmt.allocPrint(allocator, "hi {s}", .{name});
  defer allocator.free(greeting);
  std.debug.print("{s}\n", .{greeting});
```

```quiz
question: Why do Zig functions take an allocator as a parameter instead of using a global one?
options:
  - It's faster to pass a parameter.
  - So allocation is visible, and callers choose the memory strategy.
  - Zig has no heap without one.
answer: 1
explain: The caller can see which functions allocate, and can plug in an arena, a fixed buffer, or a testing allocator.
```
