---
title: Cargo
icon: "📦"
branch: basics
requires: [rust]
summary: Create, build and run a project with one tool.
---
[[cargo|Cargo]] does everything around your code: create a project, fetch libraries, compile, test and run.

```shell
$ cargo new hello
$ cd hello
$ cargo run
   Compiling hello v0.1.0
    Finished dev profile
     Running `target/debug/hello`
Hello, world!
```

`cargo new` gives you two files:

```rust title=src/main.rs
fn main() {
    println!("Hello, world!");
}
```

```toml title=Cargo.toml
[package]
name = "hello"
version = "0.1.0"
edition = "2024"

[dependencies]
```

`main` is where the program starts. `println!` has an exclamation mark because it's a [[macro]], not a normal function.

```compare javascript
// Cargo.toml is like package.json, and `cargo run` like `npm start`.
console.log("Hello, world!");
```

```compare python
# Cargo.toml is like pyproject.toml; cargo is pip + venv + a build tool in one.
print("Hello, world!")
```

```compare java
// Cargo is Maven or Gradle, but with zero config to start.
public static void main(String[] args) { System.out.println("Hello, world!"); }
```

```compare kotlin
// Cargo is Gradle, minus the build script.
fun main() { println("Hello, world!") }
```

```compare go
// cargo new ≈ go mod init, cargo run ≈ go run .
fmt.Println("Hello, world!")
```

```exercise
goal: Make the program print `Hello, crab!`.
code: |
  fn main() {
      println!("Hello, world!");
  }
checks:
  - match: 'println!\s*\('
    message: Keep using println! (with the exclamation mark).
  - match: 'println!\s*\(\s*"Hello, crab!"\s*\)\s*;'
    message: Change the text inside the quotes.
output: Hello, crab!
```

## The everyday commands

| Command | Does |
| --- | --- |
| `cargo new name` | create a project |
| `cargo run` | build and run |
| `cargo check` | only type-check, much faster than a build |
| `cargo build --release` | an optimised build in `target/release` |
| `cargo test` | run the tests |
| `cargo add serde` | add a dependency |

Debug builds compile fast but run slower; release builds are the other way around. Benchmark with `--release`, always.

```quiz
question: You only want to know whether your code compiles, as fast as possible. Which command?
options:
  - cargo run
  - cargo check
  - cargo build --release
answer: 1
explain: cargo check skips generating machine code, so it's the quickest feedback loop.
```
