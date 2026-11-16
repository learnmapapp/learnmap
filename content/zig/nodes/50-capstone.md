---
title: A task store
icon: "🏁"
branch: tools
requires: [arraylist, methods, tests, errdefer]
summary: Put it all together in a small, tested to-do list that owns its memory.
---
Let's finish with a small to-do list that uses most of what you've learned: structs, methods, a growable list, owned strings, error handling and tests. Read it slowly. Every line uses something from an earlier lesson.

```zig title=tasks.zig
const std = @import("std");

pub const Task = struct {
    title: []u8, // owned by the store
    done: bool = false,
};

pub const TaskStore = struct {
    allocator: std.mem.Allocator,
    tasks: std.ArrayList(Task) = .empty,

    pub fn init(allocator: std.mem.Allocator) TaskStore {
        return .{ .allocator = allocator };
    }

    pub fn deinit(self: *TaskStore) void {
        for (self.tasks.items) |task| self.allocator.free(task.title);
        self.tasks.deinit(self.allocator);
    }

    /// Copies the title, so the caller's buffer can be reused.
    pub fn add(self: *TaskStore, title: []const u8) !usize {
        const copy = try self.allocator.dupe(u8, title);
        errdefer self.allocator.free(copy);
        try self.tasks.append(self.allocator, .{ .title = copy });
        return self.tasks.items.len - 1;
    }

    pub fn complete(self: *TaskStore, id: usize) !void {
        if (id >= self.tasks.items.len) return error.NoSuchTask;
        self.tasks.items[id].done = true;
    }

    pub fn remaining(self: *const TaskStore) usize {
        var count: usize = 0;
        for (self.tasks.items) |task| {
            if (!task.done) count += 1;
        }
        return count;
    }
};

test "add and complete tasks" {
    var store = TaskStore.init(std.testing.allocator);
    defer store.deinit();

    const id = try store.add("learn Zig");
    _ = try store.add("celebrate 🎉");
    try store.complete(id);

    try std.testing.expectEqual(1, store.remaining());
    try std.testing.expectError(error.NoSuchTask, store.complete(99));
}
```

```repl shell
> zig test tasks.zig
All 1 tests passed.
```

The design decisions, and where you learned them:

- **The store owns the titles.** `add` copies with `dupe`, and `deinit` frees each title before the list. ([Owned strings](node:owned-strings))
- **`errdefer` guards the copy.** If `append` runs out of memory, the copied title is freed instead of leaking. ([errdefer](node:errdefer))
- **The allocator is stored once,** in `init`, so callers don't pass it to every method. Both styles are common in Zig; this one is tidier for objects with several methods. ([Allocators](node:allocators))
- **Methods say what they change.** `remaining` takes `*const TaskStore`; `add` and `complete` take `*TaskStore`. ([Const pointers](node:const-pointers))
- **The test uses `std.testing.allocator`,** so forgetting any `free` fails the test. ([Test blocks](node:tests))

**Where to go next:** read input with `std.fs.File.stdin()`, save tasks to a file, or turn this into a command-line app with `zig init` and `zig build run`. Then, perhaps, a new map. 🗺️

```exercise
goal: "Add a `rename` method. It returns `error.NoSuchTask` for an unknown id. Otherwise it frees the old title and stores an owned copy of the new one."
code: |-
  pub fn rename(self: *TaskStore, id: usize, title: []const u8) !void {
      self.tasks.items[id].title = title;
  }
checks:
  - match: 'if\s*\(\s*id\s*>=\s*self\.tasks\.items\.len\s*\)\s*return\s+error\.NoSuchTask'
    message: Check the id first, like complete does.
  - match: 'try\s+self\.allocator\.dupe\(u8,\s*title\)'
    message: Store an owned copy of the new title, made with dupe.
  - match: 'self\.allocator\.free\(self\.tasks\.items\[id\]\.title\)'
    message: Free the old title, or it leaks.
solution: |-
  pub fn rename(self: *TaskStore, id: usize, title: []const u8) !void {
      if (id >= self.tasks.items.len) return error.NoSuchTask;
      const copy = try self.allocator.dupe(u8, title);
      self.allocator.free(self.tasks.items[id].title);
      self.tasks.items[id].title = copy;
  }
hint: Make the copy before freeing the old title. If dupe fails, the task still has a valid title.
```

```quiz
question: In `add`, why is the title copied with `dupe` instead of stored directly?
options:
  - Slices can't be stored in structs.
  - The caller's text might be a temporary buffer that's reused or freed.
  - dupe makes the title uppercase.
answer: 1
explain: Storing the caller's slice would borrow memory the store doesn't control. A copy makes the store its owner.
```
