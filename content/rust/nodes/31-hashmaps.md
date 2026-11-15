---
title: HashMap
icon: "🗺️"
branch: collections
requires: [vectors, option-result]
summary: Key-value lookups, and the entry API.
---
`HashMap<K, V>` maps keys to values. It's not imported by default:

```rust
use std::collections::HashMap;

let mut legs = HashMap::new();
legs.insert("crab", 10);
legs.insert("spider", 8);
```

Looking up returns an `Option`, because the key might not be there:

```rust
match legs.get("crab") {
    Some(n) => println!("{n} legs"),
    None => println!("no idea"),
}

let ants = legs.get("ant").copied().unwrap_or(6);
```

Looping gives you key-value pairs, in no particular order:

```rust
for (animal, n) in &legs {
    println!("{animal}: {n}");
}
```

The **entry API** is the idiomatic way to "insert if missing, otherwise update". Counting words is the classic:

```rust
let mut counts = HashMap::new();
for word in "the crab saw the crab".split_whitespace() {
    *counts.entry(word).or_insert(0) += 1;
}
// {"the": 2, "crab": 2, "saw": 1}
```

`entry` finds the slot, `or_insert(0)` fills it if empty and returns a `&mut` to the value, and `*... += 1` bumps it.

```tip
Need a set? `HashSet<T>` is a HashMap with only keys. Need sorted keys? Use `BTreeMap`.
```

```compare python
counts = {}
counts[word] = counts.get(word, 0) + 1
```

```compare javascript
const counts = new Map();
counts.set(word, (counts.get(word) ?? 0) + 1);
```

```compare java
Map<String, Integer> counts = new HashMap<>();
counts.merge(word, 1, Integer::sum);
```

```compare kotlin
val counts = mutableMapOf<String, Int>()
counts[word] = (counts[word] ?: 0) + 1
```

```compare go
counts := map[string]int{}
counts[word]++
```

```exercise
goal: Count each fruit with the entry API.
code: |
  let mut counts = HashMap::new();
  for fruit in ["apple", "pear", "apple"] {
      // count it here
  }
checks:
  - match: 'counts\.entry\(\s*fruit\s*\)'
    message: Start with counts.entry(fruit)
  - match: '\*\s*counts\.entry\(\s*fruit\s*\)\.or_insert\(\s*0\s*\)\s*\+=\s*1'
    message: "Then: *counts.entry(fruit).or_insert(0) += 1;"
output: '{"apple": 2, "pear": 1}'
```
