---
title: Fold and reduce
icon: "🪗"
branch: collections
requires: [iterator-adapters]
summary: Combine all items into one value, step by step.
---
`sum()` adds numbers and `max()` finds the largest, but sometimes you need your own way of combining. That's `fold`.

`fold` takes a **starting value** and a closure. The closure gets the running result so far (often called `acc`, for accumulator) and the next item, and returns the new running result:

```rust title=src/main.rs
fn main() {
    let prices = [3, 10, 7];

    let total = prices.iter().fold(0, |acc, p| acc + p);
    println!("{total}"); // 20

    let receipt = prices.iter().fold(String::new(), |acc, p| acc + &format!("${p} "));
    println!("{receipt}"); // $3 $10 $7
}
```

Step by step, the total goes: `0` → `0 + 3 = 3` → `3 + 10 = 13` → `13 + 7 = 20`.

`reduce` is the same idea without a starting value: it uses the first item. Because the iterator might be empty, it returns an `Option`:

```rust
let longest = ["fig", "banana", "kiwi"]
    .into_iter()
    .reduce(|a, b| if b.len() > a.len() { b } else { a });
println!("{longest:?}"); // Some("banana")
```

```tip
Check for a ready-made method before writing a fold: `sum`, `product`, `count`, `min`, `max`, `max_by_key`, `any` and `all` all exist.
```

```compare python
from functools import reduce
total = reduce(lambda acc, p: acc + p, prices, 0)
```

```compare javascript
const total = prices.reduce((acc, p) => acc + p, 0);
```

```compare kotlin
val total = prices.fold(0) { acc, p -> acc + p }
```

```compare java
int total = prices.stream().reduce(0, Integer::sum);
```

```exercise
goal: "Use `fold` to multiply all the numbers together, starting from 1."
code: |
  let numbers = [2, 3, 4];
  let product = numbers.iter();
checks:
  - match: '\.fold\(\s*1\s*,\s*\|\s*(\w+)\s*,\s*(\w+)\s*\|\s*\1\s*\*\s*\2\s*\)'
    message: "Write .fold(1, |acc, n| acc * n)"
output: "product = 24"
solution: |
  let numbers = [2, 3, 4];
  let product = numbers.iter().fold(1, |acc, n| acc * n);
```

```quiz
question: Why does reduce return an Option but fold doesn't?
options:
  - reduce has no starting value, so an empty iterator has nothing to return.
  - fold can't fail because it panics instead.
  - reduce runs in parallel.
answer: 0
explain: fold always has its starting value to fall back on. reduce needs at least one item.
```
