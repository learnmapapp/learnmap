---
title: Associated types
icon: "🔗"
branch: traits
requires: [iterator-trait]
summary: A type inside a trait, chosen by each implementation.
---
You've already met one: `type Item` in the `Iterator` trait, and `type Output` in `Add`. An **associated type** is a placeholder type in a trait that each implementation fills in.

```rust title=src/main.rs
trait Container {
    type Item;

    fn get(&self, i: usize) -> Option<&Self::Item>;
    fn first(&self) -> Option<&Self::Item> {
        self.get(0)
    }
}

struct Shelf {
    books: Vec<String>,
}

impl Container for Shelf {
    type Item = String;

    fn get(&self, i: usize) -> Option<&String> {
        self.books.get(i)
    }
}

fn main() {
    let shelf = Shelf { books: vec!["Dune".into(), "Emma".into()] };
    println!("{:?}", shelf.first()); // Some("Dune")
}
```

## Why not a generic parameter?

You could write `trait Container<T>` instead. The difference:

- With a **generic** `Container<T>`, one type could implement it many times: `Container<String>`, `Container<i32>`…
- With an **associated type**, each type implements it **once**, with one fixed `Item`.

For `Iterator` that's exactly right: a given iterator produces one kind of item. And it saves typing: you write `impl Iterator<Item = u32>` instead of carrying an extra type parameter everywhere.

Refer to it as `Self::Item` inside the trait, or `T::Item` for a generic `T: Container`.

```compare typescript
interface Container<Item> { get(i: number): Item | undefined }
```

```compare kotlin
interface Container<out Item> { fun get(i: Int): Item? }
```

```compare java
interface Container<Item> { Item get(int i); }
```

```exercise
goal: "Implement `Container` for `Scores`, whose items are `u32`."
code: |
  struct Scores(Vec<u32>);

  impl Container for Scores {
      fn get(&self, i: usize) -> Option<&Self::Item> {
          self.0.get(i)
      }
  }
checks:
  - match: 'type\s+Item\s*=\s*u32\s*;'
    message: "Add type Item = u32; inside the impl."
solution: |
  struct Scores(Vec<u32>);

  impl Container for Scores {
      type Item = u32;

      fn get(&self, i: usize) -> Option<&Self::Item> {
          self.0.get(i)
      }
  }
```

```quiz
question: How many times can one type implement a trait with an associated type?
options:
  - Once, with one choice of the associated type.
  - Once per possible associated type.
  - As many times as you like.
answer: 0
explain: The associated type is fixed by the single implementation. Generic parameters are what allow multiple impls.
```
