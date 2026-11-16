---
title: Type reflection
icon: "🔍"
branch: comptime
requires: [generic-types]
summary: Ask a type about its fields at compile time, and write code that adapts.
---
Imagine writing a `debugPrint` that works for *any* struct and prints every field with its name. In most compiled languages you'd need a macro, or runtime reflection that costs performance. In Zig, you can loop over a struct's fields while compiling:

```zig title=inspect.zig
const std = @import("std");

const Player = struct {
    level: u32,
    health: u8,
    alive: bool,
};

fn describe(value: anytype) void {
    const T = @TypeOf(value);
    std.debug.print("{s} {{\n", .{@typeName(T)});
    inline for (std.meta.fields(T)) |field| {
        std.debug.print("  {s} = {any}\n", .{ field.name, @field(value, field.name) });
    }
    std.debug.print("}}\n", .{});
}

pub fn main() void {
    describe(Player{ .level = 3, .health = 90, .alive = true });
}
```

```repl shell
> zig run inspect.zig
inspect.Player {
  level = 3
  health = 90
  alive = true
}
```

The tools:

- **`std.meta.fields(T)`** lists a struct's fields: each has a `.name` and a `.type`.
- **`inline for`** unrolls the loop at compile time. Each field has a different type, so the loop body must be compiled separately for each one, and `inline` does exactly that.
- **`@field(value, "name")`** reads a field whose name is a compile-time string.
- **`@typeInfo(T)`** gives everything else: whether `T` is a struct, enum, int and so on. Write it like `@typeInfo(T) == .int`. Tags that are also keywords need quoting: `.@"struct"`, `.@"enum"`.
- **`{{` and `}}`** in a format string print literal braces.

This is how `std.json` serialises your structs without you writing a line of glue code.

```exercise
goal: Print only the field names. Fix the loop so it runs at compile time.
code: |-
  fn fieldNames(comptime T: type) void {
      for (std.meta.fields(T)) |field| {
          std.debug.print("{s}\n", .{field.name});
      }
  }
checks:
  - match: 'inline\s+for\s*\(\s*std\.meta\.fields\(T\)\s*\)'
    message: Loops over fields need inline for.
solution: |-
  fn fieldNames(comptime T: type) void {
      inline for (std.meta.fields(T)) |field| {
          std.debug.print("{s}\n", .{field.name});
      }
  }
```

```quiz
question: "Why do you need `inline for` to loop over a struct's fields?"
options:
  - It's faster at runtime.
  - Each field can have a different type, so each iteration is compiled separately.
  - Normal for loops can't use slices.
answer: 1
explain: Field info only exists at compile time, and the body must be specialised for each field's type.
```
