---
title: Embedded files
icon: "🧳"
branch: tools
requires: [imports, comptime]
summary: Pack a file's contents straight into your program with @embedFile.
---
Some files belong *inside* your program: an ASCII-art logo, default settings, a SQL schema, a help text. Shipping them separately means they can go missing. `@embedFile` reads a file **at compile time** and turns its contents into a string constant.

Say you have a logo:

```text title=logo.txt
 _____ _
|__  /(_) __ _
  / / | |/ _` |
 / /_ | | (_| |
/____||_|\__, |
         |___/
```

```zig title=main.zig
const std = @import("std");

const logo = @embedFile("logo.txt");

pub fn main() void {
    std.debug.print("{s}\nVersion 1.0\n", .{logo});
}
```

When you build, the compiler reads `logo.txt` and stores its bytes in the executable. You can move the binary anywhere and the logo comes along; `logo.txt` itself isn't needed at runtime any more.

Details worth knowing:

- The path is **relative to the source file**, just like file imports, and can't go outside the package.
- The result is a pointer to a byte array with a known length. It converts to `[]const u8`, so you can use it anywhere a string is expected.
- Edit the file and the next build picks up the change automatically.
- It works for any file, not only text. Images, fonts and test data are all fine.

Because it's compile-time, you can even process the contents during compilation, combining it with [comptime](node:comptime). For example, you could parse a CSV of country codes into a lookup table, so it costs nothing at runtime.

```compare rust
const LOGO: &str = include_str!("logo.txt");
```

```compare python
# Python reads data files at runtime instead:
from importlib.resources import files
logo = files("mypkg").joinpath("logo.txt").read_text()
```

```exercise
goal: Instead of opening `help.txt` at runtime, embed it in the program.
code: |-
  fn helpText(allocator: std.mem.Allocator) ![]u8 {
      return std.fs.cwd().readFileAlloc(allocator, "help.txt", 10_000);
  }
checks:
  - match: 'const\s+help\s*=\s*@embedFile\("help\.txt"\)'
    message: "Declare const help = @embedFile(\"help.txt\"); at the top level."
  - notMatch: 'readFileAlloc'
    message: The file no longer needs to be read at runtime.
solution: |-
  const help = @embedFile("help.txt");

  fn helpText() []const u8 {
      return help;
  }
```

```quiz
question: "When does `@embedFile(\"logo.txt\")` read the file?"
options:
  - Every time the program starts.
  - Once, during compilation.
  - The first time the constant is used.
answer: 1
explain: The bytes are copied into the executable while compiling, so the file isn't needed at runtime.
```
