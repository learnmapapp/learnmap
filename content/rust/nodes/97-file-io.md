---
title: Reading and writing files
icon: "📄"
branch: tooling
requires: [question-mark, strings]
summary: std::fs for whole files, BufReader for big ones.
---
For small files, `std::fs` has one-liners. Each returns a `Result`, because files can be missing or unreadable:

```rust title=src/main.rs
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    fs::write("todo.txt", "buy milk\nwalk the dog\n")?;

    let text = fs::read_to_string("todo.txt")?;
    for (i, line) in text.lines().enumerate() {
        println!("{}. {line}", i + 1);
    }
    Ok(())
}
```

`io::Result<T>` is short for `Result<T, io::Error>`.

## Big files, line by line

`read_to_string` loads the whole file into memory. For a large log file, read it line by line with a `BufReader`:

```rust
use std::fs::File;
use std::io::{BufRead, BufReader};

let file = File::open("server.log")?;
for line in BufReader::new(file).lines() {
    let line = line?;
    if line.contains("ERROR") {
        println!("{line}");
    }
}
```

## Appending

`fs::write` replaces the file. To add to the end, open it with options:

```rust
use std::fs::OpenOptions;
use std::io::Write;

let mut log = OpenOptions::new().append(true).create(true).open("app.log")?;
writeln!(log, "started")?;
```

```tip
Use `std::path::Path` and `PathBuf` for file paths. `Path::new("data").join("users.csv")` uses the right separator on every OS.
```

```compare python
with open("todo.txt") as f:
    for line in f: print(line)
```

```compare javascript
const text = await fs.promises.readFile("todo.txt", "utf8");
```

```compare go
data, err := os.ReadFile("todo.txt")
```

```compare java
List<String> lines = Files.readAllLines(Path.of("todo.txt"));
```

```exercise
goal: "Read the whole file into a `String` with `fs::read_to_string`, and pass errors on with `?`."
code: |
  fn load_notes() -> io::Result<String> {
      let notes = String::new();
      Ok(notes)
  }
checks:
  - match: 'fs::read_to_string\(\s*"notes\.txt"\s*\)\s*\?'
    message: "Write let notes = fs::read_to_string(\"notes.txt\")?;"
solution: |
  fn load_notes() -> io::Result<String> {
      let notes = fs::read_to_string("notes.txt")?;
      Ok(notes)
  }
```

```quiz
question: When should you use BufReader instead of read_to_string?
options:
  - For large files you want to process line by line.
  - For files with Unicode text.
  - Never; read_to_string is always better.
answer: 0
explain: BufReader reads a bit at a time, so the whole file doesn't have to fit in memory.
```
