---
title: Imports
icon: "📥"
branch: tools
requires: [functions]
summary: Every file is a struct, and @import gives you access to it.
---
Time to split a program over two files. Put them in the same folder:

```zig title=geometry.zig
pub const pi = 3.14159;

pub fn circleArea(r: f64) f64 {
    return pi * r * r;
}
```

```zig title=main.zig
const std = @import("std");
const geometry = @import("geometry.zig");

pub fn main() void {
    std.debug.print("{d:.1}\n", .{geometry.circleArea(2)});
}
```

```repl shell
> zig run main.zig
12.6
```

Run `main.zig`, and Zig follows the imports to find the rest. No project file needed, and no list of source files to keep up to date.

Here's the neat part: **every Zig file is a struct**. `@import("geometry.zig")` gives you that struct, and its `pub` declarations are its members. That's why you write `geometry.circleArea` with a dot, just like a method or field. It's also why `@import("std")` works the same way: `std` is a big struct of structs, and `std.debug.print` is a path through it.

Some rules of thumb:

- A path with `.zig` is a **file**, relative to the current file: `@import("util/strings.zig")`.
- A name without `.zig` is a **module**: `std`, `builtin`, or a dependency set up in [build.zig](node:build).
- The `const` name is up to you. `const geo = @import("geometry.zig");` works just as well.
- Importing the same file twice gives the same struct. Nothing runs twice, and there's no include-guard dance like in C.

You can also pull out a single name, which is common for things used a lot:

```zig
const print = std.debug.print;
const circleArea = @import("geometry.zig").circleArea;
```

```compare python
import geometry
from geometry import circle_area
```

```compare javascript
import * as geometry from "./geometry.js";
import { circleArea } from "./geometry.js";
```

```exercise
goal: "`main.zig` uses functions from `money.zig` in the same folder. Import it as `money`."
code: |-
  const std = @import("std");
  const money = @import("money");
checks:
  - match: 'const\s+money\s*=\s*@import\("money\.zig"\)'
    message: Files are imported by their file name, including .zig.
solution: |-
  const std = @import("std");
  const money = @import("money.zig");
hint: Without .zig, Zig looks for a module with that name instead of a file.
```

```quiz
question: "What does `@import(\"geometry.zig\")` return?"
options:
  - A copy of the file's text.
  - The file as a struct, with its pub declarations as members.
  - Nothing; it just runs the file.
answer: 1
explain: Each file is a struct. You reach its public functions and constants through the name you bind it to.
```
