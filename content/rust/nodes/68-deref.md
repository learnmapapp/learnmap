---
title: Deref and smart pointers
icon: "👉"
branch: memory
requires: [box, traits]
summary: Why a Box, String or Rc can be used like the value inside it.
---
You can call `len()` on a `String` and also pass a `&String` where a `&str` is expected. You can call methods on a `Box<T>` as if it were a `T`. The trait behind that is `Deref`.

A **smart pointer** is a type that owns some data and acts like a reference to it: `Box`, `Rc`, `String` (which points to text) and `Vec` (which points to elements). They implement `Deref`, so `*` and method calls reach through them:

```rust title=src/main.rs
use std::ops::Deref;

struct Wrapper(Vec<i32>);

impl Deref for Wrapper {
    type Target = Vec<i32>;

    fn deref(&self) -> &Vec<i32> {
        &self.0
    }
}

fn main() {
    let w = Wrapper(vec![1, 2, 3]);
    println!("{}", w.len()); // 3, a Vec method
    println!("{}", w[0]);    // 1
}
```

## Deref coercion

When you pass a reference to a function, Rust follows `Deref` as many times as needed to make the types match. That's **deref coercion**:

```rust
fn shout(text: &str) { println!("{}!", text.to_uppercase()); }

let owned = String::from("hi");
let boxed = Box::new(String::from("hey"));
shout(&owned); // &String becomes &str
shout(&boxed); // &Box<String> becomes &String becomes &str
```

This is why functions usually take `&str` rather than `&String`: they then accept both.

```warn
Don't implement `Deref` just to "inherit" methods from another type. It's meant for pointer-like wrappers, and using it for anything else makes code surprising.
```

```compare java
// No equivalent: Java objects are always accessed through references
```

```compare python
# Python looks attributes up dynamically, so wrappers often use __getattr__
```

```compare kotlin
class Wrapper(list: List<Int>) : List<Int> by list // delegation
```

```exercise
goal: "Make this function more flexible: take `&str` instead of `&String`."
code: |
  fn count_vowels(text: &String) -> usize {
      text.chars().filter(|c| "aeiou".contains(*c)).count()
  }
checks:
  - match: 'text\s*:\s*&str'
    message: "Change the parameter to text: &str."
  - notMatch: '&String'
    message: Remove &String completely.
solution: |
  fn count_vowels(text: &str) -> usize {
      text.chars().filter(|c| "aeiou".contains(*c)).count()
  }
```

```quiz
question: "Why can you pass `&my_string` to a function that takes `&str`?"
options:
  - String implements Deref with Target = str.
  - Rust converts every type to str automatically.
  - Because String and str are the same type.
answer: 0
explain: Deref coercion follows String's Deref impl to turn &String into &str.
```
