---
title: Patterns in depth
icon: "🧬"
branch: data
requires: [match, tuples]
summary: Guards, ranges, bindings with @, and destructuring everything.
---
Patterns are everywhere in Rust: in `match`, `let`, `if let`, function parameters and `for` loops. Here's the toolbox.

**Several options** with `|`, and **ranges**:

```rust
match c {
    'a' | 'e' | 'i' | 'o' | 'u' => "vowel",
    'a'..='z' => "consonant",
    _ => "something else",
}
```

**Guards** add an extra `if` to an arm:

```rust
match temperature {
    t if t < 0 => "freezing",
    t if t < 20 => "chilly",
    _ => "warm",
}
```

**Destructuring** structs and tuples, ignoring parts with `..`:

```rust
struct Crab { name: String, legs: u8, age: u8 }

match crab {
    Crab { legs: 10, .. } => "a healthy crab",
    Crab { name, legs, .. } => format!("{name} lost {} legs", 10 - legs),
}
```

**Binding with @** keeps the whole value while also testing it:

```rust
match age {
    n @ 13..=19 => println!("a teenager of {n}"),
    n => println!("{n}"),
}
```

Patterns even work in function parameters:

```rust
fn distance(&(x, y): &(f64, f64)) -> f64 {
    (x * x + y * y).sqrt()
}
```

```compare python
match point:
    case (0, 0): print("origin")
    case (x, 0) if x > 0: print("right")
```

```compare javascript
// No pattern matching yet; destructuring is the closest:
const { name, legs } = crab;
```

```compare java
switch (shape) {
    case Circle c when c.radius() > 10 -> "big circle";
    default -> "other";
}
```

```compare kotlin
when (age) {
    in 13..19 -> "teenager"
    else -> "other"
}
```

```compare go
switch { case t < 0: return "freezing" } // no destructuring
```

```exercise
goal: Add an arm before the last one that matches 1 to 9 (inclusive) and returns "small".
code: |
  let size = match n {
      0 => "zero",
      _ => "big",
  };
checks:
  - match: '1\s*\.\.=\s*9\s*=>\s*"small"'
    message: "Use a range pattern: 1..=9 => \"small\","
  - match: '"small"[\s\S]*_\s*=>'
    message: Put it before the _ arm, otherwise it never runs.
output: '"small"'
```
