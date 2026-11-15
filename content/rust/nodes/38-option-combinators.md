---
title: Option and Result helpers
icon: "🧰"
branch: errors
requires: [option-result, closures]
summary: map, and_then, unwrap_or and ok_or instead of match.
---
`match` works for everything, but Option and Result come with small helpers that make code read like a sentence.

**Defaults** when there's nothing:

```rust
let name = maybe_name.unwrap_or("stranger");
let port = env_port.unwrap_or_default();           // 0 for numbers, "" for strings
let list = cached.unwrap_or_else(|| load_list()); // only computed when needed
```

**Transforming** the value inside, if there is one:

```rust
let len: Option<usize> = maybe_name.map(|n| n.len());
```

**Chaining** steps that can each fail with `and_then`:

```rust
let age: Option<u8> = form.get("age")
    .and_then(|s| s.parse().ok());
```

`map` is for functions that always succeed, `and_then` for ones returning another Option (it avoids `Option<Option<T>>`).

**Converting** between the two:

```rust
let n: Option<i32> = "42".parse().ok();          // Result -> Option
let user = find(id).ok_or("user not found")?;    // Option -> Result
```

```repl
> Some(3).map(|n| n * 2)
Some(6)
> None::<i32>.map(|n| n * 2)
None
> Some(4).filter(|n| n % 2 == 1)
None
> "x".parse::<i32>().unwrap_or(0)
0
> Some(2).is_some()
true
```

```compare kotlin
val len = maybeName?.length
val name = maybeName ?: "stranger"
```

```compare java
Optional<Integer> len = maybeName.map(String::length);
String name = maybeName.orElse("stranger");
```

```compare javascript
const len = maybeName?.length;
const name = maybeName ?? "stranger";
```

```compare python
name = maybe_name if maybe_name is not None else "stranger"
```

```compare go
// No Option type; check for the zero value or `ok`.
```

```exercise
goal: Replace the match with a single helper call.
code: |
  let name = match nickname {
      Some(n) => n,
      None => "crab",
  };
checks:
  - match: 'nickname\.unwrap_or\(\s*"crab"\s*\)'
    message: Use nickname.unwrap_or("crab")
output: '"crab" when nickname is None'
```
