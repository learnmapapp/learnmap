---
title: thiserror
icon: "🏷️"
branch: errors
requires: [custom-errors, crates]
summary: Derive Display and From for your error types.
---
Writing an error enum by hand means a `Display` impl with a `match`, plus a `From` impl for every wrapped error. The [[crate]] `thiserror` generates all of it from attributes:

```repl shell
> cargo add thiserror
    Adding thiserror v2 to dependencies
```

```rust title=src/config.rs
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ConfigError {
    #[error("missing key {0}")]
    Missing(String),

    #[error("{key} can't be {value}")]
    Invalid { key: String, value: String },

    #[error("could not read config")]
    Io(#[from] std::io::Error),
}

pub fn load(path: &str) -> Result<String, ConfigError> {
    let text = std::fs::read_to_string(path)?; // io::Error becomes ConfigError::Io
    if text.is_empty() {
        return Err(ConfigError::Missing("name".into()));
    }
    Ok(text)
}
```

- `#[derive(Error)]` implements `std::error::Error`.
- `#[error("...")]` is the `Display` message. `{0}` is the first field; `{key}` is a named field.
- `#[from]` writes the `From` impl, so `?` converts automatically.

It's the same error type you'd write by hand, just without the boilerplate. Callers still get a normal enum they can `match` on.

```tip
A common split: `thiserror` in libraries, where callers want specific errors, and [anyhow](node:anyhow) in applications, where you mostly report them.
```

```compare java
class MissingKey extends Exception { MissingKey(String k) { super("missing key " + k); } }
```

```compare python
class MissingKey(Exception):
    def __str__(self): return f"missing key {self.args[0]}"
```

```compare kotlin
class MissingKey(key: String) : Exception("missing key $key")
```

```exercise
goal: "Give the `NotFound` variant the message `user {0} not found` with an `#[error]` attribute."
code: |
  #[derive(Debug, Error)]
  pub enum UserError {
      NotFound(u32),
  }
checks:
  - match: '#\[error\("user \{0\} not found"\)\]\s*NotFound\(\s*u32\s*\)'
    message: "Add #[error(\"user {0} not found\")] on the line above NotFound(u32)."
solution: |
  #[derive(Debug, Error)]
  pub enum UserError {
      #[error("user {0} not found")]
      NotFound(u32),
  }
```

```quiz
question: "What does `#[from]` on a variant's field generate?"
options:
  - A From impl, so ? can convert that error into your enum.
  - A Display message.
  - A test.
answer: 0
explain: With #[from], thiserror writes impl From<io::Error> for ConfigError, which ? uses.
```
