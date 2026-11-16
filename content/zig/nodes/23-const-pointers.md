---
title: Const pointers
icon: "🔒"
branch: data
requires: [pointers]
summary: "*const T lets a function look at your data without being able to change it."
---
Lending a friend a book is different from lending them a pen. Hand over the book and you expect it back unchanged; hand over the pen and it's fine if they use it up. Zig pointers make the same distinction:

- **`*T`** means "you may change this".
- **`*const T`** means "you may only look".

```zig title=report.zig
const std = @import("std");

const Report = struct {
    title: []const u8,
    pages: [4096]u8, // big: copying it would be wasteful
};

fn printTitle(report: *const Report) void {
    std.debug.print("{s}\n", .{report.title});
    // report.title = "hacked"; // error: cannot assign to constant
}
```

Why not just pass `report: Report`? Zig *might* pass a big struct by reference behind the scenes anyway, but `*const Report` makes the promise explicit: no copy, no changes.

The rules for what converts to what are simple, and always in the safe direction:

```zig
var a: u32 = 1;
const b: u32 = 2;

const p1: *u32 = &a; // fine
const p2: *const u32 = &a; // fine: you may promise not to change a var
const p3: *u32 = &b; // error: b is const, you can't get a writable pointer to it
```

You've already been using this. A string literal is `[]const u8`, a slice whose elements are const. It's the same idea, applied to many items at once.

```tip
Good habit: start every pointer parameter as `*const`, and only drop the `const` when the function really needs to write. Your function signatures then tell readers exactly what can change.
```

```exercise
goal: "`totalPages` only reads the library. Change its parameter so the caller can see that."
code: |-
  fn totalPages(lib: *Library) u32 {
      var sum: u32 = 0;
      for (lib.books) |b| sum += b.pages;
      return sum;
  }
checks:
  - match: 'lib\s*:\s*\*const\s+Library'
    message: Use *const Library, so the function promises not to change it.
solution: |-
  fn totalPages(lib: *const Library) u32 {
      var sum: u32 = 0;
      for (lib.books) |b| sum += b.pages;
      return sum;
  }
```

```quiz
question: "`const limit: u32 = 10;` Which pointer can you make to it?"
options:
  - "`*u32` only"
  - "`*const u32` only"
  - Either one
answer: 1
explain: A writable pointer to a constant would let you change it, so only *const u32 is allowed.
```
