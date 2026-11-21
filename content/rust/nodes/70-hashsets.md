---
title: Hash sets
icon: "🎒"
branch: collections
requires: [hashmaps]
summary: A collection of unique values, with fast "is it in there?" checks.
---
A `HashSet<T>` holds values with **no duplicates** and no particular order. Think of it as a `HashMap` with keys and no values.

```rust title=src/main.rs
use std::collections::HashSet;

fn main() {
    let mut visited = HashSet::new();

    visited.insert("Paris");
    visited.insert("Tokyo");
    let new_city = visited.insert("Paris"); // already there

    println!("{new_city}");                  // false
    println!("{}", visited.len());           // 2
    println!("{}", visited.contains("Tokyo")); // true
}
```

`insert` returns `true` if the value was new, which makes "have I seen this before?" a one-liner.

A quick way to remove duplicates from a vector:

```rust
let tags = vec!["rust", "web", "rust", "cli"];
let unique: HashSet<_> = tags.into_iter().collect();
```

Sets also do maths-style operations:

```rust
let a: HashSet<i32> = [1, 2, 3].into();
let b: HashSet<i32> = [2, 3, 4].into();

let both: HashSet<_> = a.intersection(&b).collect();  // {2, 3}
let either: HashSet<_> = a.union(&b).collect();       // {1, 2, 3, 4}
let only_a: HashSet<_> = a.difference(&b).collect();  // {1}
```

```compare python
visited = {"Paris", "Tokyo"}
"Tokyo" in visited
```

```compare javascript
const visited = new Set(["Paris", "Tokyo"]);
visited.has("Tokyo");
```

```compare java
Set<String> visited = new HashSet<>();
```

```compare go
visited := map[string]bool{} // Go uses a map as a set
```

```exercise
goal: "Use a `HashSet` called `seen` to print only the first time each word appears. `insert` returns `true` for new values."
code: |
  let mut seen = Vec::new();
  for word in words {
      println!("{word}");
  }
checks:
  - match: 'let\s+mut\s+seen\s*=\s*HashSet::new\(\)'
    message: Create seen with HashSet::new().
  - match: 'if\s+seen\.insert\(\s*word\s*\)'
    message: "Wrap the print in if seen.insert(word) { ... }"
solution: |
  let mut seen = HashSet::new();
  for word in words {
      if seen.insert(word) {
          println!("{word}");
      }
  }
```

```quiz
question: "What does `set.insert(x)` return when x is already in the set?"
options:
  - "`true`"
  - "`false`"
  - It panics.
answer: 1
explain: insert returns whether the value was newly added. A duplicate isn't added, so it returns false.
```
