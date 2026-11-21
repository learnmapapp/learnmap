---
title: Arrays
icon: "🧱"
branch: basics
requires: [types]
summary: A fixed number of values of one type, stored side by side.
---
An **array** holds a fixed number of values, all of the same type. The length is part of the type, so `[i32; 3]` means "exactly three `i32`s":

```rust title=src/main.rs
fn main() {
    let days: [&str; 3] = ["Mon", "Tue", "Wed"];
    let zeros = [0; 5]; // [0, 0, 0, 0, 0]

    println!("{}", days[0]);   // Mon
    println!("{}", days.len()); // 3
    println!("{zeros:?}");
}
```

Positions start at 0. Asking for one that doesn't exist stops the program with a panic, instead of reading random memory like C would:

```repl shell
> cargo run
thread 'main' panicked at src/main.rs:4:20:
index out of bounds: the len is 3 but the index is 7
```

Loop over an array with `for`:

```rust
for day in days {
    println!("{day}");
}
```

Arrays can't grow. If you don't know how many items you'll have, you want a [vector](node:vectors), `Vec<T>`. Arrays are for things with a natural fixed size: the days of a week, RGB colour channels, a 3×3 game board.

```compare python
days = ["Mon", "Tue", "Wed"]   # a list, which can grow
```

```compare javascript
const days = ["Mon", "Tue", "Wed"]; // can grow
```

```compare java
String[] days = {"Mon", "Tue", "Wed"};
```

```compare go
days := [3]string{"Mon", "Tue", "Wed"}
```

```exercise
goal: "Create an array `rgb` of type `[u8; 3]` holding 255, 128 and 0."
code: |
  let rgb = ;
checks:
  - match: 'let\s+rgb\s*:\s*\[\s*u8\s*;\s*3\s*\]\s*=\s*\[\s*255\s*,\s*128\s*,\s*0\s*\]'
    message: "Write let rgb: [u8; 3] = [255, 128, 0];"
solution: |
  let rgb: [u8; 3] = [255, 128, 0];
```

```quiz
question: "What is the type of `[1.5, 2.5]`?"
options:
  - "`[f64; 2]`"
  - "`Vec<f64>`"
  - "`[f64]`"
answer: 0
explain: An array literal has a fixed length, and that length is part of its type.
```
