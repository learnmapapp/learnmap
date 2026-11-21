---
title: Operator overloading
icon: "➕"
branch: traits
requires: [traits, derive]
summary: Make + and * work on your own types.
---
In Rust, `a + b` is shorthand for `a.add(b)`, a method from the `Add` trait in `std::ops`. Implement that trait and `+` works for your type:

```rust title=src/main.rs
use std::ops::Add;

#[derive(Debug, Clone, Copy, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point { x: self.x + other.x, y: self.y + other.y }
    }
}

fn main() {
    let a = Point { x: 1, y: 2 };
    let b = Point { x: 10, y: 20 };
    println!("{:?}", a + b); // Point { x: 11, y: 22 }
}
```

`type Output` says what the result type is. It's usually the same type, but doesn't have to be.

Each operator has its own trait:

| Operator | Trait |
| --- | --- |
| `+` `-` `*` `/` | `Add`, `Sub`, `Mul`, `Div` |
| `+=` | `AddAssign` |
| `-x` | `Neg` |
| `a[i]` | `Index` |
| `==` | `PartialEq` (usually derived) |
| `<` `>` | `PartialOrd` (usually derived) |

You can also implement it for a different right-hand side, like scaling a point by a number:

```rust
impl std::ops::Mul<i32> for Point {
    type Output = Point;
    fn mul(self, k: i32) -> Point {
        Point { x: self.x * k, y: self.y * k }
    }
}
```

```tip
Only overload operators where the meaning is obvious, like maths on vectors, money or time. `user + group` would just confuse people.
```

```compare python
def __add__(self, other): return Point(self.x + other.x, self.y + other.y)
```

```compare kotlin
operator fun plus(other: Point) = Point(x + other.x, y + other.y)
```

```compare java
// Java has no operator overloading: a.add(b)
```

```compare go
// Go has no operator overloading: a.Add(b)
```

```exercise
goal: "Implement `Add` for `Money`, adding the `cents` fields together."
code: |
  #[derive(Debug, Clone, Copy)]
  struct Money {
      cents: i64,
  }
checks:
  - match: 'impl\s+(std::ops::)?Add\s+for\s+Money'
    message: Start with impl Add for Money {
  - match: 'type\s+Output\s*=\s*(Money|Self)\s*;'
    message: "Declare type Output = Money;"
  - match: 'fn\s+add\s*\(\s*self\s*,\s*\w+\s*:\s*(Money|Self)\s*\)\s*->\s*(Money|Self)'
    message: "Add fn add(self, other: Money) -> Money"
  - match: 'self\.cents\s*\+\s*\w+\.cents'
    message: Add self.cents and other.cents.
solution: |
  #[derive(Debug, Clone, Copy)]
  struct Money {
      cents: i64,
  }

  impl Add for Money {
      type Output = Money;

      fn add(self, other: Money) -> Money {
          Money { cents: self.cents + other.cents }
      }
  }
```

```quiz
question: "Which trait do you implement to make `a * b` work?"
options:
  - "`Times`"
  - "`Mul`"
  - "`Multiply`"
answer: 1
explain: Each operator maps to a trait in std::ops. * is Mul.
```
