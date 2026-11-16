---
title: Generic types
icon: "🧬"
branch: comptime
requires: [comptime, structs]
summary: A function that takes a type and returns a new struct type is a generic.
---
Zig has no special syntax for generics like `Stack<T>`. It doesn't need any. Types are values at compile time, so a "generic type" is just **a function that takes a type and returns a type**.

```zig title=stack.zig
const std = @import("std");

fn Stack(comptime T: type) type {
    return struct {
        items: [16]T = undefined,
        len: usize = 0,

        const Self = @This();

        pub fn push(self: *Self, value: T) void {
            self.items[self.len] = value;
            self.len += 1;
        }

        pub fn pop(self: *Self) ?T {
            if (self.len == 0) return null;
            self.len -= 1;
            return self.items[self.len];
        }
    };
}

pub fn main() void {
    var plates = Stack([]const u8){};
    plates.push("blue");
    plates.push("red");
    std.debug.print("{s}\n", .{plates.pop().?}); // red
}
```

Some things to unpack:

- **`comptime T: type`** is a parameter whose value is a type. It must be known at compile time, like any type.
- **`return struct { ... }`** creates a brand-new, nameless struct type on each call. Inside it, `T` is whatever the caller passed.
- **`@This()`** is the struct being defined. Since it has no name, `const Self = @This();` gives it one to use in method signatures.
- **`Stack([]const u8)`** calls the function, at compile time, and gets back a type. The `{}` after it creates a value of that type with all the defaults.

Calling `Stack(u32)` twice gives you the *same* type, because the compiler caches the result. You've already used this pattern: `std.ArrayList(T)` and `std.AutoHashMap(K, V)` are ordinary functions like `Stack`.

Type functions are named in `PascalCase`, like the types they return. That's how readers can tell `Stack(u8)` returns a type, while `stack(u8)` would return a value.

```compare rust
struct Stack<T> {
    items: Vec<T>,
}
```

```compare javascript
// TypeScript: generics exist only for the type checker.
class Stack<T> { items: T[] = []; }
```

```exercise
goal: "Turn `IntPair` into a generic `Pair(T)`, so pairs of any type can be made."
code: |-
  const IntPair = struct {
      first: i32,
      second: i32,
  };
checks:
  - match: 'fn\s+Pair\(\s*comptime\s+T\s*:\s*type\s*\)\s*type'
    message: "Start with fn Pair(comptime T: type) type"
  - match: 'return\s+struct'
    message: Return a struct from the function.
  - match: 'first\s*:\s*T\s*,\s*second\s*:\s*T'
    message: Both fields should have type T.
solution: |-
  fn Pair(comptime T: type) type {
      return struct {
          first: T,
          second: T,
      };
  }
```

```quiz
question: What is `std.ArrayList(u8)`?
options:
  - A special generic syntax built into the compiler.
  - A call to an ordinary function that returns a type.
  - A runtime list of type values.
answer: 1
explain: ArrayList is a normal Zig function that takes a type and returns a struct type, run at compile time.
```
