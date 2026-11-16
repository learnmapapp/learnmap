---
title: Enums
icon: "🚥"
branch: data
requires: [structs]
summary: A fixed list of named states, with methods of their own.
---
A traffic light can be red, yellow or green, and nothing else. Storing that as a string (`"red"`) invites typos like `"rde"`. Storing it as a number (`0`, `1`, `2`) invites nobody remembering what `2` meant. An **enum** lists the allowed states by name:

```zig title=light.zig
const std = @import("std");

const Light = enum {
    red,
    yellow,
    green,

    fn next(self: Light) Light {
        return switch (self) {
            .red => .green,
            .green => .yellow,
            .yellow => .red,
        };
    }
};

pub fn main() void {
    var light: Light = .red;
    for (0..4) |_| {
        std.debug.print("{s} → ", .{@tagName(light)});
        light = light.next();
    }
    std.debug.print("...\n", .{});
}
```

```repl shell
> zig run light.zig
red → green → yellow → red → ...
```

Notice the short `.red` instead of `Light.red`. When Zig already knows the type, the leading dot is enough. That's called an **enum literal**.

Like structs, enums can have methods. `next` uses a `switch`, which you'll meet properly in the [next lesson](node:switch). It's already worth noticing that it lists every state. If someone later adds `.blinking` to the enum, this function stops compiling until it's handled. The compiler finds every place that needs updating.

`@tagName(light)` turns a value into its name as a string, which is handy for printing and debugging. And `for (0..4) |_|` uses `_` because the loop doesn't need the number.

```compare python
class Light(Enum):
    RED = auto()
    YELLOW = auto()
    GREEN = auto()
```

```compare rust
enum Light { Red, Yellow, Green }
```

```exercise
goal: Coffee comes in three sizes. Turn these loose constants into an enum called `Size`.
code: |-
  const small = 0;
  const medium = 1;
  const large = 2;
checks:
  - match: 'const\s+Size\s*=\s*enum\s*\{'
    message: "Start with const Size = enum {"
  - match: 'small,\s*medium,\s*large'
    message: "List the three sizes, separated by commas: small, medium, large"
solution: |-
  const Size = enum {
      small,
      medium,
      large,
  };
```

```quiz
question: "`var light: Light = .red;` Why can you write `.red` without `Light.`?"
options:
  - Enum values are global names.
  - The type is already known, so a dot is enough.
  - It's a different, untyped value that converts later.
answer: 1
explain: The variable's type tells Zig which enum .red belongs to.
```
