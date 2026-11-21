---
title: Let else
icon: "🚪"
branch: data
requires: [if-let]
summary: Unwrap a value or leave early, without nesting.
---
Often you want "get the value out, or give up". With `if let`, the happy path ends up indented inside a block. `let ... else` flips that around:

```rust title=src/main.rs
fn parse_age(input: &str) -> Option<u32> {
    let Ok(age) = input.trim().parse::<u32>() else {
        return None;
    };
    // From here on, `age` is a plain u32.
    Some(age)
}

fn main() {
    println!("{:?}", parse_age("42"));  // Some(42)
    println!("{:?}", parse_age("old")); // None
}
```

Read it as: "Let `Ok(age)` be the result. If it isn't, do the `else` block." The `else` block **must leave**: `return`, `break`, `continue` or panic. It can't just carry on, because then `age` would have no value.

Compare the `if let` version, where everything is pushed one level deeper:

```rust
if let Ok(age) = input.trim().parse::<u32>() {
    // the rest of the function lives in here
    Some(age)
} else {
    None
}
```

`let else` keeps the main code flat, with the early exits at the top. That's called a **guard clause**.

```compare typescript
const age = Number(input);
if (Number.isNaN(age)) return undefined;
```

```compare kotlin
val age = input.toIntOrNull() ?: return null
```

```compare python
try:
    age = int(input)
except ValueError:
    return None
```

```compare go
age, err := strconv.Atoi(input)
if err != nil { return 0, false }
```

```exercise
goal: "Rewrite this with `let Some(user) = ... else { return; };` so the rest stays flat."
code: |
  if let Some(user) = find_user(id) {
      greet(user);
  } else {
      return;
  }
checks:
  - match: 'let\s+Some\(\s*user\s*\)\s*=\s*find_user\(\s*id\s*\)\s*else\s*\{\s*return\s*;?\s*\}\s*;'
    message: "Write let Some(user) = find_user(id) else { return; };"
  - notMatch: 'if\s+let'
    message: Remove the if let.
  - match: 'greet\(\s*user\s*\)'
    message: Keep the greet(user) call after it.
solution: |
  let Some(user) = find_user(id) else { return; };
  greet(user);
```

```quiz
question: What must the else block of a let else do?
options:
  - Return a default value for the binding.
  - Leave the current block, for example with return or break.
  - Nothing, it's optional.
answer: 1
explain: The else block has to diverge. If it could fall through, the new binding would have no value.
```
