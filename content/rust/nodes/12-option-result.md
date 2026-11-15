---
title: Option and Result
icon: "🛟"
branch: data
requires: [match, borrowing]
summary: No null, no exceptions, and the ? operator.
---
Rust has no `null`. A value that might be missing is an [[option|Option]]:

```rust
enum Option<T> {
    Some(T),
    None,
}
```

And instead of exceptions, a function that can fail returns a [[result|Result]]:

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

They're just [[enum|enum]]s, so you handle them with `match`. The compiler won't let you use the value without dealing with the other case:

```rust
match "42".parse::<i32>() {
    Ok(n) => println!("got {n}"),
    Err(e) => println!("oops: {e}"),
}
```

Writing that every time is verbose, so there's the `?` operator. Inside a function that returns a `Result`, `?` means: "give me the value, or return the error right now":

```rust
fn total(a: &str, b: &str) -> Result<i32, ParseIntError> {
    let x = a.parse::<i32>()?;
    let y = b.parse::<i32>()?;
    Ok(x + y)
}
```

```compare java
// Java would throw; the caller may or may not catch it.
int total(String a, String b) throws NumberFormatException {
    return Integer.parseInt(a) + Integer.parseInt(b);
}
```

```compare kotlin
// Kotlin has nullable types (Int?) for Option, and exceptions for errors.
fun total(a: String, b: String): Int? = a.toIntOrNull()?.let { x -> b.toIntOrNull()?.plus(x) }
```

```compare go
// Go returns (value, error) too, but `?` saves all the `if err != nil`.
x, err := strconv.Atoi(a)
if err != nil { return 0, err }
```

```compare python
# Python raises exceptions; None is used for "missing".
def total(a, b): return int(a) + int(b)
```

```compare javascript
// JS throws, or returns undefined/NaN.
const total = (a, b) => parseInt(a) + parseInt(b);
```

```exercise
goal: Replace the `unwrap()` calls (which crash on bad input) with `?`.
code: |
  fn total(a: &str, b: &str) -> Result<i32, ParseIntError> {
      let x = a.parse::<i32>().unwrap();
      let y = b.parse::<i32>().unwrap();
      Ok(x + y)
  }
checks:
  - notMatch: 'unwrap\(\)'
    message: There's still an unwrap() in there.
  - match: 'parse::<i32>\(\)\?;[\s\S]*parse::<i32>\(\)\?;'
    message: Put ? directly after each parse call.
output: total("2", "40") == Ok(42)
```

## Peeking inside without match

For simple checks, there are methods: `is_some()`, `is_none()`, `is_ok()`, `is_err()`. And `if let` handles the "only care about one case" situation:

```rust
if let Some(user) = find_user(42) {
    println!("hello {}", user.name);
}
```

The full toolbox, like `map`, `unwrap_or` and `and_then`, is in [Option and Result helpers](node:option-combinators), and the deep dive on `?` is in [The ? operator](node:question-mark).

```quiz
question: "What's the type of \"42\".parse::<i32>()?"
options:
  - i32
  - Option<i32>
  - Result<i32, ParseIntError>
answer: 2
explain: Parsing can fail with an explanation, so it returns a Result with the error type.
```
