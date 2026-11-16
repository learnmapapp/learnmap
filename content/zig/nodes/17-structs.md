---
title: Structs and defaults
icon: "🏗️"
branch: data
requires: [strings]
summary: Group fields together, give some of them defaults, and create values with .{ }.
---
Let's make a character for a small game.

```zig title=hero.zig
const std = @import("std");

const Hero = struct {
    name: []const u8,
    health: u8 = 100,
    level: u32 = 1,
};

pub fn main() void {
    var hero = Hero{ .name = "Ada" };
    hero.level += 1;
    std.debug.print("{s} is level {d} with {d} hp\n", .{ hero.name, hero.level, hero.health });
}
```

```repl shell
> zig run hero.zig
Ada is level 2 with 100 hp
```

What's going on:

- `const Hero = struct { ... }` creates a new type and gives it a name. Types in Zig are just values, so they're named with `const`, like everything else. Type names use `PascalCase`.
- `health: u8 = 100` is a **default**. When you create a `Hero`, you can leave it out.
- `Hero{ .name = "Ada" }` creates one. The dot in front of each field name is required.
- Fields without a default must be given, or it won't compile. Nobody accidentally gets a nameless hero.

When Zig already knows which type is expected, you can drop the type name and just write `.{ ... }`. This is called an **anonymous struct literal**, and you'll see it everywhere:

```zig
const villain: Hero = .{ .name = "Grace", .health = 250 };
```

That's also what the `.{ hero.name, hero.level }` after a format string is: a small anonymous struct holding the arguments.

```compare python
@dataclass
class Hero:
    name: str
    health: int = 100
    level: int = 1
```

```compare javascript
const hero = { name: "Ada", health: 100, level: 1 };
```

```exercise
goal: Heroes should start with 10 gold. Add a `gold` field of type `u32` with that default.
code: |-
  const Hero = struct {
      name: []const u8,
      health: u8 = 100,
  };
checks:
  - match: 'gold\s*:\s*u32\s*=\s*10\s*,'
    message: "Add gold: u32 = 10, with a comma at the end."
solution: |-
  const Hero = struct {
      name: []const u8,
      health: u8 = 100,
      gold: u32 = 10,
  };
hint: Fields are separated by commas, and Zig likes a trailing comma after the last one too.
```

```quiz
question: "With the `Hero` above, which line is a compile error?"
options:
  - "`const a = Hero{ .name = \"Ada\" };`"
  - "`const b = Hero{ .health = 50 };`"
  - "`const c: Hero = .{ .name = \"Bo\", .level = 3 };`"
answer: 1
explain: name has no default, so every Hero must be given one.
```
