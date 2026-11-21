---
title: Constants and statics
icon: "📌"
branch: basics
requires: [variables]
summary: Values fixed at compile time, with const and static.
---
A `let` binding lives inside a function. Sometimes you want a value that's fixed forever and usable everywhere: a maximum size, a tax rate, a greeting. That's a **constant**:

```rust title=src/main.rs
const MAX_PLAYERS: u32 = 4;
const TAX_RATE: f64 = 0.21;

fn main() {
    let price = 100.0;
    println!("Up to {MAX_PLAYERS} players");
    println!("With tax: {}", price * (1.0 + TAX_RATE));
}
```

Three rules make constants different from `let`:

- The **type is required**. `const MAX = 4;` won't compile.
- The value must be known **at compile time**. You can't call `read_line()` to fill a constant.
- By convention, names are `SCREAMING_SNAKE_CASE`.

```repl shell
> cargo build
error: missing type for `const` item
  help: provide a type for the constant: `MAX: i32`
```

The compiler pastes a `const` into every place it's used, a bit like copy and paste. A `static` is similar, but it's a single value at one fixed spot in memory, which matters when you need one shared address (for example, a global counter with atomics):

```rust
static GREETING: &str = "Hello";
```

```tip
Use `const` almost always. Reach for `static` only when you truly need one memory location for the whole program.
```

```compare python
MAX_PLAYERS = 4   # only a naming convention; Python lets you change it
```

```compare javascript
const MAX_PLAYERS = 4; // JS const is closer to Rust's let
```

```compare java
static final int MAX_PLAYERS = 4;
```

```compare kotlin
const val MAX_PLAYERS = 4
```

```compare go
const MaxPlayers = 4
```

```exercise
goal: Turn the `let` into a constant called `MAX_LIVES` of type `u8`, defined outside `main`.
code: |
  fn main() {
      let max_lives = 3;
      println!("{max_lives}");
  }
checks:
  - match: 'const\s+MAX_LIVES\s*:\s*u8\s*=\s*3\s*;'
    message: "Write const MAX_LIVES: u8 = 3; with the type after a colon."
  - match: 'println!\("\{MAX_LIVES\}"\)'
    message: Print MAX_LIVES instead of max_lives.
solution: |
  const MAX_LIVES: u8 = 3;

  fn main() {
      println!("{MAX_LIVES}");
  }
```

```quiz
question: Why doesn't `const SIZE = 10;` compile?
options:
  - Constants must be lowercase.
  - Constants always need an explicit type.
  - Constants can only hold strings.
answer: 1
explain: "Rust won't guess the type of a constant. Write const SIZE: usize = 10;"
```
