---
title: Characters and bytes
icon: "🔤"
branch: collections
requires: [strings]
summary: Why you can't write text[0], and what to do instead.
---
In many languages, `text[0]` gives the first letter. In Rust it's a compile error:

```repl shell
> cargo build
error[E0277]: the type `str` cannot be indexed by `{integer}`
```

The reason: Rust strings are UTF-8. An English letter takes one byte, but `é` takes two and `🦀` takes four. "The character at position 0" and "the byte at position 0" aren't the same thing, and Rust won't guess which one you mean.

So you say it explicitly:

```rust title=src/main.rs
fn main() {
    let word = "café";

    println!("{}", word.len());           // 5 bytes
    println!("{}", word.chars().count()); // 4 characters

    let first = word.chars().next();      // Some('c')
    let last = word.chars().last();       // Some('é')
    println!("{first:?} {last:?}");

    for c in word.chars() {
        print!("[{c}]"); // [c][a][f][é]
    }
}
```

- `.chars()` walks over characters (`char`, written in single quotes like `'é'`).
- `.bytes()` walks over raw bytes (`u8`).
- `.len()` is always the number of **bytes**.

`char` has helpful methods: `c.is_alphabetic()`, `c.is_ascii_digit()`, `c.to_ascii_uppercase()`.

```warn
Slicing like `&word[0..4]` works with byte positions. If a position lands in the middle of a character, the program panics.
```

```compare python
word[0]       # 'c': Python indexes by character
len("café")   # 4
```

```compare javascript
"café".length  // 4, but "🦀".length is 2 (UTF-16 units)
```

```compare go
len("café")              // 5 bytes, like Rust
utf8.RuneCountInString("café") // 4
```

```compare java
"café".charAt(0)
```

```exercise
goal: "Count the characters, not the bytes."
code: |
  fn letters(name: &str) -> usize {
      name.len()
  }
checks:
  - match: 'name\.chars\(\)\.count\(\)'
    message: Use name.chars().count().
solution: |
  fn letters(name: &str) -> usize {
      name.chars().count()
  }
```

```quiz
question: "What does `\"héllo\".len()` return?"
options:
  - "5"
  - "6"
  - A compile error.
answer: 1
explain: len() counts bytes, and é takes two bytes in UTF-8.
```
