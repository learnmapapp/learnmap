---
title: Tuples and arrays
icon: "📚"
branch: basics
requires: [types]
summary: Fixed-size groups of values.
---
A **tuple** groups a few values, possibly of different types. Get at the parts with `.0`, `.1`, or by destructuring:

```rust
let crab: (&str, u8) = ("Ferris", 10);
println!("{}", crab.0);

let (name, legs) = crab;
println!("{name} has {legs} legs");
```

Tuples are handy for returning more than one value:

```rust
fn min_max(a: i32, b: i32) -> (i32, i32) {
    if a < b { (a, b) } else { (b, a) }
}
```

An **array** holds a fixed number of values of the *same* type. The length is part of the type:

```rust
let days: [&str; 3] = ["Mon", "Tue", "Wed"];
let zeros = [0; 5];      // [0, 0, 0, 0, 0]
println!("{}", days[1]); // Tue
println!("{}", days.len());
```

Reading past the end doesn't silently give you garbage. Rust stops the program:

```repl shell
> cargo run
thread 'main' panicked: index out of bounds: the len is 3 but the index is 7
```

```tip
Need a list that can grow? That's a `Vec`, coming up in [Vectors](node:vectors). Arrays are for things whose size is truly fixed, like the RGB parts of a colour.
```

The empty tuple `()` is called "unit". It's what a function returns when it returns nothing.

```compare python
crab = ("Ferris", 10)
name, legs = crab
```

```compare javascript
const crab = ["Ferris", 10];
const [name, legs] = crab;
```

```compare java
// Java has no tuples; a record is closest
record Crab(String name, int legs) {}
```

```compare kotlin
val crab = Pair("Ferris", 10)
val (name, legs) = crab
```

```compare go
name, legs := "Ferris", 10 // multiple values, but no tuple type
```

```exercise
goal: Destructure `point` into two variables `x` and `y` in one let.
code: |
  let point = (3, 4);
  let x = point.0;
  let y = point.1;
checks:
  - match: 'let\s*\(\s*x\s*,\s*y\s*\)\s*=\s*point'
    message: "Use a tuple pattern on the left:  let (x, y) = point;"
output: x = 3, y = 4
```
