---
title: if and loops
icon: "🔁"
branch: basics
requires: [functions]
summary: if as an expression, loop, while and for.
---
`if` works like you'd expect, without parentheses around the condition. And since it's an expression, it can produce a value:

```rust
let label = if temperature > 25 { "hot" } else { "fine" };
```

Rust has three loops:

```rust
loop {
    // forever, until `break`
    break;
}

while lives > 0 {
    lives -= 1;
}

for i in 1..=3 {
    println!("{i}"); // 1, 2, 3
}
```

`1..4` is a range from 1 up to (but not including) 4. `1..=3` includes the end.

```compare python
for i in range(1, 4):
    print(i)
```

```compare javascript
for (let i = 1; i <= 3; i++) console.log(i);
```

```compare java
for (int i = 1; i <= 3; i++) System.out.println(i);
```

```compare kotlin
for (i in 1..3) println(i)
```

```compare go
for i := 1; i <= 3; i++ { fmt.Println(i) }
```

```exercise
goal: Loop from 1 to 10, including 10.
code: |
  for i in 1..10 {
      println!("{i}");
  }
checks:
  - match: 'for\s+\w+\s+in'
    message: Keep the for loop.
  - match: '1\s*\.\.=\s*10|1\s*\.\.\s*11'
    message: 1..10 stops at 9. Include the end with ..=
output: "1 2 3 4 5 6 7 8 9 10"
```

## if wants a bool

Unlike JavaScript or Python, Rust never guesses "truthiness". `if count { … }` with a number is an error. Write what you mean: `if count > 0`.

Both branches of an `if` used as a value must have the same type:

```rust
let n = if ok { 1 } else { "zero" };
```

```repl shell
> cargo build
error[E0308]: `if` and `else` have incompatible types
```

`else if` chains work as usual, but once you have more than two or three, a `match` usually reads better.

```quiz
question: Which numbers does  `for i in 0..3`  produce?
options:
  - 0, 1, 2
  - 0, 1, 2, 3
  - 1, 2, 3
answer: 0
explain: "`a..b` excludes b. Use `0..=3` to include it."
```
