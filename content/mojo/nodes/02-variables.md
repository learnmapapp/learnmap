---
title: Typed variables
icon: "📮"
branch: basics
requires: [mojo]
summary: var declares a variable, and its type is fixed once it's chosen.
---
In Mojo, you declare variables with `var`. Add a type after a colon, or let the compiler work it out from the value:

```mojo title=score.mojo
def main():
    var lives: Int = 3       # explicit type
    var player = "Robin"     # inferred: String
    var speed = 2.5          # inferred: Float64

    lives -= 1
    print(player, "has", lives, "lives left")
```

```repl shell
> mojo run score.mojo
Robin has 2 lives left
```

`print` takes any number of values and puts a space between them, just like Python's.

**A variable keeps its type for life.** Coming from Python, this is the big adjustment. Once `lives` is an `Int`, it stays an `Int`:

```mojo
var lives = 3
lives = "three"   # compile error: a String can't become an Int
```

The compiler reports this before anything runs, with an error saying it *cannot implicitly convert* the value to `Int`. Think of a variable as a labeled box with a fixed shape: you can put a new `Int` in it whenever you like, but never a `String`.

**Why `var`?** Python creates a variable the first time you assign to it. Mojo wants you to say "this is new" explicitly. That way, a typo like `livse = 2` is an error ("use of unknown declaration") rather than a brand new variable that silently hides a bug.

**Declare now, assign later.** You can declare a variable with only a type, as long as you assign it before reading it:

```mojo
var message: String
if lives > 0:
    message = "Keep going!"
else:
    message = "Game over"
print(message)
```

If one path forgot to assign `message`, the compiler would tell you it's *uninitialized* when used. No surprise `None` at runtime.

```compare python
lives = 3
lives = "three"   # fine in Python, the type can change
```

```compare javascript
let lives = 3;
lives = "three";  // also fine in JS
```

```compare rust
let mut lives: i32 = 3;
lives = "three";  // error, like Mojo
```

```exercise
goal: "Declare a variable `temperature` with the explicit type `Float64` and the value 21.5."
code: |-
  def main():
      temperature = 21.5
      print(temperature)
checks:
  - match: 'var\s+temperature\s*:\s*Float64\s*=\s*21\.5'
    message: 'Write var temperature: Float64 = 21.5'
solution: |-
  def main():
      var temperature: Float64 = 21.5
      print(temperature)
```

```quiz
question: "`var count = 10`, then `count = 2.5`. What happens?"
options:
  - count becomes 2.5.
  - A compile error, because count is an Int.
  - count becomes 2, rounded down.
answer: 1
explain: The type is fixed when the variable is declared, and a Float64 can't implicitly become an Int.
```
