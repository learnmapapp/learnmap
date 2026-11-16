---
title: Trait contracts
icon: "📜"
branch: types
requires: [methods]
summary: A trait lists the methods a type promises to have, so code can rely on them.
---
Think of a power socket. It doesn't care whether you plug in a kettle, a lamp or a laptop charger. It only cares that the plug has the right shape. A [[trait]] is that plug shape, for types: a list of methods a type promises to provide.

```mojo title=shapes.mojo
trait Shape:
    def area(self) -> Float64: ...
    def name(self) -> String: ...

@fieldwise_init
struct Circle(Shape):
    var radius: Float64

    def area(self) -> Float64:
        return 3.14159 * self.radius * self.radius

    def name(self) -> String:
        return "circle"

@fieldwise_init
struct Square(Shape):
    var side: Float64

    def area(self) -> Float64:
        return self.side * self.side

    def name(self) -> String:
        return "square"
```

**The pieces:**

- **`trait Shape:`** declares the contract. The `...` means "no body here; each type writes its own".
- **`struct Circle(Shape)`** says "Circle conforms to Shape". The compiler then checks it: leave out `name`, and you get an error that `Circle` doesn't implement every method `Shape` requires.
- **Several traits** go in the same parentheses: `struct Circle(Shape, Copyable, Writable)`. You've been using traits since the [structs](node:structs) lesson; `Copyable` and `Writable` are traits from the standard library.

**Default methods.** A trait can also provide a method with a body. Every conforming type gets it for free, and can still write its own version:

```mojo
trait Shape:
    def area(self) -> Float64: ...
    def name(self) -> String: ...

    def describe(self) -> String:
        return String(t"a {self.name()} of {self.area()} m²")
```

**Why this matters.** On its own, a trait just documents a shape. The payoff comes in the next lesson: functions that accept *any* type with that shape, like a socket accepts any plug. That's how Mojo shares behavior between types, instead of using class inheritance.

```compare python
from typing import Protocol

class Shape(Protocol):
    def area(self) -> float: ...
```

```compare rust
trait Shape {
    fn area(&self) -> f64;
}
impl Shape for Circle { fn area(&self) -> f64 { 3.14159 * self.radius * self.radius } }
```

```exercise
goal: "Declare that `Triangle` conforms to the `Shape` trait, so it can be used wherever a Shape is expected."
code: |-
  trait Shape:
      def area(self) -> Float64: ...

  @fieldwise_init
  struct Triangle:
      var base: Float64
      var height: Float64

      def area(self) -> Float64:
          return 0.5 * self.base * self.height
checks:
  - match: 'struct\s+Triangle\s*\(\s*Shape\s*\)\s*:'
    message: 'Write struct Triangle(Shape):'
solution: |-
  trait Shape:
      def area(self) -> Float64: ...

  @fieldwise_init
  struct Triangle(Shape):
      var base: Float64
      var height: Float64

      def area(self) -> Float64:
          return 0.5 * self.base * self.height
```

```quiz
question: "A struct declares `(Shape)` but doesn't define one of Shape's required methods. What happens?"
options:
  - It compiles, and calling the method crashes.
  - The compiler reports the missing method.
  - The method returns a default value.
answer: 1
explain: Conformance is checked at compile time, so missing methods are caught before anything runs.
```
