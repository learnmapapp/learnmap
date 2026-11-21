---
title: Any error at all
icon: "📦"
branch: errors
requires: [question-mark, trait-objects]
summary: "Box<dyn Error> holds whatever error comes along."
---
A function that reads a file *and* parses a number can fail in two different ways: `std::io::Error` and `ParseIntError`. Its return type can only name one error type. What do you write?

The quick answer is `Box<dyn std::error::Error>`: "some error, any kind". Every standard error type fits, and `?` converts into it automatically:

```rust title=src/main.rs
use std::error::Error;
use std::fs;

fn read_port(path: &str) -> Result<u16, Box<dyn Error>> {
    let text = fs::read_to_string(path)?;    // io::Error
    let port = text.trim().parse::<u16>()?;  // ParseIntError
    Ok(port)
}

fn main() {
    match read_port("port.txt") {
        Ok(port) => println!("listening on {port}"),
        Err(e) => println!("failed: {e}"),
    }
}
```

You can even make an error out of a plain message:

```rust
if port < 1024 {
    return Err("port must be 1024 or higher".into());
}
```

## The trade-off

The caller can print the error, but it can't easily `match` on which kind it was, because the exact type has been erased. That's fine for applications and scripts. Libraries usually define their own [error type](node:custom-errors) so callers can react to specific failures.

```compare python
def read_port(path):  # any exception can come out
    return int(open(path).read())
```

```compare java
int readPort(String path) throws Exception { }
```

```compare go
func readPort(path string) (int, error) // error is an interface too
```

```compare kotlin
fun readPort(path: String): Result<Int>  // wraps any Throwable
```

```exercise
goal: "This function can fail with two different error types. Change the return type to `Result<Config, Box<dyn Error>>`."
code: |
  fn load(path: &str) -> Result<Config, std::io::Error> {
      let text = std::fs::read_to_string(path)?;
      let size = text.trim().parse::<u32>()?;
      Ok(Config { size })
  }
checks:
  - match: 'Result<\s*Config\s*,\s*Box<\s*dyn\s+(std::error::)?Error\s*>\s*>'
    message: "Use Result<Config, Box<dyn Error>> as the return type."
solution: |
  fn load(path: &str) -> Result<Config, Box<dyn Error>> {
      let text = std::fs::read_to_string(path)?;
      let size = text.trim().parse::<u32>()?;
      Ok(Config { size })
  }
```

```quiz
question: "What do you give up by returning `Box<dyn Error>`?"
options:
  - The error message.
  - The ability for callers to easily match on the specific error type.
  - The ability to use ?.
answer: 1
explain: The concrete error type is hidden behind the box. You can still print it, but matching needs a downcast.
```
