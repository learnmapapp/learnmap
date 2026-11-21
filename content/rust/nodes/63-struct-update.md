---
title: Struct update syntax
icon: "✏️"
branch: data
requires: [structs]
summary: Build a new struct from an old one, changing just a few fields.
---
Say you have a settings struct and want a copy with one thing changed. Writing every field out again is tedious. The **struct update syntax**, `..other`, fills in the rest:

```rust title=src/main.rs
#[derive(Debug)]
struct Settings {
    volume: u8,
    dark_mode: bool,
    language: String,
}

fn main() {
    let defaults = Settings {
        volume: 50,
        dark_mode: false,
        language: String::from("en"),
    };

    let mine = Settings {
        dark_mode: true,
        ..defaults
    };
    println!("{mine:?}");
    // Settings { volume: 50, dark_mode: true, language: "en" }
}
```

The `..defaults` must come last. Fields you name explicitly win; everything else is taken from `defaults`.

One catch: this **moves** fields that aren't `Copy`. Here `language` (a `String`) was moved into `mine`, so you can't use `defaults.language` afterwards. `defaults.volume` is still fine, because numbers are copied.

It pairs nicely with the [Default trait](node:default-trait):

```rust
let s = Settings { volume: 80, ..Default::default() };
```

There's also a shorthand you may have spotted: when a variable has the same name as the field, write `Settings { volume, dark_mode, language }` instead of `volume: volume`.

```compare javascript
const mine = { ...defaults, darkMode: true };
```

```compare kotlin
val mine = defaults.copy(darkMode = true)
```

```compare python
mine = dataclasses.replace(defaults, dark_mode=True)
```

```compare go
mine := defaults
mine.DarkMode = true
```

```exercise
goal: "Create `loud` from `base` with `volume: 100`, taking every other field from `base`."
code: |
  let loud = Settings {
      volume: 100,
  };
checks:
  - match: 'volume\s*:\s*100\s*,\s*\.\.\s*base\s*\}'
    message: "Add ..base as the last line inside the braces."
solution: |
  let loud = Settings {
      volume: 100,
      ..base
  };
```

```quiz
question: Where does `..other` go in a struct literal?
options:
  - First, before the named fields.
  - Last, after the named fields.
  - Anywhere.
answer: 1
explain: The update syntax has to be the final item. Fields listed before it override the ones it copies.
```
