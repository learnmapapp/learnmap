---
title: The entry API
icon: "🚪"
branch: collections
requires: [hashmaps]
summary: Insert or update a map value in one lookup.
---
A common task: count things, or group them into lists. The naive version looks up the key twice:

```rust
if counts.contains_key(word) {
    *counts.get_mut(word).unwrap() += 1;
} else {
    counts.insert(word, 1);
}
```

The **entry API** does it in one step. `map.entry(key)` gives you a handle to that slot, whether it's filled or not:

```rust title=src/main.rs
use std::collections::HashMap;

fn main() {
    let text = "the cat and the hat";
    let mut counts = HashMap::new();

    for word in text.split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }
    println!("{}", counts["the"]); // 2
}
```

`or_insert(0)` puts `0` in if the key is missing, then returns a mutable reference to the value either way. The `*` reaches through that reference to add 1.

Grouping works the same way, with an empty `Vec` as the default:

```rust
let mut by_letter: HashMap<char, Vec<&str>> = HashMap::new();
for name in ["Ann", "Alex", "Bo"] {
    let first = name.chars().next().unwrap();
    by_letter.entry(first).or_default().push(name);
}
// {'A': ["Ann", "Alex"], 'B': ["Bo"]}
```

- `or_insert(value)`: insert this value if missing.
- `or_default()`: insert the type's default (`0`, `""`, empty `Vec`).
- `or_insert_with(|| ...)`: only build the default if it's actually needed.

```compare python
counts[word] = counts.get(word, 0) + 1
by_letter.setdefault(first, []).append(name)
```

```compare javascript
counts.set(word, (counts.get(word) ?? 0) + 1);
```

```compare java
counts.merge(word, 1, Integer::sum);
```

```compare kotlin
counts[word] = (counts[word] ?: 0) + 1
```

```compare go
counts[word]++ // missing keys read as 0
```

```exercise
goal: "Replace the if/else with one line that uses `entry` and `or_insert`."
code: |
  if let Some(n) = votes.get_mut(name) {
      *n += 1;
  } else {
      votes.insert(name, 1);
  }
checks:
  - match: '\*votes\.entry\(\s*name\s*\)\.or_insert\(\s*0\s*\)\s*\+=\s*1'
    message: "Write *votes.entry(name).or_insert(0) += 1;"
  - notMatch: 'else'
    message: Remove the if/else.
solution: |
  *votes.entry(name).or_insert(0) += 1;
```

```quiz
question: "What does `map.entry(k).or_default()` return?"
options:
  - A copy of the value.
  - A mutable reference to the value, inserted with its default if it was missing.
  - "`true` if the key was new."
answer: 1
explain: The entry methods give back &mut V, so you can update the value right away.
```
