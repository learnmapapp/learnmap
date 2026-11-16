---
title: Trait objects
icon: "🎭"
branch: traits
requires: [trait-bounds, box]
summary: dyn Trait, for collections of different types.
---
Generics pick one concrete type at compile time. But what if a list holds *different* types?

```rust
trait Shape {
    fn area(&self) -> f64;
}

struct Circle { r: f64 }
struct Square { side: f64 }
// impl Shape for both…
```

A `Vec<T>` holds one `T`. You can't put a Circle and a Square in it. Unless you use a **trait object**: `dyn Shape`, meaning "some type that implements Shape, decided at runtime":

```rust
let shapes: Vec<Box<dyn Shape>> = vec![
    Box::new(Circle { r: 1.0 }),
    Box::new(Square { side: 2.0 }),
];

let total: f64 = shapes.iter().map(|s| s.area()).sum();
```

Why the `Box`? Circles and Squares have different sizes, and a Vec needs every element the same size. A Box is always one pointer. `&dyn Shape` works too, when you only borrow.

The cost: each call goes through a small lookup table (a "vtable") to find the right `area`. That's what interfaces in Java or Go do all the time. Generics avoid it, but can't mix types.

| | Generics `<T: Shape>` | Trait objects `dyn Shape` |
| --- | --- | --- |
| decided | at compile time | at runtime |
| mix types in one list | no | yes |
| speed | fastest | one extra pointer hop |

```compare java
// always dynamic
List<Shape> shapes = List.of(new Circle(1), new Square(2));
```

```compare kotlin
val shapes: List<Shape> = listOf(Circle(1.0), Square(2.0))
```

```compare go
// interfaces are always dynamic
shapes := []Shape{Circle{1}, Square{2}}
```

```compare python
shapes = [Circle(1), Square(2)]  # duck typing
```

```compare javascript
const shapes = [new Circle(1), new Square(2)];
```

```exercise
goal: Give `pets` a type that can hold both a Dog and a Cat, which both implement Speak.
code: |
  let pets: Vec<Dog> = vec![Box::new(Dog), Box::new(Cat)];
checks:
  - match: 'Vec<\s*Box<\s*dyn\s+Speak\s*>\s*>'
    message: "Use Vec<Box<dyn Speak>>."
output: '["woof", "meow"]'
```
