---
title: The Default trait
icon: "🧰"
branch: traits
requires: [derive]
summary: A sensible starting value for any type.
---
Many types have an obvious "empty" or "starting" value: `0` for numbers, `""` for strings, an empty `Vec`. The `Default` trait gives you that value with `Default::default()` or `T::default()`:

```rust title=src/main.rs
#[derive(Debug, Default)]
struct Settings {
    volume: u8,        // 0
    muted: bool,       // false
    nickname: String,  // ""
    friends: Vec<String>, // []
}

fn main() {
    let s = Settings::default();
    println!("{s:?}");
    // Settings { volume: 0, muted: false, nickname: "", friends: [] }
}
```

`#[derive(Default)]` works when every field has a default. When the derived values aren't what you want, implement it yourself:

```rust
impl Default for Settings {
    fn default() -> Self {
        Self {
            volume: 50,
            muted: false,
            nickname: String::from("player"),
            friends: Vec::new(),
        }
    }
}
```

Combined with [struct update syntax](node:struct-update), you can set just the fields you care about:

```rust
let quiet = Settings { volume: 10, ..Default::default() };
```

For enums, you mark which variant is the default:

```rust
#[derive(Default)]
enum Theme {
    #[default]
    System,
    Light,
    Dark,
}
```

```compare python
@dataclass
class Settings:
    volume: int = 50
```

```compare kotlin
data class Settings(val volume: Int = 50, val muted: Boolean = false)
```

```compare java
// Java gives fields zero values; constructors set the rest
```

```compare go
var s Settings // every field gets its zero value
```

```exercise
goal: "Derive `Default` for `Stats`, then create one with `Stats::default()`."
code: |
  #[derive(Debug)]
  struct Stats {
      wins: u32,
      losses: u32,
  }

  let stats = Stats { wins: 0, losses: 0 };
checks:
  - match: '#\[derive\([^)]*\bDefault\b[^)]*\)\]'
    message: "Add Default to the derive list: #[derive(Debug, Default)]"
  - match: 'let\s+stats\s*=\s*Stats::default\(\)'
    message: Create stats with Stats::default().
solution: |
  #[derive(Debug, Default)]
  struct Stats {
      wins: u32,
      losses: u32,
  }

  let stats = Stats::default();
```

```quiz
question: "What is `String::default()`?"
options:
  - "`None`"
  - An empty string.
  - It doesn't exist.
answer: 1
explain: The default String is empty, the default number is 0, and the default bool is false.
```
