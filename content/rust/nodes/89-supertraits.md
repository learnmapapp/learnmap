---
title: Supertraits
icon: "🪜"
branch: traits
requires: [trait-bounds]
summary: A trait that requires another trait.
---
Sometimes a trait only makes sense if the type can already do something else. A `Report` trait might want to print the value, so it needs `Display`. You say so with a **supertrait**:

```rust title=src/main.rs
use std::fmt;

trait Report: fmt::Display {
    fn report(&self) {
        println!("[REPORT] {self}"); // allowed, because Display is guaranteed
    }
}

struct Sales(u32);

impl fmt::Display for Sales {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} units sold", self.0)
    }
}

impl Report for Sales {}

fn main() {
    Sales(42).report(); // [REPORT] 42 units sold
}
```

`trait Report: fmt::Display` reads as "to be a `Report`, you must also be `Display`". Inside the trait you can then use everything `Display` offers.

If you forget the `Display` impl, the compiler tells you:

```repl shell
> cargo build
error[E0277]: `Sales` doesn't implement `std::fmt::Display`
  note: required by a bound in `Report`
```

This is **not** inheritance: `Sales` still writes two separate `impl` blocks. A supertrait is just a requirement.

You can require several with `+`:

```rust
trait Entity: fmt::Debug + Clone + PartialEq {}
```

```compare java
interface Report extends Printable { }
```

```compare kotlin
interface Report : Printable
```

```compare typescript
interface Report extends Printable { }
```

```compare go
type Report interface { fmt.Stringer; Report() }
```

```exercise
goal: "Make `Shape` require `Debug`, by turning it into a supertrait."
code: |
  trait Shape {
      fn area(&self) -> f64;
  }
checks:
  - match: 'trait\s+Shape\s*:\s*(std::fmt::|fmt::)?Debug\s*\{'
    message: "Write trait Shape: Debug {"
solution: |
  trait Shape: Debug {
      fn area(&self) -> f64;
  }
```

```quiz
question: "What does `trait Animal: Clone` mean?"
options:
  - Animal inherits Clone's fields.
  - Any type implementing Animal must also implement Clone.
  - Animal values are cloned automatically.
answer: 1
explain: A supertrait is a requirement on implementors, not inheritance.
```
