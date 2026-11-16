---
title: Generics
icon: "🧪"
branch: traits
requires: [traits]
summary: Write code once for many types, with type parameters.
---
You've already used [[generic]] types: `Vec<T>`, `Option<T>`, `HashMap<K, V>`. The `T` is a **type parameter**, filled in when you use it.

Your own structs and enums can have them:

```rust
struct Pair<T> {
    left: T,
    right: T,
}

let numbers = Pair { left: 1, right: 2 };
let words = Pair { left: "crab", right: "shell" };
```

So can functions. This one works for any `T`:

```rust
fn first<T>(items: Vec<T>) -> Option<T> {
    items.into_iter().next()
}
```

And methods, with `impl<T>`:

```rust
impl<T> Pair<T> {
    fn swap(self) -> Pair<T> {
        Pair { left: self.right, right: self.left }
    }
}
```

But you can't do much with a completely unknown `T`. Comparing or printing it needs a guarantee that it *can* be compared or printed. That's what [trait bounds](node:trait-bounds) are for:

```rust
fn largest<T: PartialOrd>(a: T, b: T) -> T {
    if a > b { a } else { b }
}
```

Generics have no runtime cost. The compiler makes a specialised copy for each type you actually use ("monomorphisation"), as if you'd written them by hand.

```compare java
class Pair<T> { T left; T right; }
<T extends Comparable<T>> T largest(T a, T b) { ... }
```

```compare kotlin
class Pair<T>(val left: T, val right: T)
fun <T : Comparable<T>> largest(a: T, b: T): T = if (a > b) a else b
```

```compare go
type Pair[T any] struct { Left, Right T }
func Largest[T cmp.Ordered](a, b T) T { ... }
```

```compare python
class Pair(Generic[T]): ...   # type hints only
```

```compare javascript
// No generics; TypeScript has them: class Pair<T> { ... }
```

```exercise
goal: Make Wrapper generic, so it can hold any type instead of only `i32`.
code: |
  struct Wrapper {
      value: i32,
  }
checks:
  - match: struct\s+Wrapper\s*<\s*T\s*>
    message: "Declare the type parameter: struct Wrapper<T>"
  - match: value\s*:\s*T\b
    message: "Use it for the field: value: T"
output: 'Wrapper { value: "crab" }'
```
