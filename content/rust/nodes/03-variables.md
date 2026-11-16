---
title: Variables
icon: "📌"
branch: basics
requires: [cargo]
summary: let, mut, and why things don't change by default.
---
Create a variable with `let`. Rust usually figures out the type itself:

```rust
let apples = 5;
let name = "Ferris";
```

Here's the twist: variables are **immutable** by default. Once set, they stay put:

```rust
let apples = 5;
apples = 6;
```

```repl shell
> cargo run
error[E0384]: cannot assign twice to immutable variable `apples`
```

If you want to change it, say so with `mut`. That makes the code honest: anyone reading it sees immediately which values move around.

```rust
let mut apples = 5;
apples += 1; // fine
```

```compare javascript
const apples = 5;  // Rust's `let`
let pears = 5;     // Rust's `let mut`
```

```compare kotlin
val apples = 5  // Rust's `let`
var pears = 5   // Rust's `let mut`
```

```compare java
final int apples = 5;  // Rust's `let`
int pears = 5;         // Rust's `let mut`
```

```compare python
# Python has no immutable variables; Rust's default is like a constant
# you can't reassign.
apples = 5
```

```compare go
apples := 5  // always mutable in Go; Rust needs `let mut` for this
```

You can also give the type explicitly with a colon: `let apples: u32 = 5;`.

```exercise
goal: Make this compile by allowing `score` to change.
code: |
  fn main() {
      let score = 0;
      score += 10;
      println!("{score}");
  }
checks:
  - match: 'let\s+mut\s+score'
    message: Add mut to the binding that changes.
output: "10"
hint: let mut score = 0;
```

## Why immutable by default?

Most variables never change after they're set. Making that the default means the rare `mut` stands out, and you can read code knowing nothing else will quietly change a value behind your back.

You can declare a variable first and set it later, as long as it's set exactly once before use:

```rust
let message;
if happy {
    message = "yay";
} else {
    message = "meh";
}
```

Unused variables trigger a warning. Prefix the name with an underscore, like `_unused`, to say "I know".

```quiz
question: What happens with  `let x = 5; let x = x + 1;`  ?
options:
  - A compile error, x is immutable.
  - It creates a new variable x that shadows the first one.
  - It changes x in place.
answer: 1
explain: That's shadowing, a brand new binding with the same name. More in the shadowing lesson.
```
