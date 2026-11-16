---
title: anytype parameters
icon: "🦆"
branch: comptime
requires: [functions]
summary: Accept any type that has what you need, checked at compile time.
---
"If it walks like a duck and quacks like a duck..." Dynamic languages work like that: a function uses whatever it's given, and fails at runtime if a method is missing. Zig's **`anytype`** gives you the same flexibility, but the check happens while compiling.

```zig title=duck.zig
const std = @import("std");

const Duck = struct {
    fn speak(_: Duck) []const u8 {
        return "Quack!";
    }
};
const Robot = struct {
    fn speak(_: Robot) []const u8 {
        return "Beep.";
    }
};

fn introduce(thing: anytype) void {
    std.debug.print("{s}\n", .{thing.speak()});
}

pub fn main() void {
    introduce(Duck{});
    introduce(Robot{});
    // introduce(42); // compile error: no field or member function named 'speak'
}
```

For each type you pass in, the compiler makes a separate copy of `introduce`, specialised for that type. There's no runtime lookup and no cost per call. (The `_` in `speak(_: Duck)` just means the method doesn't use `self`.)

Two companion builtins:

- **`@TypeOf(x)`** gives the type of a value. Handy for return types: `fn double(x: anytype) @TypeOf(x)`.
- **`@hasDecl(T, "speak")`** asks whether a type has a declaration (such as a method) with that name, so you can adapt instead of failing.

`anytype` is how `std.debug.print` accepts `.{ name, score }` as a list of arguments of any types.

```warn
`anytype` hides what a function expects. A reader has to dig through the body to discover that `thing` needs a `speak` method. Use it for small, generic helpers, and prefer concrete types for most functions.
```

```compare python
def introduce(thing):
    print(thing.speak())   # fails at runtime if speak is missing
```

```compare rust
// Rust needs a trait that lists the requirement up front.
fn introduce(thing: impl Speak) {
    println!("{}", thing.speak());
}
```

```exercise
goal: "Make `double` work for any number type: accept `anytype`, and return the same type as the argument."
code: |-
  fn double(x: i32) i32 {
      return x * 2;
  }
checks:
  - match: 'fn\s+double\(\s*x\s*:\s*anytype\s*\)'
    message: "Take x: anytype."
  - match: '\)\s*@TypeOf\(x\)'
    message: Use @TypeOf(x) as the return type.
solution: |-
  fn double(x: anytype) @TypeOf(x) {
      return x * 2;
  }
```

```quiz
question: When is a missing method on an anytype argument detected?
options:
  - At runtime, when the call happens.
  - At compile time, when the function is used with that type.
  - Never; it returns undefined.
answer: 1
explain: The compiler specialises the function for each argument type and checks it then.
```
