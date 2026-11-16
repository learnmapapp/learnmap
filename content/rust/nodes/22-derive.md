---
title: derive and common traits
icon: "🪄"
branch: traits
requires: [traits]
summary: Debug, Clone, PartialEq, Default and friends for free.
---
`Some` traits are so mechanical that the compiler can write them for you. Put `#[derive(...)]` above a struct or enum:

```rust
#[derive(Debug, Clone, PartialEq, Default)]
struct Crab {
    name: String,
    legs: u8,
}
```

Now you get:

| Trait | Gives you |
| --- | --- |
| `Debug` | printing with `{:?}` |
| `Clone` | `.clone()` for a deep copy |
| `Copy` | implicit copies, like numbers (only for small, simple types) |
| `PartialEq`, `Eq` | `==` and `!=` |
| `PartialOrd`, `Ord` | `<`, `>`, and sorting |
| `Hash` | use as a `HashMap` key |
| `Default` | `Crab::default()`, with zero, empty, `false` fields |

```rust
let a = Crab { name: "Ferris".into(), legs: 10 };
let b = a.clone();
println!("{:?}", a);  // Crab { name: "Ferris", legs: 10 }
println!("{}", a == b); // true
```

Without `Debug`, printing fails, with a helpful hint:

```repl shell
> cargo build
error[E0277]: `Crab` doesn't implement `Debug`
  help: add `#[derive(Debug)]` to `Crab`
```

Deriving only works when all the fields implement the trait too. A struct holding a type without `Hash` can't derive `Hash`.

`Display` (for `{}`) is **never** derived: there's no single right way to show a value to users, so you write that one yourself:

```rust
impl std::fmt::Display for Crab {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{} the crab", self.name)
    }
}
```

```compare java
record Crab(String name, int legs) {} // equals, hashCode, toString for free
```

```compare kotlin
data class Crab(val name: String, val legs: Int) // equals, hashCode, toString, copy
```

```compare python
@dataclass
class Crab:
    name: str
    legs: int
```

```compare javascript
// Nothing built in: === compares references, not contents.
```

```compare go
// Structs compare with == when all fields are comparable; %+v prints them.
```

```exercise
goal: Make `Point` printable with {:?} and comparable with ==.
code: |
  struct Point {
      x: i32,
      y: i32,
  }
checks:
  - match: '#\[derive\([^)]*Debug'
    message: "Add #[derive(Debug)] above the struct."
  - match: '#\[derive\([^)]*PartialEq'
    message: Add PartialEq to the derive list as well.
output: "Point { x: 1, y: 2 } true"
```
