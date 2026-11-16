---
title: Hash maps
icon: "🗺️"
branch: memory
requires: [allocators, strings]
summary: Look things up by key with StringHashMap and AutoHashMap.
---
Let's count words. It's the "hello world" of hash maps:

```zig title=words.zig
const std = @import("std");

pub fn main() !void {
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();

    var counts = std.StringHashMap(u32).init(gpa.allocator());
    defer counts.deinit();

    var words = std.mem.tokenizeScalar(u8, "the cat saw the other cat", ' ');
    while (words.next()) |word| {
        const entry = try counts.getOrPut(word);
        if (!entry.found_existing) entry.value_ptr.* = 0;
        entry.value_ptr.* += 1;
    }

    std.debug.print("cat: {d}\n", .{counts.get("cat") orelse 0}); // 2
}
```

Choosing a map type is easy:

- **`std.StringHashMap(V)`** when the keys are strings.
- **`std.AutoHashMap(K, V)`** for other keys, like integers or enums. It works out how to hash them for you.

Both store the allocator you give to `init` (unlike `ArrayList`), so `put` and `deinit` don't take one.

The main operations:

| Call | Does |
| --- | --- |
| `try map.put(key, value)` | insert, or overwrite |
| `map.get(key)` | gives `?V`: the value, or `null` |
| `map.remove(key)` | gives `bool`: whether it was there |
| `try map.getOrPut(key)` | finds the slot, or creates it |

`getOrPut` is the clever one. It looks up the key once and gives you a pointer to the value's slot, whether that slot is new or old. `found_existing` tells you which. One lookup instead of a `get` followed by a `put`.

```warn
A `StringHashMap` doesn't copy the key strings. It stores slices that point at your text. That's fine here, because the words point into a string literal that lives forever. If the keys come from a buffer you reuse, copy them first, as the [next lesson](node:owned-strings) shows.
```

```compare python
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
```

```compare javascript
const counts = new Map();
for (const w of text.split(" ")) counts.set(w, (counts.get(w) ?? 0) + 1);
```

```exercise
goal: "`get` returns an optional, so this doesn't compile. Use 0 when the colour isn't in the map."
code: |-
  fn stock(map: std.StringHashMap(u32), colour: []const u8) u32 {
      return map.get(colour);
  }
checks:
  - match: 'map\.get\(colour\)\s+orelse\s+0'
    message: Unwrap the optional with orelse 0.
solution: |-
  fn stock(map: std.StringHashMap(u32), colour: []const u8) u32 {
      return map.get(colour) orelse 0;
  }
```

```quiz
question: Which map would you use to look up players by their numeric id (a u32)?
options:
  - "`std.StringHashMap(Player)`"
  - "`std.AutoHashMap(u32, Player)`"
  - "`std.ArrayList(Player)`"
answer: 1
explain: AutoHashMap works for keys like integers, and figures out the hashing for you.
```
