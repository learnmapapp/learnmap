---
title: Documentation comments
icon: "📚"
branch: tooling
requires: [testing]
summary: Write docs with ///, build them with cargo doc, and test the examples.
---
Rust has two kinds of comments. `//` is a note for whoever reads the code. `///` is **documentation**: it describes the item right below it, and tools turn it into a website.

```rust title=src/lib.rs
/// Adds two numbers together.
///
/// # Examples
///
/// ```
/// let sum = mylib::add(2, 3);
/// assert_eq!(sum, 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Doc comments are written in Markdown. `# Examples`, `# Errors` and `# Panics` are the usual section headings.

Build and open the docs for your crate and every dependency:

```repl shell
> cargo doc --open
 Documenting mylib v0.1.0
    Finished `dev` profile
     Opening target/doc/mylib/index.html
```

It's the same format as the official docs on docs.rs, so every Rust library looks and works alike.

## Examples are tests

Here's the best part. Code blocks inside doc comments are compiled and run by `cargo test`:

```repl shell
> cargo test
   Doc-tests mylib
test src/lib.rs - add (line 5) ... ok
```

So your examples can never quietly go out of date. If someone changes `add`, the example fails.

For documenting a whole module or crate, use `//!` at the top of the file. It describes the thing it's *inside* rather than the thing below it.

```compare java
/** Adds two numbers together. */
```

```compare python
def add(a, b):
    """Adds two numbers together."""
```

```compare go
// Add adds two numbers together.
```

```compare typescript
/** Adds two numbers together. */
```

```exercise
goal: "Turn the plain comment into a documentation comment."
code: |
  // Returns the larger of two numbers.
  pub fn max(a: i32, b: i32) -> i32 {
      if a > b { a } else { b }
  }
checks:
  - match: '^///\s*Returns the larger of two numbers\.'
    message: "Use three slashes: /// Returns the larger of two numbers."
solution: |
  /// Returns the larger of two numbers.
  pub fn max(a: i32, b: i32) -> i32 {
      if a > b { a } else { b }
  }
```

```quiz
question: What happens to code examples inside /// comments when you run cargo test?
options:
  - They're ignored.
  - They're compiled and run as tests.
  - They're only checked for formatting.
answer: 1
explain: Doc examples are doc-tests, so your documentation stays correct.
```
