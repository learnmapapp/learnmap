---
title: Sorted maps
icon: "🌳"
branch: collections
requires: [hashmaps]
summary: BTreeMap keeps its keys in order.
---
A `HashMap` gives you its entries in a random-looking order, and that order can change between runs. When you want keys **sorted**, use `BTreeMap`. It has almost the same methods:

```rust title=src/main.rs
use std::collections::BTreeMap;

fn main() {
    let mut scores = BTreeMap::new();
    scores.insert("Carol", 72);
    scores.insert("Alice", 90);
    scores.insert("Bob", 85);

    for (name, score) in &scores {
        println!("{name}: {score}");
    }
    // Alice: 90
    // Bob: 85
    // Carol: 72
}
```

Because the keys are ordered, you also get things a hash map can't do:

```rust
let first = scores.first_key_value();      // Some(("Alice", 90))
let last = scores.last_key_value();        // Some(("Carol", 72))
for (name, _) in scores.range("B".."C") {  // only names starting with B
    println!("{name}");
}
```

Which one to pick?

- `HashMap`: the default. Slightly faster lookups. Keys need `Hash` and `Eq`.
- `BTreeMap`: when you need sorted output, ranges, or the smallest/largest key. Keys need `Ord`.

There's a matching `BTreeSet` for sorted sets.

```compare java
TreeMap<String, Integer> scores = new TreeMap<>();
```

```compare python
for name in sorted(scores): ...   # dicts keep insertion order, not sorted order
```

```compare kotlin
val scores = sortedMapOf("Carol" to 72, "Alice" to 90)
```

```compare go
// Go maps are unordered; sort the keys with slices.Sorted(maps.Keys(m))
```

```exercise
goal: "The word counts must print in alphabetical order. Switch to a `BTreeMap`."
code: |
  let mut counts = HashMap::new();
  for word in text.split_whitespace() {
      *counts.entry(word).or_insert(0) += 1;
  }
checks:
  - match: 'BTreeMap::new\(\)'
    message: Create counts with BTreeMap::new().
  - notMatch: 'HashMap'
    message: Replace HashMap completely.
solution: |
  let mut counts = BTreeMap::new();
  for word in text.split_whitespace() {
      *counts.entry(word).or_insert(0) += 1;
  }
```

```quiz
question: When is BTreeMap a better choice than HashMap?
options:
  - When you need to iterate over keys in sorted order.
  - When keys can't be compared.
  - Always; it's strictly faster.
answer: 0
explain: BTreeMap keeps keys sorted. HashMap is usually a bit faster but has no order.
```
