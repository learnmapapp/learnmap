---
title: The ? operator
icon: "❓"
branch: errors
requires: [option-result]
summary: Pass errors up without the boilerplate.
---
Most functions that can fail don't want to *handle* an error, just pass it to whoever called them. `?` does exactly that:

```rust
use std::fs;
use std::io;

fn read_name() -> Result<String, io::Error> {
    let text = fs::read_to_string("name.txt")?;
    Ok(text.trim().to_string())
}
```

`expr?` means:

- if `expr` is `Ok(v)`, the whole thing is `v`, carry on;
- if it's `Err(e)`, return `Err(e)` from this function right now.

It chains nicely:

```rust
let n: i32 = fs::read_to_string("count.txt")?.trim().parse()?;
```

Wait, that mixes two error types: `io::Error` and `ParseIntError`. The trick: `?` converts the error with `From` on its way out. A common shortcut is a boxed error that accepts any error type:

```rust
fn count() -> Result<i32, Box<dyn std::error::Error>> {
    let n = fs::read_to_string("count.txt")?.trim().parse()?;
    Ok(n)
}
```

`?` also works on `Option` inside a function returning `Option`: `None` returns early.

```rust
fn first_initial(name: &str) -> Option<char> {
    let first = name.split_whitespace().next()?;
    first.chars().next()
}
```

And `main` can return a `Result`, so `?` works there too:

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let n = count()?;
    println!("{n}");
    Ok(())
}
```

```compare java
// Checked exceptions: declare `throws IOException` and let it bubble
// up.
String read() throws IOException { return Files.readString(path); }
```

```compare kotlin
// Exceptions bubble up implicitly; the signature doesn't tell you.
```

```compare go
text, err := os.ReadFile("name.txt")
if err != nil { return "", err } // ? is this, in one character
```

```compare python
# Exceptions bubble up implicitly.
```

```compare javascript
// Exceptions bubble up implicitly; await rejects the same way.
```

```exercise
goal: Replace the match with the ? operator.
code: |
  fn load() -> Result<String, io::Error> {
      let text = match fs::read_to_string("crab.txt") {
          Ok(t) => t,
          Err(e) => return Err(e),
      };
      Ok(text)
  }
checks:
  - match: 'fs::read_to_string\(\s*"crab\.txt"\s*\)\?'
    message: Put ? right after the read_to_string(...) call.
  - notMatch: 'match'
    message: The match isn't needed anymore.
output: Ok("Ferris")
```
