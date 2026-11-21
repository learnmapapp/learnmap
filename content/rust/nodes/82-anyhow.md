---
title: anyhow
icon: "🤷"
branch: errors
requires: [main-result, crates]
summary: Easy errors with context for applications.
---
In an application, you rarely need to match on error types. You need a clear message saying **what** failed and **why**. The `anyhow` crate is built for that:

```repl shell
> cargo add anyhow
    Adding anyhow v1 to dependencies
```

```rust title=src/main.rs
use anyhow::{bail, Context, Result};

fn read_port(path: &str) -> Result<u16> {
    let text = std::fs::read_to_string(path)
        .with_context(|| format!("could not read {path}"))?;
    let port: u16 = text.trim().parse().context("port is not a number")?;
    if port < 1024 {
        bail!("port {port} is reserved");
    }
    Ok(port)
}

fn main() -> Result<()> {
    let port = read_port("port.txt")?;
    println!("listening on {port}");
    Ok(())
}
```

- `anyhow::Result<T>` is short for `Result<T, anyhow::Error>`, which holds any error, like `Box<dyn Error>`.
- `.context("...")` wraps an error with a message about what you were doing.
- `bail!("...")` returns an error right away.

When it fails, you get the whole chain of causes:

```repl shell
> cargo run
Error: could not read port.txt

Caused by:
    No such file or directory (os error 2)
```

That's far more helpful than "No such file or directory" on its own: now you know *which* file.

```compare python
raise RuntimeError(f"could not read {path}") from e
```

```compare go
return fmt.Errorf("could not read %s: %w", path, err)
```

```compare java
throw new RuntimeException("could not read " + path, e);
```

```compare kotlin
throw IllegalStateException("could not read $path", e)
```

```exercise
goal: "Add context to the error: `.context(\"could not open the database\")` before the `?`."
code: |
  fn connect(url: &str) -> anyhow::Result<Db> {
      let db = Db::open(url)?;
      Ok(db)
  }
checks:
  - match: 'Db::open\(\s*url\s*\)\s*\.context\(\s*"could not open the database"\s*\)\s*\?'
    message: "Write Db::open(url).context(\"could not open the database\")?"
solution: |
  fn connect(url: &str) -> anyhow::Result<Db> {
      let db = Db::open(url).context("could not open the database")?;
      Ok(db)
  }
```

```quiz
question: What is anyhow best suited for?
options:
  - Libraries whose callers match on each error variant.
  - Applications that mainly report errors to a person.
  - Replacing panics.
answer: 1
explain: anyhow makes errors easy to create and enrich with context, at the cost of a specific error type.
```
