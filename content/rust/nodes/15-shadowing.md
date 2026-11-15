---
title: Shadowing and constants
icon: "👥"
branch: basics
requires: [variables]
summary: Reuse a name with a new let, and const for values that never change.
---
You can declare a new variable with the same name as an old one. The new one **shadows** the old:

```rust
let input = "42";
let input: i32 = input.parse().unwrap();
let input = input * 2;
println!("{input}"); // 84
```

This isn't `mut`. Each `let` creates a brand new variable, so the type can even change, from `&str` to `i32` above. It's great for "cleaning up" a value step by step without inventing names like `input_str`, `input_num`.

Shadowing also respects scope:

```rust
let x = 1;
{
    let x = 2;
    println!("{x}"); // 2
}
println!("{x}"); // 1 again
```

For values that are truly fixed, use `const`. It needs a type and an UPPER_CASE name, and it's computed at compile time:

```rust
const MAX_LEGS: u32 = 10;
const SECONDS_PER_DAY: u64 = 24 * 60 * 60;
```

`static` is similar but has a single fixed memory address. You'll rarely need it.

| | can change? | type can change? | where |
| --- | --- | --- | --- |
| `let` | no | via shadowing | anywhere |
| `let mut` | yes | no | anywhere |
| `const` | never | no | anywhere, even outside functions |

```compare python
MAX_LEGS = 10  # constant by convention only
```

```compare javascript
const MAX_LEGS = 10; // JS const: the binding can't change
```

```compare java
static final int MAX_LEGS = 10;
```

```compare kotlin
const val MAX_LEGS = 10
```

```compare go
const MaxLegs = 10
```

```exercise
goal: Turn `count` into a number by shadowing it on the second line (don't rename it).
code: |
  let count = "7";
  let total = count.parse::<i32>().unwrap() + 1;
checks:
  - match: 'let\s+count(\s*:\s*i32)?\s*=\s*count\.parse'
    message: "Write  let count = count.parse::<i32>().unwrap();  first."
output: "total == 8"
```

```quiz
question: Which one can be declared outside of any function?
options:
  - let
  - let mut
  - const
answer: 2
explain: const values live at the top level too. let only works inside functions.
```
