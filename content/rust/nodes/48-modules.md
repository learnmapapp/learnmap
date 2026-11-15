---
title: Modules
icon: "🗂️"
branch: tooling
requires: [structs]
summary: mod, pub and use, to organise code into files.
---
A [[module]] groups related code and controls what's visible outside it. Everything is **private** by default; `pub` makes it public:

```rust
mod shapes {
    pub struct Circle {
        pub radius: f64,
    }

    pub fn unit() -> Circle {
        Circle { radius: 1.0 }
    }

    fn secret_helper() {} // only usable inside `shapes`
}

let c = shapes::unit();
```

Note the struct and each field need their own `pub`.

`use` brings a path into scope, so you don't type it every time:

```rust
use std::collections::HashMap;
use shapes::{Circle, unit};
```

Paths start from:

| Start | Means |
| --- | --- |
| `crate::` | the root of your crate |
| `super::` | the parent module |
| `self::` | the current module |
| `std::`, `serde::` | another crate |

Modules usually live in their own files. `mod shapes;` (with a semicolon) tells Rust to look in `src/shapes.rs` or `src/shapes/mod.rs`:

```rust title=src/main.rs
mod shapes;

fn main() {
    let c = shapes::unit();
}
```

```rust title=src/shapes.rs
pub struct Circle { pub radius: f64 }
pub fn unit() -> Circle { Circle { radius: 1.0 } }
```

Forget a `pub` and the error is clear:

```repl shell
> cargo build
error[E0603]: function `secret_helper` is private
```

```compare java
package shapes;
public class Circle { public double radius; }
```

```compare kotlin
package shapes
class Circle(val radius: Double) // public by default; mark private/internal
```

```compare go
package shapes
func Unit() Circle {} // capital letter = exported
```

```compare python
from shapes import Circle  # everything is public; _name is a hint
```

```compare javascript
export function unit() {}
import { unit } from "./shapes.js";
```

```exercise
goal: Make `area` usable from outside the module.
code: |
  mod geometry {
      fn area(w: f64, h: f64) -> f64 {
          w * h
      }
  }
checks:
  - match: 'pub\s+fn\s+area'
    message: Add pub before fn area.
output: geometry::area(2.0, 3.0) == 6.0
```
