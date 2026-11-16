---
title: Tagged unions
icon: "🎭"
branch: data
requires: [switch]
summary: One value, several possible shapes, and switch tells you which one you have.
---
Say a drawing app has circles, rectangles and text labels. They all need different data: a circle has a radius, a rectangle has a width and height, a label has a string. How do you store "one shape, any kind" in a single type?

With a **tagged union**:

```zig title=shapes.zig
const std = @import("std");

const Shape = union(enum) {
    circle: f32, // radius
    rect: struct { w: f32, h: f32 },
    label: []const u8,
};

fn area(shape: Shape) f32 {
    return switch (shape) {
        .circle => |r| std.math.pi * r * r,
        .rect => |s| s.w * s.h,
        .label => 0,
    };
}

pub fn main() void {
    const shapes = [_]Shape{
        .{ .circle = 1 },
        .{ .rect = .{ .w = 2, .h = 3 } },
        .{ .label = "hi" },
    };
    for (shapes) |s| std.debug.print("{d:.2}\n", .{area(s)});
}
```

```repl shell
> zig run shapes.zig
3.14
6.00
0.00
```

A `Shape` holds exactly one of its fields at a time. The `(enum)` part adds a hidden **tag** that remembers which one, so `switch` can check it. Inside each branch, the [[capture]] (`|r|`, `|s|`) gives you that variant's data, already the right type.

It's safe, too. Reading `shape.circle` when the shape is actually a `rect` panics in debug builds, instead of quietly reinterpreting the bytes.

If you've used Rust enums, Swift enums with associated values, or TypeScript discriminated unions, this is the same idea.

```compare rust
enum Shape {
    Circle(f32),
    Rect { w: f32, h: f32 },
    Label(String),
}
```

```compare javascript
// The closest thing: an object with a "kind" field
const shape = { kind: "circle", radius: 1 };
```

```exercise
goal: Add a `square` shape that stores its side length as an `f32`, and give it an area in the switch.
code: |-
  const Shape = union(enum) {
      circle: f32,
      label: []const u8,
  };

  fn area(shape: Shape) f32 {
      return switch (shape) {
          .circle => |r| std.math.pi * r * r,
          .label => 0,
      };
  }
checks:
  - match: 'square\s*:\s*f32'
    message: "Add a field square: f32 to the union."
  - match: '\.square\s*=>\s*\|(\w+)\|\s*\1\s*\*\s*\1'
    message: "Handle .square in the switch: capture the side and multiply it by itself."
solution: |-
  const Shape = union(enum) {
      circle: f32,
      square: f32,
      label: []const u8,
  };

  fn area(shape: Shape) f32 {
      return switch (shape) {
          .circle => |r| std.math.pi * r * r,
          .square => |side| side * side,
          .label => 0,
      };
  }
```

```quiz
question: What does the `(enum)` in `union(enum)` add?
options:
  - A tag that records which field is currently active.
  - The ability to hold all fields at once.
  - Integer values for each field.
answer: 0
explain: The tag is what lets switch (and safety checks) know which variant you have.
```
