---
title: panic, unwrap and expect
icon: "💥"
branch: errors
requires: [option-result]
summary: When it's fine to crash, and how to crash helpfully.
---
Rust splits errors in two:

- **Recoverable**: a file is missing, input doesn't parse. You return a `Result` and the caller decides.
- **Unrecoverable**: a bug. An index out of bounds, an "impossible" state. The program **panics**: it stops, printing a message.

```rust
panic!("the crab escaped");
```

```repl shell
> cargo run
thread 'main' panicked at src/main.rs:2:5:
the crab escaped
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

`unwrap()` turns an `Option` or `Result` into its value, or panics:

```rust
let n: i32 = "42".parse().unwrap();   // fine
let m: i32 = "crab".parse().unwrap(); // panics
```

`expect()` does the same with your own message. Prefer it: when it fires, you'll know why:

```rust
let config = std::fs::read_to_string("config.toml")
    .expect("config.toml should exist next to the binary");
```

When is crashing OK?

- In examples, prototypes and tests.
- When you *know* it can't fail, and the message says why: `"127.0.0.1".parse::<IpAddr>().expect("hardcoded IP is valid")`.
- When continuing would be worse than stopping.

Everywhere else: return a `Result`, see [the ? operator](node:question-mark).

```tip
Use `unreachable!()` for code paths that can't happen and `todo!()` for code you haven't written yet. Both panic, both compile anywhere.
```

```compare java
throw new IllegalStateException("the crab escaped");
```

```compare kotlin
error("the crab escaped")   // throws IllegalStateException
val n = maybe!!             // like unwrap()
```

```compare python
raise RuntimeError("the crab escaped")
```

```compare javascript
throw new Error("the crab escaped");
```

```compare go
panic("the crab escaped")
```

```exercise
goal: Replace unwrap with expect and a helpful message.
code: |
  let port: u16 = std::env::var("PORT").unwrap().parse().unwrap();
checks:
  - notMatch: 'unwrap\(\)'
    message: Replace both unwrap() calls.
  - match: 'expect\(\s*"[^"]+"\s*\)[\s\S]*expect\(\s*"[^"]+"\s*\)'
    message: Give each expect a message string.
output: port == 8080
```
