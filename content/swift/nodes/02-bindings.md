---
title: let and var
icon: "📌"
branch: basics
requires: [swift]
summary: let for values that stay put, var for values that change. Prefer let.
---
Swift has two ways to name a value:

```swift title=game.swift
let playerName = "Robin"
var score = 0

score += 10
score += 5
print("\(playerName) has \(score) points")  // Robin has 15 points
```

- **`let`** is a constant. Once set, it stays.
- **`var`** is a variable. It can change as often as you like.

Try to change a `let`, and the compiler stops you, with a fix ready:

```repl shell
> swift game.swift
error: cannot assign to value: 'playerName' is a 'let' constant
note: change 'let' to 'var' to make it mutable
```

It works the other way round too. Declare a `var` you never change, and Swift warns you: *variable 'score' was never mutated; consider changing to 'let'*.

The Swift community's rule of thumb is simple: **use `let` until you need `var`**. Constants make code easier to follow, because you know a value is still what it was when it was created.

A `let` doesn't need a value straight away, as long as it gets exactly one before it's used. That's handy with `if`:

```swift
let greeting: String
if hour < 12 {
    greeting = "Good morning"
} else {
    greeting = "Good afternoon"
}
```

```compare javascript
const playerName = "Robin";
let score = 0;
```

```compare kotlin
val playerName = "Robin"
var score = 0
```

```compare rust
let player_name = "Robin";
let mut score = 0;
```

```exercise
goal: The lives counter goes down when the player is hit, but the code doesn't compile. Fix the declaration.
code: |-
  let maxLives = 3
  let lives = maxLives
  lives -= 1
checks:
  - match: 'var\s+lives\s*=\s*maxLives'
    message: lives changes, so it must be a var.
  - match: 'let\s+maxLives\s*=\s*3'
    message: maxLives never changes. Keep it a let.
solution: |-
  let maxLives = 3
  var lives = maxLives
  lives -= 1
```

```quiz
question: You declare `var total = 0` and never change it. What does Swift do?
options:
  - Refuses to compile.
  - Compiles it, with a warning suggesting let.
  - Silently turns it into a let.
answer: 1
explain: It's a warning, not an error. Swift nudges you towards let, but doesn't insist.
```
