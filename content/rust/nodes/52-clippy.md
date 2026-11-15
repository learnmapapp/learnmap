---
title: Clippy and rustfmt
icon: "📎"
branch: tooling
requires: [testing]
summary: Formatting and lints, so you never argue about style.
---
Rust ships with two tools that make every codebase look and feel familiar.

**rustfmt** formats your code in the one official style:

```shell
$ cargo fmt
```

No configuration debates, no tabs-versus-spaces. Most editors run it on save.

**Clippy** is a linter with hundreds of checks. It catches mistakes, slow code and non-idiomatic patterns, and usually tells you the better way:

```repl shell
> cargo clippy
warning: length comparison to zero
  --> src/main.rs:4:8
   |
 4 |     if names.len() == 0 {
   |        ^^^^^^^^^^^^^^^^ help: using `is_empty` is clearer: `names.is_empty()`
```

Lints come in groups. `clippy::all` is on by default; `clippy::pedantic` is stricter. You can allow a lint where it doesn't fit:

```rust
#[allow(clippy::too_many_arguments)]
fn build(a: u8, b: u8, c: u8, d: u8, e: u8, f: u8, g: u8, h: u8) {}
```

Other tools worth knowing:

| Command | Does |
| --- | --- |
| `cargo check` | type-check without building; much faster |
| `cargo doc --open` | build and open the docs |
| `cargo build --release` | optimised build |
| `rustup update` | update the toolchain |
| `cargo clippy --fix` | apply suggestions automatically |

```tip
In CI, run `cargo fmt --check` and `cargo clippy -- -D warnings` to fail the build on unformatted code or any lint.
```

```compare javascript
npx prettier --write . && npx eslint .
```

```compare python
ruff format . && ruff check .
```

```compare go
gofmt -w . && go vet ./...
```

```compare java
// Checkstyle, SpotBugs, or your IDE's formatter.
```

```compare kotlin
// ktlint or detekt.
```

```exercise
goal: Apply Clippy's suggestion.
code: |
  if crabs.len() == 0 {
      println!("no crabs");
  }
checks:
  - match: 'crabs\.is_empty\(\)'
    message: Use crabs.is_empty() instead of comparing the length to 0.
output: no crabs
```
