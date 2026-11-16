---
title: Your own error types
icon: "🚨"
branch: errors
requires: [question-mark, traits]
summary: An error enum, Display, and From for clean ? conversions.
---
Libraries usually define one error type that lists everything that can go wrong. An enum is perfect for that:

```rust
#[derive(Debug)]
enum ConfigError {
    Missing(String),
    Invalid { key: String, value: String },
    Io(std::io::Error),
}
```

To be a proper error it implements `Display` (the message for humans) and `std::error::Error`:

```rust
use std::fmt;

impl fmt::Display for ConfigError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ConfigError::Missing(k) => write!(f, "missing key {k}"),
            ConfigError::Invalid { key, value } => {
                write!(f, "{key} can't be {value}")
            }
            ConfigError::Io(e) => {
                write!(f, "could not read config: {e}")
            }
        }
    }
}

impl std::error::Error for ConfigError {}
```

Now the nice part. Implement `From`, and `?` converts automatically:

```rust
impl From<std::io::Error> for ConfigError {
    fn from(e: std::io::Error) -> Self {
        ConfigError::Io(e)
    }
}

fn load() -> Result<String, ConfigError> {
    // ? turns the io::Error into a ConfigError
    let text = std::fs::read_to_string("app.toml")?;
    Ok(text)
}
```

Callers can now `match` on exactly what went wrong.

```tip
Writing this by hand gets repetitive. Most projects use the `thiserror` crate for libraries (it derives `Display` and `From`) and `anyhow` for applications (one error type that holds anything, plus context messages).
```

```compare java
class ConfigException extends Exception {
    ConfigException(String msg, Throwable cause) { super(msg, cause); }
}
```

```compare kotlin
sealed class ConfigError : Exception() {
    data class Missing(val key: String) : ConfigError()
}
```

```compare python
class ConfigError(Exception): pass
class MissingKey(ConfigError): pass
```

```compare javascript
class ConfigError extends Error {}
```

```compare go
var ErrMissing = errors.New("missing key")
return fmt.Errorf("load config: %w", err)
```

```exercise
goal: Implement `From<ParseIntError>` for AppError, wrapping it in the Parse variant.
code: |
  enum AppError {
      Parse(ParseIntError),
  }
checks:
  - match: impl\s+From<\s*ParseIntError\s*>\s+for\s+AppError
    message: Start with  impl From<ParseIntError> for AppError {
  - match: fn\s+from\s*\(\s*\w+\s*:\s*ParseIntError\s*\)\s*->\s*(Self|AppError)
    message: "Add  fn from(e: ParseIntError) -> Self"
  - match: AppError::Parse\(\s*\w+\s*\)|Self::Parse\(\s*\w+\s*\)
    message: Return AppError::Parse(e).
output: '"x".parse::<i32>()? now becomes AppError::Parse'
```
