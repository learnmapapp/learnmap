---
title: Using crates
icon: "🚚"
branch: tooling
requires: [modules, cargo]
summary: Add dependencies from crates.io.
---
A [[crate]] is a package of Rust code. Thousands of them live on **crates.io**. Add one with `cargo add`:

```shell
$ cargo add rand
    Updating crates.io index
      Adding rand v0.9 to dependencies
```

That writes it into `Cargo.toml`:

```toml title=Cargo.toml
[dependencies]
rand = "0.9"
```

And now you can use it:

```rust
use rand::Rng;

fn main() {
    let roll = rand::rng().random_range(1..=6);
    println!("you rolled {roll}");
}
```

The next `cargo build` downloads and compiles it. `Cargo.lock` records the exact versions used, so builds are reproducible. Commit it for applications.

Version numbers follow semver. `"0.9"` means "0.9.x, any compatible update". `cargo update` moves to the newest compatible versions.

Many crates have optional **features**, extra functionality you switch on:

```toml
serde = { version = "1", features = ["derive"] }
```

Some crates you'll meet everywhere:

| Crate | For |
| --- | --- |
| `serde` + `serde_json` | (de)serialising data |
| `clap` | command-line arguments |
| `tokio` | async runtime |
| `reqwest` | HTTP client |
| `anyhow` / `thiserror` | error handling |
| `rand` | random numbers |

```tip
`docs.rs` hosts the documentation for every crate on crates.io, generated from its doc comments. `cargo doc --open` builds the same docs for your project and all its dependencies, offline.
```

```compare javascript
npm install lodash  // package.json + package-lock.json
```

```compare python
pip install requests  # or: uv add requests
```

```compare java
// Maven/Gradle: add the dependency to pom.xml or build.gradle
```

```compare kotlin
implementation("io.ktor:ktor-client-core:3.0.0") // build.gradle.kts
```

```compare go
go get github.com/google/uuid  // go.mod + go.sum
```

```quiz
question: Which file pins the exact versions of every dependency?
options:
  - "`Cargo.toml`"
  - "`Cargo.lock`"
  - "`src/main.rs`"
answer: 1
explain: "`Cargo.toml` says which versions are acceptable; `Cargo.lock` records exactly which ones
  were used."
```
