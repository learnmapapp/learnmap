---
title: Slices
icon: "🍕"
branch: memory
requires: [borrowing, tuples]
summary: Borrow part of an array, vector or string.
---
A **slice** is a borrowed view into a run of elements. It doesn't own anything; it's a pointer plus a length:

```rust
let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
let midweek: &[&str] = &days[1..4]; // Tue, Wed, Thu
let first_two = &days[..2];
let rest = &days[2..];
```

Functions that take `&[T]` work with arrays, vectors and parts of either:

```rust
fn total(nums: &[i32]) -> i32 {
    let mut sum = 0;
    for n in nums {
        sum += n;
    }
    sum
}

total(&[1, 2, 3]);
total(&vec![4, 5]);
total(&big_vector[10..20]);
```

String slices are the `&str` you've been using all along:

```rust
let text = String::from("hello world");
let hello: &str = &text[0..5];
```

Because a slice borrows, the borrow checker guards it. You can't clear a vector while a slice into it is alive:

```rust
let mut v = vec![1, 2, 3];
let first = &v[..1];
v.clear();
println!("{first:?}");
```

```repl shell
> cargo build
error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable
```

```warn
String slices count **bytes**, not characters. `&"héllo"[0..2]` panics, because é takes two bytes. Use `.chars()` when you work with characters.
```

```compare python
midweek = days[1:4]  # a copy, not a view
```

```compare javascript
const midweek = days.slice(1, 4); // a copy
```

```compare java
List<String> midweek = days.subList(1, 4); // a view
```

```compare kotlin
val midweek = days.slice(1..3)
```

```compare go
midweek := days[1:4] // a view, very similar to Rust
```

```exercise
goal: Make `total` accept any slice of i32 instead of only a Vec.
code: |
  fn total(nums: &Vec<i32>) -> i32 {
      nums.iter().sum()
  }
checks:
  - match: 'fn\s+total\s*\(\s*nums\s*:\s*&\[\s*i32\s*\]\s*\)'
    message: "Change the parameter type to &[i32]."
output: total(&[1, 2, 3]) == 6
```
