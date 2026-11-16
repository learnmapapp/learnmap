---
title: Owned strings
icon: "🎫"
branch: memory
requires: [allocators, strings]
summary: Borrowed or owned? Who frees a string, and when to copy one.
---
Since a string is just a `[]const u8`, its type doesn't say who's responsible for the memory behind it. That's a question you have to answer yourself, and it's the source of most Zig memory bugs. There are two possibilities:

- **Borrowed**: you may read the bytes, but someone else owns them and will free them, possibly soon.
- **Owned**: you were given the bytes, and freeing them is your job.

Here's the classic bug. Can you see it?

```zig title=names.zig
var names: std.ArrayList([]const u8) = .empty;
var buf: [100]u8 = undefined;

while (try readLine(&buf)) |line| {
    try names.append(allocator, line); // 🐛
}
```

Every `line` is a [[slice]] into the same `buf`. Each new line overwrites the previous one, so at the end the list holds many views of whatever the last line was. The list *borrowed* the text, but the text didn't stay put.

The fix is to make an owned copy with `allocator.dupe`:

```zig
while (try readLine(&buf)) |line| {
    const copy = try allocator.dupe(u8, line);
    errdefer allocator.free(copy);
    try names.append(allocator, copy);
}
```

Now the list owns each copy, and that comes with a duty: free each one before freeing the list.

```zig
defer {
    for (names.items) |name| allocator.free(name);
    names.deinit(allocator);
}
```

Functions that build new strings, such as `std.fmt.allocPrint`, `std.mem.concat` and `std.mem.join`, return owned memory too.

```tip
Write ownership into your doc comments: "Caller owns the returned memory." The standard library does this, and it saves your colleagues (and future you) a lot of detective work.
```

```exercise
goal: The user struct borrows `name` from a temporary buffer. Store an owned copy instead.
code: |-
  fn makeUser(allocator: std.mem.Allocator, name: []const u8) !User {
      return User{ .name = name };
  }
checks:
  - match: 'allocator\.dupe\(u8,\s*name\)'
    message: Copy the name with allocator.dupe(u8, name).
  - match: 'try\s+allocator\.dupe'
    message: dupe allocates, so it can fail. It needs try.
solution: |-
  fn makeUser(allocator: std.mem.Allocator, name: []const u8) !User {
      return User{ .name = try allocator.dupe(u8, name) };
  }
```

```quiz
question: "`const s = try std.fmt.allocPrint(gpa, \"#{d}\", .{n});` Who must free `s`?"
options:
  - Nobody; it's freed at the end of the statement.
  - The caller, with gpa.free(s).
  - std.fmt, the next time it's called.
answer: 1
explain: allocPrint returns newly allocated memory, and the caller owns it.
```
