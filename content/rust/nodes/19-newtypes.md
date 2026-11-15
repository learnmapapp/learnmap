---
title: Tuple structs and newtypes
icon: "🏷️"
branch: data
requires: [structs, tuples]
summary: Structs without field names, and wrapping a type to give it meaning.
---
Sometimes field names add nothing. A **tuple struct** has fields by position:

```rust
struct Color(u8, u8, u8);

let orange = Color(222, 122, 75);
println!("red = {}", orange.0);
```

A **unit struct** has no fields at all. It's useful as a marker, or to hang trait implementations on:

```rust
struct Silent;
```

The most useful trick is the **newtype**: a tuple struct with one field, wrapping an existing type to give it a meaning:

```rust
struct Meters(f64);
struct Seconds(f64);

fn speed(d: Meters, t: Seconds) -> f64 {
    d.0 / t.0
}
```

Both are just an `f64` in memory, so there is zero cost. But now the compiler catches mixed-up arguments:

```rust
speed(Seconds(9.58), Meters(100.0));
```

```repl shell
> cargo build
error[E0308]: mismatched types
  expected `Meters`, found `Seconds`
```

```tip
Newtypes are also how you implement a trait you don't own for a type you don't own. You can't `impl Display for Vec<u8>`, but you can for `struct Bytes(Vec<u8>)`.
```

```compare python
from typing import NewType
Meters = NewType("Meters", float)  # only checked by type checkers
```

```compare javascript
// No equivalent; TypeScript users fake it with "branded" types.
```

```compare java
record Meters(double value) {}
```

```compare kotlin
@JvmInline value class Meters(val value: Double)
```

```compare go
type Meters float64
```

```exercise
goal: Make a newtype `UserId` that wraps a `u64`.
code: |
  struct Order {
      user: UserId,
  }
checks:
  - match: 'struct\s+UserId\s*\(\s*(pub\s+)?u64\s*\)\s*;'
    message: "A newtype looks like  struct UserId(u64);"
output: "Order { user: UserId(42) }"
```
