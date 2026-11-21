---
title: While let
icon: "🔂"
branch: data
requires: [if-let, loops]
summary: Keep looping for as long as a pattern matches.
---
[`if let`](node:if-let) runs a block once if a pattern matches. `while let` keeps running it **for as long as** the pattern matches.

The classic example is a stack. `pop()` returns `Some(item)` while there's something left, and `None` when it's empty:

```rust title=src/main.rs
fn main() {
    let mut plates = vec!["blue", "red", "green"];

    while let Some(plate) = plates.pop() {
        println!("washing the {plate} plate");
    }
    // washing the green plate
    // washing the red plate
    // washing the blue plate
}
```

Written with a plain `loop`, you'd need a `match` and a manual `break`:

```rust
loop {
    match plates.pop() {
        Some(plate) => println!("washing the {plate} plate"),
        None => break,
    }
}
```

`while let` says the same thing in one line. You'll see it with anything that hands out values one at a time until it runs out: stacks, queues, channel receivers and parsers.

```compare python
while plates:
    plate = plates.pop()
```

```compare javascript
let plate;
while ((plate = plates.pop()) !== undefined) { }
```

```compare kotlin
while (true) { val plate = plates.removeLastOrNull() ?: break }
```

```compare go
for len(plates) > 0 { plate := plates[len(plates)-1]; plates = plates[:len(plates)-1] }
```

```exercise
goal: "Replace the `loop` and `match` with a `while let` loop that does the same thing."
code: |
  loop {
      match tasks.pop() {
          Some(task) => run(task),
          None => break,
      }
  }
checks:
  - match: 'while\s+let\s+Some\(\s*task\s*\)\s*=\s*tasks\.pop\(\)'
    message: "Start with while let Some(task) = tasks.pop() {"
  - notMatch: 'break'
    message: while let stops on its own, so you don't need break.
solution: |
  while let Some(task) = tasks.pop() {
      run(task);
  }
```

```quiz
question: "When does `while let Some(x) = stack.pop()` stop?"
options:
  - After the first item.
  - When pop() returns None.
  - Never, you need a break.
answer: 1
explain: The loop runs while the pattern matches. Once pop() gives None, Some(x) no longer matches and the loop ends.
```
