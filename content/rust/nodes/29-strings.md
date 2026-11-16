---
title: String and &str
icon: "🧵"
branch: collections
requires: [slices]
summary: Two string types, UTF-8, and the handy methods.
---
Rust has two main string types, and now that you know about ownership and slices they make sense:

| | `String` | `&str` |
| --- | --- | --- |
| owns its text | yes | no, it borrows |
| can grow | yes | no |
| typical use | building and storing text | function parameters, literals |

Converting between them:

```rust
// or String::from("crab"), or "crab".into()
let owned: String = "crab".to_string();
let borrowed: &str = &owned; // or owned.as_str()
```

Building strings:

```rust
let mut s = String::new();
s.push_str("hello");
s.push(' ');
s += "world";
let both = format!("{s}!");
```

Strings are always valid **UTF-8**. Since one character can take several bytes, you can't index with `s[0]`:

```repl shell
> cargo build
error[E0277]: the type `str` cannot be indexed by `{integer}`
```

Instead, say what you mean:

```rust
let word = "crème";
word.len();             // 6 (bytes)
word.chars().count();   // 5 (characters)
word.chars().next();    // Some('c')
```

Useful methods, all returning new values or slices:

```repl
> "  Ferris  ".trim()
"Ferris"
> "a,b,c".split(',').collect::<Vec<_>>()
["a", "b", "c"]
> "crab".to_uppercase()
"CRAB"
> "crab".replace("c", "g")
"grab"
> "crabby".starts_with("crab")
true
```

```compare python
s = "crème"
len(s)  # 5 characters
```

```compare javascript
"crème".length // 5 UTF-16 units; emoji count double
```

```compare java
"crème".length() // UTF-16 units, like JavaScript
```

```compare kotlin
"crème".length
```

```compare go
len("crème")                    // 6 bytes, like Rust
utf8.RuneCountInString("crème") // 5
```

```exercise
goal: Count the characters, not the bytes.
code: |
  let word = "naïve";
  let letters = word.len();
checks:
  - match: 'word\.chars\(\)\.count\(\)'
    message: Use .chars().count() to count characters.
output: "letters == 5"
```
