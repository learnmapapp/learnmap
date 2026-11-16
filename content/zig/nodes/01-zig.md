---
title: Meet Zig
icon: "⚡"
branch: core
requires: []
summary: What Zig is for, and your first program.
kind: hub
---
Zig is a systems language: it compiles to fast native code, like C or Rust, and lets you decide exactly how memory is used. Its motto is *no hidden control flow and no hidden allocations*. If a line of Zig doesn't look like it calls a function or allocates memory, it doesn't.

Here's the classic first program. Create a file called `hello.zig` with this content:

```zig title=hello.zig
const std = @import("std");

pub fn main() !void {
    std.debug.print("Hello, Zig!\n", .{});
}
```

Then, in a terminal in the same folder, run `zig run hello.zig`. Zig compiles the file and runs it straight away:

```repl shell
> zig run hello.zig
Hello, Zig!
```

Line by line:

- `@import("std")` loads the standard library. Functions that start with `@` are **builtins**, provided by the compiler itself.
- `pub fn main() !void` is the entry point. `!void` means "returns nothing, but might return an error". You'll see that `!` a lot.
- `std.debug.print` takes a format string and a list of arguments. `.{}` is an empty list, because there's nothing to fill in yet.

```compare python
print("Hello, Python!")
```

```compare javascript
console.log("Hello, JavaScript!");
```

```compare rust
fn main() {
    println!("Hello, Rust!");
}
```

```tip
These lessons use **Zig 0.15**. Zig hasn't reached 1.0 yet, so parts of the standard library still change between releases. If an example doesn't compile on your machine, check your version with `zig version`.
```

```exercise
goal: Make the program greet Zig instead of the world.
code: |-
  const std = @import("std");

  pub fn main() !void {
      std.debug.print("Hello, world!\n", .{});
  }
checks:
  - notMatch: 'Hello, world!'
    message: Change the text inside the quotes.
  - match: 'print\("Hello, Zig!\\n"'
    message: The message should be exactly "Hello, Zig!\n".
solution: |-
  const std = @import("std");

  pub fn main() !void {
      std.debug.print("Hello, Zig!\n", .{});
  }
output: Hello, Zig!
hint: Only the text between the double quotes needs to change. Keep the \n, which ends the line.
```

```quiz
question: What does the terminal command `zig run hello.zig` do?
options:
  - Checks types without producing or running code.
  - Compiles and runs the source program.
  - Formats the source without executing it.
answer: 1
explain: "`zig run` compiles the file to a temporary program and runs it. Later you'll meet `zig build` for real projects."
```
