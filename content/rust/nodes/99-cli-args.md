---
title: Command-line tools
icon: "⌨️"
branch: tooling
requires: [crates, derive, main-result]
summary: Read arguments with std::env, or let clap do it properly.
---
Rust is great for command-line tools: one fast binary, no runtime to install. The arguments come from `std::env::args()`:

```rust title=src/main.rs
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    // args[0] is the program itself
    match args.get(1) {
        Some(name) => println!("Hello, {name}!"),
        None => eprintln!("usage: greet <name>"),
    }
}
```

```repl shell
> cargo run -- Ferris
Hello, Ferris!
```

The `--` tells Cargo "everything after this is for my program, not for you".

## Doing it properly with clap

Once you want flags, defaults and `--help`, use the `clap` crate. You describe the arguments as a struct and derive the parser:

```repl shell
> cargo add clap --features derive
```

```rust
use clap::Parser;

/// Greets people politely.
#[derive(Parser)]
struct Args {
    /// Who to greet
    name: String,

    /// How many times
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();
    for _ in 0..args.count {
        println!("Hello, {}!", args.name);
    }
}
```

```repl shell
> cargo run -- Ferris --count 2
Hello, Ferris!
Hello, Ferris!
> cargo run -- --help
Greets people politely.

Usage: greet [OPTIONS] <NAME>
```

The doc comments become the help text, and wrong input gets a clear error message for free.

```compare python
parser = argparse.ArgumentParser()
parser.add_argument("name")
```

```compare go
name := flag.String("name", "", "who to greet")
flag.Parse()
```

```compare javascript
const [, , name] = process.argv;
```

```compare java
public static void main(String[] args) { String name = args[0]; }
```

```exercise
goal: "Add a `--loud` flag to `Args`: a `bool` field with `#[arg(short, long)]`."
code: |
  #[derive(Parser)]
  struct Args {
      name: String,
  }
checks:
  - match: '#\[arg\(\s*short\s*,\s*long\s*\)\]\s*loud\s*:\s*bool'
    message: "Add #[arg(short, long)] above a field loud: bool,"
solution: |
  #[derive(Parser)]
  struct Args {
      name: String,

      #[arg(short, long)]
      loud: bool,
  }
```

```quiz
question: "In `cargo run -- --help`, what is the first `--` for?"
options:
  - It separates Cargo's own options from your program's arguments.
  - It enables debug mode.
  - It's a typo; one dash is enough.
answer: 0
explain: Everything after -- is passed to your program instead of being read by Cargo.
```
