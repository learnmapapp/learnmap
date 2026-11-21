---
title: Match guards and bindings
icon: "🛡️"
branch: data
requires: [patterns]
summary: Add if conditions to arms, and name what you matched with @.
---
Sometimes a pattern alone isn't enough. A **match guard** adds an `if` to an arm:

```rust title=src/main.rs
fn describe(temp: i32) -> &'static str {
    match temp {
        t if t < 0 => "freezing",
        0 => "exactly zero",
        t if t % 2 == 0 => "even and above zero",
        _ => "odd and above zero",
    }
}

fn main() {
    println!("{}", describe(-5)); // freezing
    println!("{}", describe(8));  // even and above zero
}
```

Arms are tried from top to bottom. An arm only matches if its pattern fits **and** its guard is true.

## Naming a value with `@`

With ranges, you often want both the check and the value. `name @ pattern` binds the matched value to `name`:

```rust
match age {
    0 => println!("newborn"),
    n @ 1..=12 => println!("child of {n}"),
    n @ 13..=19 => println!("teenager of {n}"),
    n => println!("adult of {n}"),
}
```

Guards work with any pattern, including enums:

```rust
match order {
    Order::Paid { amount } if amount > 100 => free_shipping(),
    Order::Paid { .. } => normal_shipping(),
    Order::Pending => wait(),
}
```

```compare kotlin
when { temp < 0 -> "freezing"; temp == 0 -> "zero"; else -> "warm" }
```

```compare python
match temp:
    case t if t < 0: ...
```

```compare java
case Integer t when t < 0 -> "freezing";
```

```compare go
switch { case temp < 0: return "freezing" }
```

```exercise
goal: "Add a first arm that returns `\"big\"` for any `n` greater than 1000, using a guard."
code: |
  match n {
      0 => "zero",
      _ => "small",
  }
checks:
  - match: 'n\s+if\s+n\s*>\s*1000\s*=>\s*"big"'
    message: "Add an arm like n if n > 1000 => \"big\","
  - match: '"big"[\s\S]*0\s*=>\s*"zero"'
    message: Put the new arm first, so it's checked before the others.
solution: |
  match n {
      n if n > 1000 => "big",
      0 => "zero",
      _ => "small",
  }
```

```quiz
question: "In `x @ 1..=9 => ...`, what does `x` hold?"
options:
  - The value that matched, somewhere from 1 to 9.
  - The range 1..=9 itself.
  - "`true`"
answer: 0
explain: The @ binding gives a name to the value being matched, after checking it against the pattern.
```
