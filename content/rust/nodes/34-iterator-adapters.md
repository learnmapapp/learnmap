---
title: Iterator chains
icon: "⛓️"
branch: collections
requires: [iterators]
summary: map, filter, collect and friends.
---
**Adapters** turn one iterator into another. Chain them, and finish with a consumer like `collect`:

```rust
let scores = vec![12, 45, 7, 88, 23];

let passed: Vec<i32> = scores
    .iter()
    .filter(|&&s| s >= 20)
    .map(|s| s * 2)
    .collect();
// [90, 176, 46]
```

Nothing runs until `collect` pulls values through. And it compiles to the same machine code as a hand-written loop, so there's no reason to avoid it.

The ones you'll use all the time:

| Adapter | Does |
| --- | --- |
| `map(f)` | transform each item |
| `filter(f)` | keep items where `f` is `true` |
| `enumerate()` | pair each item with its index |
| `zip(other)` | pair items from two iterators |
| `take(n)`, `skip(n)` | first n, or all but the first n |
| `rev()` | backwards |
| `flat_map(f)` | map, then flatten nested results |
| `filter_map(f)` | map to `Option`, keep the `Some`s |

And consumers:

```repl
> (1..=5).fold(0, |acc, n| acc + n)
15
> ["a", "b"].iter().any(|s| *s == "b")
true
> [3, 8, 2].iter().position(|&n| n == 8)
Some(1)
> ["1", "x", "3"].iter().filter_map(|s| s.parse::<i32>().ok()).collect::<Vec<_>>()
[1, 3]
```

`collect` can build many things: a `Vec`, a `String`, a `HashMap` from pairs. Tell it what you want with a type annotation or the "turbofish" `::<Vec<_>>`.

```compare python
passed = [s * 2 for s in scores if s >= 20]
```

```compare javascript
const passed = scores.filter((s) => s >= 20).map((s) => s * 2);
```

```compare java
var passed = scores.stream().filter(s -> s >= 20).map(s -> s * 2).toList();
```

```compare kotlin
val passed = scores.filter { it >= 20 }.map { it * 2 }
```

```compare go
// No built-in chains; write a loop (or use slices/maps helpers).
```

```exercise
goal: Collect the lengths of all names longer than 3 letters into a Vec.
code: |
  let names = vec!["Ferris", "Bo", "Corro"];
  let lengths: Vec<usize> = names.iter()
      .collect();
checks:
  - match: '\.filter\(\s*\|[^|]+\|[^)]*len\(\)\s*>\s*3'
    message: First .filter(|n| n.len() > 3)
  - match: '\.map\(\s*\|[^|]+\|[^)]*len\(\)\s*\)'
    message: Then .map(|n| n.len())
  - match: '\.filter[\s\S]*\.map[\s\S]*\.collect\(\)'
    message: Keep .collect() at the end.
output: "[6, 5]"
```
