---
title: Arena allocators
icon: "🎪"
branch: memory
requires: [allocators]
summary: Allocate freely, then throw everything away in one go.
---
After a party, you don't put every cup back in the cupboard as the evening goes on. You clear up everything at once at the end. An **arena allocator** handles memory the same way: you allocate as much as you like, never free anything individually, and release it all with a single `deinit()`.

```zig title=request.zig
const std = @import("std");

fn handleRequest(backing: std.mem.Allocator, path: []const u8) !void {
    var arena = std.heap.ArenaAllocator.init(backing);
    defer arena.deinit(); // frees everything below, in one go
    const allocator = arena.allocator();

    const parts = try splitPath(allocator, path);
    const user = try loadUser(allocator, parts[1]);
    const page = try render(allocator, user);
    try send(page);
    // no free() calls anywhere
}
```

An arena wraps another allocator (the "backing" one) and grabs big chunks from it. Handing out memory is then very fast, because it just moves a pointer forward.

Arenas fit work that has a clear **end point**, after which all of its memory can go at once:

- 🌐 one request in a web server
- 🎮 one frame in a game
- 🛠️ one run of a command-line tool
- 📄 parsing one file into a temporary structure

They don't fit long-lived things that grow and shrink, like a cache that runs for hours. An arena never gives memory back until the end, so it would keep growing.

```tip
For a short command-line program, wrapping `std.heap.page_allocator` in an arena at the top of `main` is a perfectly respectable memory strategy. Everything's freed when you exit anyway.
```

```exercise
goal: This function frees three things separately. Use an arena backed by `gpa` instead, with a single deinit.
code: |-
  fn report(gpa: std.mem.Allocator) !void {
      const a = try loadA(gpa);
      defer gpa.free(a);
      const b = try loadB(gpa);
      defer gpa.free(b);
      const c = try loadC(gpa);
      defer gpa.free(c);
      try write(a, b, c);
  }
checks:
  - match: 'var\s+arena\s*=\s*std\.heap\.ArenaAllocator\.init\(gpa\)'
    message: "Create the arena: var arena = std.heap.ArenaAllocator.init(gpa);"
  - match: 'defer\s+arena\.deinit\(\)'
    message: Free everything at once with defer arena.deinit();
  - notMatch: '\.free\('
    message: With an arena, you don't free things one by one.
solution: |-
  fn report(gpa: std.mem.Allocator) !void {
      var arena = std.heap.ArenaAllocator.init(gpa);
      defer arena.deinit();
      const allocator = arena.allocator();
      const a = try loadA(allocator);
      const b = try loadB(allocator);
      const c = try loadC(allocator);
      try write(a, b, c);
  }
```

```quiz
question: Which job is a poor fit for an arena?
options:
  - Building the response for a single HTTP request.
  - A cache that adds and removes entries for days.
  - Parsing a config file at startup.
answer: 1
explain: An arena only releases memory at deinit, so a long-running cache would grow without limit.
```
