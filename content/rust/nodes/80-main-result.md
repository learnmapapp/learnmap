---
title: Errors from main
icon: "🏁"
branch: errors
requires: [box-dyn-error]
summary: Let main return a Result, so ? works everywhere.
---
`?` only works inside a function that returns a `Result` (or `Option`). Until now, `main` returned nothing, so you couldn't use `?` there.

But `main` is allowed to return a `Result`:

```rust title=src/main.rs
use std::error::Error;
use std::fs;

fn main() -> Result<(), Box<dyn Error>> {
    let text = fs::read_to_string("names.txt")?;
    for name in text.lines() {
        println!("Hello, {name}!");
    }
    Ok(())
}
```

`Ok(())` at the end means "finished fine". The `()` is the "unit" value: nothing to return.

If something fails, Rust prints the error and exits with a non-zero exit code, which scripts and CI tools treat as failure:

```repl shell
> cargo run
Error: Os { code: 2, kind: NotFound, message: "No such file or directory" }
> echo $?
1
```

The message is printed with `{:?}` (debug format), which is a bit raw. For a friendlier message, handle the error yourself in `main` and call a `run()` function that does the work:

```rust
fn main() {
    if let Err(e) = run() {
        eprintln!("error: {e}");
        std::process::exit(1);
    }
}
```

`eprintln!` prints to standard error instead of standard output, so error messages don't get mixed into the program's real output.

```compare python
if __name__ == "__main__":
    main()  # an uncaught exception exits with code 1
```

```compare go
if err := run(); err != nil { log.Fatal(err) }
```

```compare java
public static void main(String[] args) throws Exception { }
```

```compare kotlin
fun main() { runCatching { run() }.onFailure { exitProcess(1) } }
```

```exercise
goal: "Let `main` return `Result<(), Box<dyn Error>>`, so the `?` compiles. Don't forget the final `Ok(())`."
code: |
  fn main() {
      let config = std::fs::read_to_string("app.toml")?;
      println!("{config}");
  }
checks:
  - match: 'fn\s+main\s*\(\s*\)\s*->\s*Result<\s*\(\)\s*,\s*Box<\s*dyn\s+(std::error::)?Error\s*>\s*>'
    message: "Change the signature to fn main() -> Result<(), Box<dyn Error>>"
  - match: 'Ok\(\s*\(\)\s*\)\s*\}\s*$'
    message: End main with Ok(()).
solution: |
  fn main() -> Result<(), Box<dyn Error>> {
      let config = std::fs::read_to_string("app.toml")?;
      println!("{config}");
      Ok(())
  }
```

```quiz
question: "What happens when `main` returns an `Err`?"
options:
  - The error is ignored.
  - Rust prints it and exits with a non-zero exit code.
  - The program restarts.
answer: 1
explain: A failed main reports the error and signals failure through the exit code.
```
