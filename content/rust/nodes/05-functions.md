---
title: Functions
icon: "🔧"
branch: basics
requires: [types]
summary: fn, typed parameters, and the missing semicolon.
---
Functions start with `fn`. Parameters always have a type, and `->` gives the return type:

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Notice: no `return`, and no semicolon after `a + b`. In Rust, a block evaluates to its last [[expression]]. Put a semicolon there and it becomes a statement that returns nothing:

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b;
}
```

```repl shell
> cargo build
error[E0308]: mismatched types
  expected `i32`, found `()`
  help: remove this semicolon to return this value
```

`()` is the "nothing" type. You can still use `return` for an early exit.

```compare python
def add(a: int, b: int) -> int:
    return a + b
```

```compare javascript
const add = (a, b) => a + b;
```

```compare java
int add(int a, int b) { return a + b; }
```

```compare kotlin
fun add(a: Int, b: Int): Int = a + b
```

```compare go
func add(a int, b int) int { return a + b }
```

```exercise
goal: Make `double` return its argument times two.
code: |
  fn double(n: i32) -> i32 {
      n * 2;
  }
checks:
  - match: 'n\s*\*\s*2'
    message: Keep n * 2.
  - notMatch: 'n\s*\*\s*2\s*;'
    message: That semicolon turns the value into a statement. Remove it (or use return).
output: "double(21) == 42"
```

## Blocks are expressions

Not just functions: every `{ … }` block produces its last expression. That lets you compute a value in a little scope of its own:

```rust
let area = {
    let w = 3;
    let h = 4;
    w * h
}; // 12
```

Functions can be declared anywhere in the file, before or after they're used, and names use `snake_case` by convention. The compiler warns if you write `fn addNumbers`.

A function that never returns, like one that always panics or loops forever, has the return type `!`.

```quiz
question: "What does  fn hi() { }  return?"
options:
  - Nothing at all; it's not a value.
  - "() , the unit type"
  - null
answer: 1
explain: Functions without a return type return (), the empty tuple. There's no null in Rust.
```
