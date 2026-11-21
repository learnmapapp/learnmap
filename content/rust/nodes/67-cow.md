---
title: Clone on write
icon: "🐄"
branch: memory
requires: [strings, clone-copy]
summary: Cow lets a function borrow when it can and allocate only when it must.
---
Imagine a function that cleans up user names. Most names are already fine, and only a few need changing. Returning a new `String` every time wastes allocations. Returning `&str` can't work for the changed ones.

`Cow` (clone on write) can be either: a **borrowed** value or an **owned** one.

```rust title=src/main.rs
use std::borrow::Cow;

fn no_spaces(input: &str) -> Cow<str> {
    if input.contains(' ') {
        Cow::Owned(input.replace(' ', "_"))
    } else {
        Cow::Borrowed(input)
    }
}

fn main() {
    let a = no_spaces("ferris");      // borrowed, no allocation
    let b = no_spaces("ferris crab"); // owned, a new String
    println!("{a} {b}");               // ferris ferris_crab
}
```

A `Cow<str>` acts like a `&str` wherever you use it, so callers barely notice. If they do need an owned `String`, `.into_owned()` gives one, cloning only if it was borrowed.

You won't write `Cow` every day, but you'll meet it in library APIs. `String::from_utf8_lossy`, for example, returns a `Cow<str>`: borrowed when the bytes were valid, owned when it had to replace bad ones.

```tip
Don't reach for `Cow` first. Start with `String` or `&str`, and switch when profiling shows the allocations matter.
```

```compare python
# Python strings are immutable and shared; there's no equivalent
```

```compare java
// Java strings are immutable; replace() returns the same object when nothing changed
```

```compare go
// strings.ReplaceAll returns a new string; no borrowed/owned split
```

```exercise
goal: "Return `Cow::Borrowed(name)` when there's nothing to change."
code: |
  fn tidy(name: &str) -> Cow<str> {
      if name.ends_with(' ') {
          Cow::Owned(name.trim_end().to_string())
      } else {
          Cow::Owned(name.to_string())
      }
  }
checks:
  - match: 'else\s*\{\s*Cow::Borrowed\(\s*name\s*\)\s*\}'
    message: In the else branch, return Cow::Borrowed(name) instead of making a String.
solution: |
  fn tidy(name: &str) -> Cow<str> {
      if name.ends_with(' ') {
          Cow::Owned(name.trim_end().to_string())
      } else {
          Cow::Borrowed(name)
      }
  }
```

```quiz
question: What does Cow save you?
options:
  - Allocations, when most values don't need changing.
  - Type annotations.
  - Lifetime errors in every function.
answer: 0
explain: Cow only allocates in the cases that really need a new owned value.
```
