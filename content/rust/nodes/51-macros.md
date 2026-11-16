---
title: Macros
icon: "🪄"
branch: tooling
requires: [patterns]
summary: "macro_rules!: code that writes code."
---
You've used plenty of [[macro|macros]]: `println!`, `vec!`, `format!`, `assert_eq!`. They run at compile time and expand into ordinary code. That's how `println!` can check your format string, and how `vec!` takes any number of arguments, which normal functions can't.

You can write your own with `macro_rules!`. A macro matches **patterns of code** instead of values:

```rust
macro_rules! square {
    ($x:expr) => {
        $x * $x
    };
}

square!(7); // expands to 7 * 7
```

`$x:expr` means "capture any expression and call it `$x`". Other fragment types include `ident` (a name), `ty` (a type) and `tt` (any token).

Repetition uses `$( ... ),*`, which is how `vec!` is built:

```rust
macro_rules! my_vec {
    ($($item:expr),*) => {{
        let mut v = Vec::new();
        $( v.push($item); )*
        v
    }};
}

let v = my_vec![1, 2, 3];
```

The second kind, **procedural macros**, are Rust programs that transform code. `#[derive(Debug)]` is one, as are `#[tokio::main]` and serde's `#[derive(Serialize)]`. They're more work to write, and live in their own crate.

```tip
Reach for a function first. Use a macro when a function can't do it: a variable number of arguments, generating items like structs or impls, or a small domain-specific syntax. `cargo expand` shows what a macro turns into.
```

```compare kotlin
// No macros; inline functions and compiler plugins fill some of the
// gap.
```

```compare java
// No macros; annotation processors (like Lombok) generate code
// instead.
```

```compare python
# No macros; decorators and metaclasses rewrite behaviour at runtime.
```

```compare javascript
// No macros; Babel plugins transform code at build time.
```

```compare go
// No macros; `go generate` runs code generators before building.
```

```exercise
goal: Write a macro `double!` that expands to its expression times 2.
code: |
  macro_rules! double {
  }
checks:
  - match: '\(\s*\$\w+\s*:\s*expr\s*\)\s*=>'
    message: "Add a rule that captures an expression: ($x:expr) => { ... };"
  - match: '\$\w+\s*\*\s*2|2\s*\*\s*\$\w+'
    message: "Expand to  $x * 2"
output: double!(21) == 42
```
