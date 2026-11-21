---
title: Collect into anything
icon: "🧺"
branch: collections
requires: [iterator-adapters]
summary: One method that builds vectors, strings, maps and even Results.
---
`collect()` turns an iterator into a collection. Which collection? The one you ask for, either with a type annotation or the "turbofish" `::<>`:

```rust title=src/main.rs
use std::collections::HashMap;

fn main() {
    let words = ["apple", "bean", "corn"];

    let v: Vec<usize> = words.iter().map(|w| w.len()).collect();
    let joined: String = words.iter().map(|w| w.to_uppercase()).collect();
    let lengths: HashMap<&str, usize> = words.iter().map(|w| (*w, w.len())).collect();
    let v2 = words.iter().map(|w| w.len()).collect::<Vec<_>>();

    println!("{v:?} {joined} {lengths:?} {v2:?}");
}
```

The `_` in `Vec<_>` means "you figure out the element type". You only need to say which *kind* of collection.

## Collecting Results

Here's the clever part. If you have an iterator of `Result`s, you can collect into a `Result<Vec<_>, _>`. You get `Ok` with all the values, or the **first** error:

```rust
let inputs = ["1", "2", "three"];
let numbers: Result<Vec<i32>, _> = inputs.iter().map(|s| s.parse::<i32>()).collect();
println!("{numbers:?}"); // Err(ParseIntError { kind: InvalidDigit })
```

That replaces a whole loop with early returns. It works for `Option` too: one `None` and the result is `None`.

```compare python
lengths = {w: len(w) for w in words}
```

```compare javascript
const lengths = Object.fromEntries(words.map(w => [w, w.length]));
```

```compare java
words.stream().collect(Collectors.toMap(w -> w, String::length));
```

```compare kotlin
words.associateWith { it.length }
```

```exercise
goal: "Parse every line into a number, collecting into `Result<Vec<u32>, _>` so one bad line gives an error."
code: |
  let parsed = lines.iter().map(|l| l.parse::<u32>());
checks:
  - match: 'let\s+parsed\s*:\s*Result<\s*Vec<\s*u32\s*>\s*,\s*_\s*>'
    message: "Annotate it as let parsed: Result<Vec<u32>, _>"
  - match: '\.collect\(\)\s*;'
    message: Finish the chain with .collect().
solution: |
  let parsed: Result<Vec<u32>, _> = lines.iter().map(|l| l.parse::<u32>()).collect();
```

```quiz
question: "You collect `[Ok(1), Err(\"x\"), Ok(3)]` into `Result<Vec<i32>, &str>`. What do you get?"
options:
  - "`Ok(vec![1, 3])`"
  - "`Err(\"x\")`"
  - "`vec![Ok(1), Err(\"x\"), Ok(3)]`"
answer: 1
explain: Collecting into a Result stops at the first Err and returns it.
```
