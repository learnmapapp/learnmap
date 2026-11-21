---
title: JSON with serde
icon: "🧾"
branch: tooling
requires: [derive, crates]
summary: Turn structs into JSON and back with two derives.
---
**serde** (serialize/deserialize) is how Rust converts data to and from formats like JSON, TOML and YAML. You derive two traits, and a format crate does the rest:

```repl shell
> cargo add serde --features derive
> cargo add serde_json
```

```rust title=src/main.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Recipe {
    name: String,
    minutes: u32,
    tags: Vec<String>,
}

fn main() -> Result<(), serde_json::Error> {
    let input = r#"{ "name": "Pancakes", "minutes": 20, "tags": ["sweet"] }"#;

    let recipe: Recipe = serde_json::from_str(input)?;
    println!("{}", recipe.name); // Pancakes

    let back = serde_json::to_string_pretty(&recipe)?;
    println!("{back}");
    Ok(())
}
```

`r#"..."#` is a **raw string**: quotes inside it don't need escaping, which is perfect for JSON.

The struct describes what you expect. If the JSON is missing `minutes` or has a string where a number should be, `from_str` returns an error that says exactly where.

## Tweaking with attributes

```rust
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct User {
    user_name: String,          // read and written as "userName"
    #[serde(default)]
    admin: bool,                // missing in JSON? use false
    #[serde(skip_serializing_if = "Option::is_none")]
    nickname: Option<String>,   // left out when None
}
```

The same derives work with `toml`, `serde_yaml`, `csv` and many more formats.

```compare python
recipe = json.loads(text)        # a dict, no checking
```

```compare javascript
const recipe = JSON.parse(text); // no checking either
```

```compare go
var r Recipe
err := json.Unmarshal(data, &r)
```

```compare kotlin
@Serializable data class Recipe(val name: String)
Json.decodeFromString<Recipe>(text)
```

```exercise
goal: "Derive `Serialize` and `Deserialize` for `Point`, so it can go to and from JSON."
code: |
  #[derive(Debug)]
  struct Point {
      x: f64,
      y: f64,
  }
checks:
  - match: '#\[derive\((?=[^)]*\bSerialize\b)(?=[^)]*\bDeserialize\b)[^)]*\)\]'
    message: "Add both: #[derive(Debug, Serialize, Deserialize)]"
solution: |
  #[derive(Debug, Serialize, Deserialize)]
  struct Point {
      x: f64,
      y: f64,
  }
```

```quiz
question: "The JSON has `\"minutes\": \"twenty\"` but the struct field is `u32`. What happens?"
options:
  - minutes becomes 0.
  - from_str returns an error describing the problem.
  - The program crashes with a segfault.
answer: 1
explain: serde checks the data against your types and reports a clear error when it doesn't fit.
```
