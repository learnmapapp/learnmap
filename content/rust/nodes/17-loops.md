---
title: Loops that return values
icon: "➰"
branch: basics
requires: [control-flow]
summary: break with a value, loop labels and iterating with indexes.
---
`loop` is an expression too. Whatever you pass to `break` becomes its value:

```rust
let mut tries = 0;
let found = loop {
    tries += 1;
    if tries * tries > 50 {
        break tries;
    }
};
println!("{found}"); // 8
```

With nested loops, a **label** says which one to stop. Labels start with a quote:

```rust
'outer: for row in 0..10 {
    for col in 0..10 {
        if row * col == 42 {
            println!("found at {row},{col}");
            break 'outer;
        }
    }
}
```

`continue` skips to the next round, and also accepts a label.

To loop over a collection with the position, use `enumerate()`:

```rust
let crabs = ["Ferris", "Corro", "Rusty"];
for (i, name) in crabs.iter().enumerate() {
    println!("{i}: {name}");
}
```

And to count down, reverse a range:

```rust
for n in (1..=3).rev() {
    println!("{n}…");
}
println!("liftoff!");
```

```compare python
for i, name in enumerate(crabs):
    print(i, name)
```

```compare javascript
crabs.forEach((name, i) => console.log(i, name));
```

```compare java
outer:
for (int row = 0; row < 10; row++) { /* break outer; */ }
```

```compare kotlin
outer@ for (row in 0 until 10) { /* break@outer */ }
```

```compare go
outer:
for row := 0; row < 10; row++ { /* break outer */ }
```

```exercise
goal: Make the loop return `n` as its value, so `first` gets the first multiple of 7 above 50.
code: |
  let mut n = 50;
  let first = loop {
      n += 1;
      if n % 7 == 0 {
          break;
      }
  };
checks:
  - match: 'break\s+n\s*;'
    message: Pass the value to break, like  break n;
output: "first == 56"
```
