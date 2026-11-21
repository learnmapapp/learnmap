---
title: Result combinators
icon: "🔗"
branch: errors
requires: [option-combinators, question-mark]
summary: map_err, and_then, unwrap_or_else and ok_or.
---
`Result` has the same kind of helper methods as `Option`. They let you transform values and errors without writing a `match` every time.

```rust title=src/main.rs
fn parse_level(input: &str) -> Result<u8, String> {
    input
        .trim()
        .parse::<u8>()
        .map_err(|e| format!("'{input}' is not a level: {e}"))
}

fn main() {
    println!("{:?}", parse_level("3"));   // Ok(3)
    println!("{:?}", parse_level("max")); // Err("'max' is not a level: invalid digit found in string")
}
```

The ones you'll use most:

| Method | What it does |
| --- | --- |
| `map(f)` | change the `Ok` value, leave errors alone |
| `map_err(f)` | change the error, leave `Ok` alone |
| `and_then(f)` | run another step that can also fail |
| `unwrap_or(v)` | the value, or `v` on error |
| `unwrap_or_else(f)` | the value, or compute one from the error |
| `ok()` | turn it into an `Option`, dropping the error |

And going the other way, `Option::ok_or(err)` turns `None` into `Err(err)`, so you can use `?` on it in a function returning `Result`:

```rust
let user = users.get(id).ok_or("no such user")?;
```

`map_err` is especially common right before `?`, to turn a library's error into your own type:

```rust
let n = text.parse::<u32>().map_err(ConfigError::BadNumber)?;
```

```compare javascript
const level = Number(input); // no Result type; check for NaN by hand
```

```compare kotlin
runCatching { input.toInt() }.getOrElse { 1 }
```

```compare java
Optional.ofNullable(user).orElseThrow(() -> new NotFound(id));
```

```compare go
if err != nil { return fmt.Errorf("bad level %q: %w", input, err) }
```

```exercise
goal: "Turn the `None` into an error with `ok_or`, so `?` can be used."
code: |
  fn price(menu: &HashMap<String, u32>, item: &str) -> Result<u32, String> {
      let p = menu.get(item)?;
      Ok(*p)
  }
checks:
  - match: 'menu\.get\(\s*item\s*\)\.ok_or\('
    message: Add .ok_or(...) right after menu.get(item).
  - match: 'ok_or\(.*\)\s*\?'
    message: Keep the ? after ok_or(...).
solution: |
  fn price(menu: &HashMap<String, u32>, item: &str) -> Result<u32, String> {
      let p = menu.get(item).ok_or(format!("{item} is not on the menu"))?;
      Ok(*p)
  }
```

```quiz
question: "Which method changes only the error inside a Result?"
options:
  - "`map`"
  - "`map_err`"
  - "`and_then`"
answer: 1
explain: map_err transforms the Err value and passes Ok values through untouched.
```
