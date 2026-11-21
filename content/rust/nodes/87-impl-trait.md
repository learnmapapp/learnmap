---
title: Returning impl Trait
icon: "🎁"
branch: traits
requires: [trait-bounds, closures]
summary: "Return \"something that implements a trait\" without naming it."
---
Some types are hard or impossible to write down. A closure has a type with no name, and an iterator chain's type can be a mouthful like `Filter<Map<std::slice::Iter<'_, i32>, ...>, ...>`.

`impl Trait` in the **return position** says: "this returns some type that implements this trait. Trust me, the compiler knows which."

```rust title=src/main.rs
fn evens(limit: u32) -> impl Iterator<Item = u32> {
    (0..limit).filter(|n| n % 2 == 0)
}

fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

fn main() {
    let v: Vec<u32> = evens(10).collect();
    println!("{v:?}");        // [0, 2, 4, 6, 8]

    let add5 = make_adder(5);
    println!("{}", add5(10)); // 15
}
```

The caller can only use what the trait offers: `evens(10)` is "an iterator of `u32`", nothing more. That lets you change how it's built later without breaking callers.

## impl Trait vs dyn Trait

- `impl Trait`: one specific hidden type, decided at compile time. No extra cost.
- `Box<dyn Trait>`: any type, decided at run time. Needed when different branches return different types:

```rust
fn shape(round: bool) -> Box<dyn Shape> {
    if round { Box::new(Circle) } else { Box::new(Square) }
}
```

With `impl Shape`, that wouldn't compile, because both branches must return the *same* type.

```compare typescript
function evens(limit: number): Iterable<number> { }
```

```compare kotlin
fun evens(limit: Int): Sequence<Int> = (0 until limit).asSequence().filter { it % 2 == 0 }
```

```compare java
Stream<Integer> evens(int limit) { }
```

```compare python
def evens(limit) -> Iterator[int]: ...
```

```exercise
goal: "Replace the boxed return type with `impl Iterator<Item = String>`, and drop the `Box::new`."
code: |
  fn shout(words: Vec<String>) -> Box<dyn Iterator<Item = String>> {
      Box::new(words.into_iter().map(|w| w.to_uppercase()))
  }
checks:
  - match: '->\s*impl\s+Iterator<\s*Item\s*=\s*String\s*>'
    message: "Use -> impl Iterator<Item = String>"
  - notMatch: 'Box'
    message: Remove both Box parts.
solution: |
  fn shout(words: Vec<String>) -> impl Iterator<Item = String> {
      words.into_iter().map(|w| w.to_uppercase())
  }
```

```quiz
question: "A function returns a `Circle` in one branch and a `Square` in another. Which return type works?"
options:
  - "`impl Shape`"
  - "`Box<dyn Shape>`"
  - Both.
answer: 1
explain: impl Trait stands for one concrete type. Different types per branch need a trait object.
```
