---
title: Trait-constrained functions
icon: "🔌"
branch: types
requires: [traits]
summary: Write one function that works for every type that conforms to a trait.
---
**The problem.** With the `Shape` trait from the [previous lesson](node:traits), you want a `report` function for circles and squares. Without generics, you'd write it twice:

```mojo
def report(shape: Circle):
    print(shape.name(), shape.area())

def report(shape: Square):   # copy, paste, change one word
    print(shape.name(), shape.area())
```

And again for every new shape.

**The solution.** One function, with a *type parameter* in square brackets:

```mojo title=report.mojo
def report[T: Shape](shape: T):
    print(t"{shape.name()}: {shape.area()} m²")

def main():
    report(Circle(1.0))    # circle: 3.14159 m²
    report(Square(2.0))    # square: 4.0 m²
```

Read `[T: Shape]` as: "for any type `T` that conforms to `Shape`". Inside the function, you can call exactly the methods that `Shape` promises, nothing more. Calling `shape.radius` is an error, because not every shape has a radius.

**You don't write the type at the call site.** `report(Circle(1.0))` is enough: Mojo sees a `Circle`, checks that it conforms to `Shape`, and uses `T = Circle`. Passing a type that doesn't conform, like `report(42)`, fails to compile with a message that `Int` doesn't conform to `Shape`.

**It's fast.** The compiler creates a specialized copy of `report` for each type it's used with, so there's no runtime lookup of which `area` to call. You write the code once; the machine runs code that's as fast as if you'd written each version by hand.

**Several constraints.** A type parameter can require more than one trait, by combining them with `&`: `def save[T: Shape & Writable](shape: T)`. The standard library is full of these. `print` itself works on anything `Writable`, which is why your structs could be printed as soon as they listed that trait.

The square brackets aren't only for types. They hold any value the compiler knows ahead of time; that's the subject of the [comptime](node:comptime) branch.

```compare python
def report(shape: Shape) -> None:   # checked by tools, not at runtime
    print(shape.name(), shape.area())
```

```compare rust
fn report<T: Shape>(shape: &T) {
    println!("{}: {}", shape.name(), shape.area());
}
```

```compare javascript
// JS has no type checks here: any object with name() and area() works,
// and a missing method fails at runtime.
function report(shape) { console.log(shape.name(), shape.area()); }
```

```exercise
goal: "Make `total_area` generic: add the type parameter `[T: Shape]` and give both parameters the type `T`."
code: |-
  trait Shape:
      def area(self) -> Float64: ...

  def total_area(a, b) -> Float64:
      return a.area() + b.area()
checks:
  - match: 'def\s+total_area\[\s*T\s*:\s*Shape\s*\]\(\s*a\s*:\s*T\s*,\s*b\s*:\s*T\s*\)\s*->\s*Float64'
    message: 'Write def total_area[T: Shape](a: T, b: T) -> Float64:'
solution: |-
  trait Shape:
      def area(self) -> Float64: ...

  def total_area[T: Shape](a: T, b: T) -> Float64:
      return a.area() + b.area()
```

```quiz
question: "In `def f[T: Shape](x: T)`, which methods can f call on x?"
options:
  - Any method of the concrete type passed in.
  - Only the methods the Shape trait declares.
  - None; generic values can only be passed along.
answer: 1
explain: The function only knows that T conforms to Shape, so it can only use what Shape promises.
```
