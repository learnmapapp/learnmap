---
title: Const generics
icon: "🔢"
branch: traits
requires: [generics, arrays]
summary: Generic over a number, like the length of an array.
---
Generics usually stand for types: `Vec<T>`. **Const generics** stand for values, most often a size. That lets one function work with arrays of any length:

```rust title=src/main.rs
fn total<const N: usize>(values: [i32; N]) -> i32 {
    let mut sum = 0;
    for v in values {
        sum += v;
    }
    sum
}

fn main() {
    println!("{}", total([1, 2, 3]));       // N is 3
    println!("{}", total([10, 20, 30, 40])); // N is 4
}
```

`const N: usize` declares a compile-time number. The compiler fills it in from the array you pass.

They're handy in your own types too, when a size is part of what a type means:

```rust
struct Grid<const W: usize, const H: usize> {
    cells: [[u8; W]; H],
}

impl<const W: usize, const H: usize> Grid<W, H> {
    fn area(&self) -> usize {
        W * H
    }
}

let board: Grid<3, 3> = Grid { cells: [[0; 3]; 3] };
```

A `Grid<3, 3>` and a `Grid<8, 8>` are different types, so you can't accidentally mix up a tic-tac-toe board and a chess board.

```tip
If the size isn't known until the program runs, use a slice `&[T]` or a `Vec<T>` instead.
```

```compare typescript
// TypeScript can't express array lengths this way
```

```compare java
// No equivalent: Java array lengths aren't part of the type
```

```compare go
func total(values [3]int) int // Go has fixed sizes, but no const generics
```

```exercise
goal: "Make `first` work for arrays of any length, with a const generic `N`."
code: |
  fn first(values: [u8; 4]) -> u8 {
      values[0]
  }
checks:
  - match: 'fn\s+first\s*<\s*const\s+N\s*:\s*usize\s*>'
    message: "Add <const N: usize> after the function name."
  - match: 'values\s*:\s*\[\s*u8\s*;\s*N\s*\]'
    message: "Use [u8; N] as the parameter type."
solution: |
  fn first<const N: usize>(values: [u8; N]) -> u8 {
      values[0]
  }
```

```quiz
question: "Are `[i32; 3]` and `[i32; 4]` the same type?"
options:
  - Yes, they're both arrays of i32.
  - No, the length is part of an array's type.
answer: 1
explain: That's exactly why you need const generics to write one function for both.
```
