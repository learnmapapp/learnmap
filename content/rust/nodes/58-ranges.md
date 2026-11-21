---
title: Ranges
icon: "📏"
branch: basics
requires: [loops]
summary: "Count with 0..10 and 1..=10, and step or reverse them."
---
A **range** is a run of numbers. You've seen it in `for` loops already:

```rust title=src/main.rs
fn main() {
    for i in 0..3 {
        println!("{i}"); // 0, 1, 2
    }
    for i in 1..=3 {
        println!("{i}"); // 1, 2, 3
    }
}
```

- `a..b` goes from `a` up to, but **not including**, `b`.
- `a..=b` **includes** `b`.

The exclusive form is the usual one, because `0..list.len()` covers every valid position exactly.

Ranges have handy methods:

```rust
for i in (1..=10).rev() { }       // 10 down to 1
for i in (0..100).step_by(25) { } // 0, 25, 50, 75
let total: i32 = (1..=100).sum(); // 5050
let inside = (1..=5).contains(&3); // true
```

They also work in `match`, which is great for grouping values:

```rust
let grade = match score {
    90..=100 => "A",
    75..=89 => "B",
    _ => "C",
};
```

```compare python
for i in range(1, 4): ...   # 1, 2, 3
```

```compare javascript
for (let i = 1; i <= 3; i++) { }
```

```compare kotlin
for (i in 1..3) { }  // Kotlin's .. includes the end
```

```compare go
for i := range 3 { } // 0, 1, 2
```

```exercise
goal: "Make the loop count down from 10 to 1, including both. Use `..=` and `.rev()`."
code: |
  for i in 1..10 {
      println!("{i}");
  }
checks:
  - match: '\(\s*1\s*\.\.=\s*10\s*\)\s*\.rev\(\)'
    message: "Write (1..=10).rev(). The brackets are needed before .rev()."
solution: |
  for i in (1..=10).rev() {
      println!("{i}");
  }
```

```quiz
question: "How many times does `for i in 2..5` run?"
options:
  - "3"
  - "4"
  - "5"
answer: 0
explain: 2..5 is 2, 3 and 4. The end of an exclusive range isn't included.
```
