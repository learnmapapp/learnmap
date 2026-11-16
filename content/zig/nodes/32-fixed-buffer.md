---
title: Fixed buffers
icon: "🪣"
branch: memory
requires: [allocators, arrays]
summary: Use a plain array as all the memory a function is allowed to have.
---
Sometimes you don't want the heap at all. Maybe you're on a microcontroller without one, or you're in a hot loop where a heap call is too slow, or you just want a hard limit on how much memory something may use.

A **`FixedBufferAllocator`** turns an ordinary array into an allocator:

```zig title=label.zig
const std = @import("std");

pub fn main() !void {
    var buffer: [64]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&buffer);
    const allocator = fba.allocator();

    const label = try std.fmt.allocPrint(allocator, "Player {d}", .{7});
    std.debug.print("{s}\n", .{label}); // Player 7

    // 1000 bytes don't fit in a 64-byte buffer:
    std.debug.print("{any}\n", .{allocator.alloc(u8, 1000)}); // error.OutOfMemory
}
```

Line by line:

- `var buffer: [64]u8 = undefined;` reserves 64 bytes on the stack. `undefined` means "I'll fill this in later, don't bother zeroing it".
- `init(&buffer)` hands the allocator a pointer to that memory.
- After that, it's a normal `std.mem.Allocator`, so any function that takes one works with it.

When the 64 bytes are used up, allocation fails with `error.OutOfMemory` instead of quietly reaching for more. Running out becomes an ordinary error you can handle.

Here's how the three allocators so far compare:

| | Debug | Arena | Fixed buffer |
| --- | --- | --- | --- |
| Memory comes from | the OS | another allocator | your array |
| Free one at a time | yes | no | only the latest |
| Limit | the machine | the machine | the array size |
| Best for | development, general use | batch jobs | no heap, hard limits |

```warn
The buffer has to outlive everything allocated from it. Don't return memory from a fixed buffer that lives on the function's own stack.
```

```exercise
goal: Back the allocator with a 256-byte stack buffer instead of the heap.
code: |-
  const allocator = std.heap.page_allocator;
  const name = try std.fmt.allocPrint(allocator, "{s}!", .{input});
checks:
  - match: 'var\s+buffer\s*:\s*\[256\]u8\s*=\s*undefined'
    message: "Declare the buffer: var buffer: [256]u8 = undefined;"
  - match: 'FixedBufferAllocator\.init\(&buffer\)'
    message: Create a FixedBufferAllocator from &buffer.
  - notMatch: 'page_allocator'
    message: Don't use the heap.
solution: |-
  var buffer: [256]u8 = undefined;
  var fba = std.heap.FixedBufferAllocator.init(&buffer);
  const allocator = fba.allocator();
  const name = try std.fmt.allocPrint(allocator, "{s}!", .{input});
```

```quiz
question: What happens when a FixedBufferAllocator runs out of space?
options:
  - It switches to the heap.
  - Allocation returns error.OutOfMemory.
  - It overwrites the oldest allocation.
answer: 1
explain: It never goes beyond its buffer. Running out is an error you can catch.
```
