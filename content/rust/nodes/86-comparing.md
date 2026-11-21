---
title: Equality and ordering
icon: "⚖️"
branch: traits
requires: [derive]
summary: PartialEq, Eq, PartialOrd and Ord, and when you need each.
---
`==` and `<` come from four traits. You'll usually derive them, but it helps to know what they mean:

| Trait | Gives you | Note |
| --- | --- | --- |
| `PartialEq` | `==` and `!=` | |
| `Eq` | a promise that `a == a` is always true | floats can't: `NaN != NaN` |
| `PartialOrd` | `<`, `>`, `<=`, `>=` | |
| `Ord` | a total order, `.cmp()`, `.max()` | needed for `sort()` and `BTreeMap` keys |

```rust title=src/main.rs
#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
enum Size {
    Small,
    Medium,
    Large,
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
struct Version(u32, u32, u32);

fn main() {
    println!("{}", Size::Small < Size::Large);        // true
    println!("{}", Version(1, 2, 0) > Version(1, 1, 9)); // true

    let mut sizes = vec![Size::Large, Size::Small, Size::Medium];
    sizes.sort();
    println!("{sizes:?}"); // [Small, Medium, Large]
}
```

Derived ordering compares in **declaration order**: enum variants from first to last, struct fields from top to bottom. That's why `Version(major, minor, patch)` sorts correctly.

When you want something different, implement it by hand. Here two users count as equal if their ids match, whatever their names:

```rust
impl PartialEq for User {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}
```

```compare java
record Version(int major, int minor) implements Comparable<Version> { ... }
```

```compare python
@dataclass(order=True)
class Version:
    major: int
```

```compare kotlin
data class Version(val major: Int) : Comparable<Version>
```

```compare go
// Go structs support == if all fields do; ordering needs cmp.Compare
```

```exercise
goal: "Make `Priority` sortable: derive `PartialEq`, `Eq`, `PartialOrd` and `Ord`."
code: |
  #[derive(Debug)]
  enum Priority {
      Low,
      High,
  }
checks:
  - match: '#\[derive\((?=[^)]*\bPartialEq\b)(?=[^)]*\bEq\b)(?=[^)]*\bPartialOrd\b)(?=[^)]*\bOrd\b)[^)]*\)\]'
    message: "Add all four: #[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]"
solution: |
  #[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
  enum Priority {
      Low,
      High,
  }
```

```quiz
question: "Why can't `f64` implement `Eq`?"
options:
  - Because NaN is not equal to itself.
  - Because floats are too big.
  - Because floats can't be compared at all.
answer: 0
explain: Eq promises that every value equals itself. NaN == NaN is false, so f64 only gets PartialEq.
```
