---
title: Read-only methods
icon: "🔍"
branch: types
requires: [structs]
summary: Methods are functions inside a struct, and plain self can read but not change.
---
| Question about a rectangle | As a free function | As a method |
| --- | --- | --- |
| How big is it? | `area(r)` | `r.area()` |
| Is it a square? | `is_square(r)` | `r.is_square()` |
| Does it fit in another? | `fits(r, box)` | `r.fits_in(box)` |

A **method** is a function defined inside a struct. You call it with a dot on a value, and that value arrives in the method as `self`:

```mojo title=rect.mojo
@fieldwise_init
struct Rect(Copyable, Writable):
    var width: Float64
    var height: Float64

    def area(self) -> Float64:
        return self.width * self.height

    def is_square(self) -> Bool:
        return self.width == self.height

    def fits_in(self, other: Rect) -> Bool:
        return self.width <= other.width and self.height <= other.height

def main():
    var photo = Rect(10.0, 15.0)
    var frame = Rect(13.0, 18.0)
    print(photo.area())           # 150.0
    print(photo.is_square())      # False
    print(photo.fits_in(frame))   # True
```

**Why methods instead of functions?**

- **Discoverability.** Type `photo.` in an editor and you see everything a `Rect` can do.
- **Grouping.** The code that knows about a rectangle's fields lives next to those fields.
- **Readability.** `photo.fits_in(frame)` reads almost like a sentence.

**Plain `self` is read-only.** Just like a normal [read argument](node:read-args), a method with `self` can look at the fields but not change them. Writing `self.width = 0` inside `area` is a compile error. That's a useful promise: calling `photo.area()` can never resize your photo. Methods that *do* change the value say so: [mutating methods](node:mutating-methods).

**Inside a method, always write `self.`** to reach fields and other methods: `self.width`, `self.area()`. A bare `width` would be an unknown name.

```compare python
class Rect:
    def area(self) -> float:
        return self.width * self.height   # can also modify self
```

```compare rust
impl Rect {
    fn area(&self) -> f64 { self.width * self.height }
}
```

```exercise
goal: "Add a `perimeter` method that returns `2 * (width + height)` as a `Float64`."
code: |-
  @fieldwise_init
  struct Rect(Copyable):
      var width: Float64
      var height: Float64
checks:
  - match: 'def\s+perimeter\(\s*self\s*\)\s*->\s*Float64\s*:'
    message: 'Start with def perimeter(self) -> Float64:'
  - match: 'return\s+2(\.0)?\s*\*\s*\(\s*self\.width\s*\+\s*self\.height\s*\)'
    message: 'Return 2 * (self.width + self.height)'
solution: |-
  @fieldwise_init
  struct Rect(Copyable):
      var width: Float64
      var height: Float64

      def perimeter(self) -> Float64:
          return 2 * (self.width + self.height)
```

```quiz
question: "Inside `def area(self) -> Float64`, what happens with `self.width = 0.0`?"
options:
  - The rectangle's width is changed.
  - Only a local copy changes.
  - It's a compile error, because plain self is read-only.
answer: 2
explain: A method needs mut self to change fields.
```
