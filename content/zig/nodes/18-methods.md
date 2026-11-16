---
title: Methods
icon: "🛠️"
branch: data
requires: [structs, functions]
summary: Functions inside a struct, and when self needs to be a pointer.
---
Zig has no classes, but structs can contain functions. When the first parameter is the struct itself, you can call it with dot syntax: a **method**.

Before, with a loose function:

```zig
const Rect = struct { w: f32, h: f32 };

fn area(r: Rect) f32 {
    return r.w * r.h;
}

// area(box)
```

After, moved inside the struct:

```zig title=rect.zig
const Rect = struct {
    w: f32,
    h: f32,

    pub fn area(self: Rect) f32 {
        return self.w * self.h;
    }

    pub fn scale(self: *Rect, factor: f32) void {
        self.w *= factor;
        self.h *= factor;
    }
};

// var box = Rect{ .w = 2, .h = 3 };
// box.scale(2);
// box.area() → 24
```

`self` isn't a keyword, just a convention. `box.area()` is plain sugar for `Rect.area(box)`. No magic, no hidden `this`.

Look at the two signatures. `area` takes `self: Rect`, a read-only copy, because it only looks. `scale` takes `self: *Rect`, a [pointer](node:pointers) to the original, because it has to change it. If `scale` took `self: Rect`, it would fail to compile: you can't assign to a parameter.

Calling a `*Rect` method requires `box` to be a `var`. A `const` box can't be scaled, which is exactly what you'd hope for.

```compare python
class Rect:
    def area(self):
        return self.w * self.h
```

```compare rust
impl Rect {
    fn area(&self) -> f32 { self.w * self.h }
    fn scale(&mut self, factor: f32) { self.w *= factor; self.h *= factor; }
}
```

```exercise
goal: "`reset` should set the counter back to zero, but it doesn't compile. Fix the type of `self`."
code: |-
  const Counter = struct {
      count: u32 = 0,

      pub fn reset(self: Counter) void {
          self.count = 0;
      }
  };
checks:
  - match: 'reset\(self:\s*\*Counter\)'
    message: To change the counter, self must be a pointer, *Counter.
solution: |-
  const Counter = struct {
      count: u32 = 0,

      pub fn reset(self: *Counter) void {
          self.count = 0;
      }
  };
```

```quiz
question: "`const box = Rect{ .w = 1, .h = 1 };` Which call fails to compile?"
options:
  - "`box.area()`"
  - "`box.scale(2)`"
  - "`Rect.area(box)`"
answer: 1
explain: scale needs a *Rect it can modify, and box is a const.
```
