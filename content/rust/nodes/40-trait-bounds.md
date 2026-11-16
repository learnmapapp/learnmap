---
title: Trait bounds
icon: "🧷"
branch: traits
requires: [generics]
summary: "T: Display, where clauses, and impl Trait."
---
A **trait bound** limits a type parameter to types that implement a trait. Then you can use that trait's methods:

```rust
use std::fmt::Display;

fn shout<T: Display>(thing: T) -> String {
    format!("{thing}!").to_uppercase()
}

shout("crab");  // "CRAB!"
shout(42);      // "42!"
```

Several bounds join with `+`. When the list gets long, move it into a `where` clause:

```rust
fn report<T, U>(a: T, b: U) -> String
where
    T: Display + Clone,
    U: std::fmt::Debug,
{
    format!("{a} / {b:?}")
}
```

`impl Trait` is shorthand for a simple bound in argument position:

```rust
fn shout(thing: impl Display) -> String { /* same as above */ }
```

In return position, it means "I return *some* type that implements this, I won't tell you which". That's how you return closures and iterator chains, whose real types are unspeakable:

```rust
fn evens() -> impl Iterator<Item = u32> {
    (0..).step_by(2)
}
```

Forget a bound and the compiler tells you exactly which one:

```repl shell
> cargo build
error[E0369]: binary operation `>` cannot be applied to type `T`
  help: consider restricting type parameter `T`: `T: std::cmp::PartialOrd`
```

```compare java
<T extends Comparable<T> & Serializable> T max(T a, T b)
```

```compare kotlin
fun <T> report(a: T) where T : CharSequence, T : Comparable<T> { }
```

```compare go
func Max[T cmp.Ordered](a, b T) T
```

```compare python
# Protocols, checked by type checkers:
def shout(thing: SupportsStr) -> str: ...
```

```compare javascript
// Duck typing: anything with the right method works, unchecked.
```

```exercise
goal: Add a bound so `show` can print any T with {}.
code: |
  fn show<T>(item: T) {
      println!("{item}");
  }
checks:
  - match: 'fn\s+show\s*<\s*T\s*:\s*(std::fmt::)?Display\s*>|where\s+T\s*:\s*(std::fmt::)?Display'
    message: "Add the bound: fn show<T: Display>(item: T)"
output: show(42) prints 42
```
