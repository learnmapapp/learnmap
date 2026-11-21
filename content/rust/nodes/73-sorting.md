---
title: Sorting
icon: "📶"
branch: collections
requires: [vectors, closures]
summary: sort, sort_by and sort_by_key, for numbers, text and structs.
---
Vectors (and slices) sort **in place**. The simplest form works on anything that can be ordered:

```rust title=src/main.rs
fn main() {
    let mut numbers = vec![5, 2, 9, 1];
    numbers.sort();
    println!("{numbers:?}"); // [1, 2, 5, 9]

    numbers.reverse();
    println!("{numbers:?}"); // [9, 5, 2, 1]
}
```

To sort by something specific, use `sort_by_key` with a closure that picks the key:

```rust
struct Player { name: String, score: u32 }

players.sort_by_key(|p| p.score);              // lowest score first
players.sort_by_key(|p| std::cmp::Reverse(p.score)); // highest first
```

For full control, `sort_by` gets two items and returns an `Ordering` (`Less`, `Equal` or `Greater`):

```rust
players.sort_by(|a, b| b.score.cmp(&a.score).then(a.name.cmp(&b.name)));
// highest score first, ties broken by name
```

## Floats are special

`vec_of_f64.sort()` doesn't compile, because `NaN` ("not a number") can't be compared with anything. Use `total_cmp`:

```rust
let mut temps = vec![21.5, 18.0, 25.2];
temps.sort_by(|a, b| a.total_cmp(b));
```

```tip
`sort` keeps equal items in their original order (it's "stable"). `sort_unstable` doesn't, but can be a little faster.
```

```compare python
players.sort(key=lambda p: p.score, reverse=True)
```

```compare javascript
players.sort((a, b) => b.score - a.score);
```

```compare java
players.sort(Comparator.comparing(Player::score).reversed());
```

```compare kotlin
players.sortByDescending { it.score }
```

```compare go
slices.SortFunc(players, func(a, b Player) int { return b.Score - a.Score })
```

```exercise
goal: "Sort `words` by their length, shortest first, with `sort_by_key`."
code: |
  let mut words = vec!["banana", "fig", "cherry"];
  words.sort();
checks:
  - match: 'words\.sort_by_key\(\s*\|\s*(\w+)\s*\|\s*\1\.len\(\)\s*\)'
    message: "Write words.sort_by_key(|w| w.len());"
solution: |
  let mut words = vec!["banana", "fig", "cherry"];
  words.sort_by_key(|w| w.len());
```

```quiz
question: "Why doesn't `vec![1.5, 0.5].sort()` compile?"
options:
  - Floats can't be stored in a Vec.
  - Floats don't have a total order, because of NaN.
  - sort only works on strings.
answer: 1
explain: NaN isn't less than, equal to or greater than anything, so f64 doesn't implement Ord. Use total_cmp instead.
```
