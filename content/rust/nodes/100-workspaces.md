---
title: Workspaces
icon: "🏘️"
branch: tooling
requires: [crates, modules]
summary: Several crates in one repository, built together.
---
As a project grows, you'll want to split it into crates: a library with the core logic, a command-line app, maybe a web server, all sharing that library. A **workspace** keeps them in one repository with one `Cargo.lock` and one `target/` folder.

```text
recipes/
├── Cargo.toml          # the workspace
├── core/               # library crate
│   ├── Cargo.toml
│   └── src/lib.rs
└── cli/                # binary crate
    ├── Cargo.toml
    └── src/main.rs
```

The top-level `Cargo.toml` lists the members:

```toml title=Cargo.toml
[workspace]
resolver = "3"
members = ["core", "cli"]

[workspace.dependencies]
serde = { version = "1", features = ["derive"] }
```

A member uses another member through a path dependency, and a shared dependency with `workspace = true`:

```toml title=cli/Cargo.toml
[package]
name = "recipes-cli"
version = "0.1.0"
edition = "2024"

[dependencies]
recipes-core = { path = "../core" }
serde = { workspace = true }
```

Commands work across the whole workspace, or on one member with `-p`:

```repl shell
> cargo build
> cargo test
> cargo run -p recipes-cli
```

Every crate in the workspace uses the same version of each dependency, so you never end up with two copies of `serde` that don't fit together.

```compare javascript
// package.json: { "workspaces": ["core", "cli"] }
```

```compare java
// Maven: <modules><module>core</module></modules>
```

```compare kotlin
// settings.gradle.kts: include("core", "cli")
```

```compare go
// go.work: use ./core ./cli
```

```exercise
goal: "Add the `server` crate to the workspace members."
lang: toml
code: |
  [workspace]
  resolver = "3"
  members = ["core", "cli"]
checks:
  - match: 'members\s*=\s*\[\s*"core"\s*,\s*"cli"\s*,\s*"server"\s*\]'
    message: "Write members = [\"core\", \"cli\", \"server\"]"
solution: |
  [workspace]
  resolver = "3"
  members = ["core", "cli", "server"]
```

```quiz
question: What do all crates in a workspace share?
options:
  - One Cargo.lock and one target folder.
  - One src/main.rs.
  - Nothing; it's just a folder.
answer: 0
explain: A shared lock file and build folder keep dependency versions consistent and avoid rebuilding the same things.
```
