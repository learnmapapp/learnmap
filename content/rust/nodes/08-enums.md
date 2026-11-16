---
title: Enums
icon: "🚦"
branch: data
requires: [structs]
summary: One of several variants, each with its own data.
---
An [[enum]] is a type that is **exactly one** of a fixed list of variants:

```rust
enum Light {
    Red,
    Yellow,
    Green,
}
```

So far, like enums anywhere. But in Rust each variant can carry its own data:

```rust
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Point,
}

let s = Shape::Circle { radius: 2.0 };
```

That turns out to be incredibly useful. Rust uses it for some of its most important types, like [[option|Option]] and [[result|Result]].

```compare kotlin
sealed interface Shape {
    data class Circle(val radius: Double) : Shape
    data class Rectangle(val width: Double, val height: Double) : Shape
    data object Point : Shape
}
```

```compare java
sealed interface Shape permits Circle, Rectangle, Point {}
record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}
record Point() implements Shape {}
```

```compare python
# Closest thing: a union of dataclasses.
Shape = Circle | Rectangle | Point
```

```compare javascript
// Usually a "tagged" object:
const s = { kind: "circle", radius: 2 };
```

```compare go
// Go has no sum types; an interface with a marker method is the usual
// stand-in.
type Shape interface{ isShape() }
```

```exercise
goal: Add a `Triangle` variant with a `base` and a `height`, both `f64`.
code: |
  enum Shape {
      Circle { radius: f64 },
      Point,
  }
checks:
  - match: 'Triangle\s*\{[^}]*base\s*:\s*f64[^}]*\}'
    message: "Write it like Circle: Triangle { base: f64, height: f64 },"
  - match: 'Triangle\s*\{[^}]*height\s*:\s*f64[^}]*\}'
    message: Don't forget the height field.
output: enum Shape { Circle, Point, Triangle }
```

## Enums can have methods too

Just like structs, enums get an `impl` block:

```rust
impl Light {
    fn next(&self) -> Light {
        match self {
            Light::Red => Light::Green,
            Light::Green => Light::Yellow,
            Light::Yellow => Light::Red,
        }
    }
}
```

Variants can hold data in three shapes: none (`Point`), named fields (`Circle { radius: f64 }`), or positional ones (`Rgb(u8, u8, u8)`).

Use an enum whenever something is "one of these things". It's much safer than a struct with optional fields where only some combinations make sense: invalid states simply can't be built.

```quiz
question: "A network request is Loading, Loaded with some data, or Failed with an error. Best model?"
options:
  - A struct with loading, data and error fields.
  - An enum with three variants, two of them carrying data.
  - Three booleans.
answer: 1
explain: The enum makes impossible combinations, like loading with an error, impossible to represent.
```
