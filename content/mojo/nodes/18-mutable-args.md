---
title: Mutable arguments
icon: "✏️"
branch: functions
requires: [functions]
summary: Mark a parameter mut to let a function change the caller's variable.
---
**Predict the output:**

```mojo
def level_up(level: Int):
    level += 1

def main():
    var level = 1
    level_up(level)
    print(level)
```

Trick question: this one doesn't even compile. By default, a parameter is **read-only**: the function can look at `level`, but not change it. The compiler reports that `level` is immutable, pointing at `+= 1`.

That's a deliberate default. When you call a function, you can be sure it won't change your variables behind your back, unless the signature says so.

**Saying so is one word: `mut`.**

```mojo title=game.mojo
def level_up(mut level: Int):
    level += 1

def main():
    var level = 1
    level_up(level)
    level_up(level)
    print(level)   # 3
```

Now the function works on the caller's own variable, not on a copy. When `level_up` adds one, `main`'s `level` goes up. This kind of parameter is a [[mutable argument]].

**How does this compare to what you know?**

| Language | Changing a caller's number inside a function |
| --- | --- |
| Python | impossible: return the new value instead |
| JavaScript | impossible for numbers |
| C++ | `int& level` |
| Rust | `level: &mut i32`, called as `level_up(&mut level)` |
| Mojo | `mut level: Int`, called as `level_up(level)` |

Note that the call site looks completely normal in Mojo. The `mut` is only in the signature.

**Some rules:**

- You can only pass something that *can* change: a `var` variable, not a literal. `level_up(5)` is an error, since there's no variable to update.
- `mut` works for any type. A function that adds items to a [list](node:lists) takes `mut items: List[String]`.

**Should you use it?** Returning a new value (`level = next_level(level)`) is often clearer for small values. `mut` shines for large values that would be wasteful to copy, like lists and big structs, and for functions that need to update several things at once.

```compare python
def level_up(level: int) -> int:
    return level + 1   # ints can't be changed in place
```

```compare rust
fn level_up(level: &mut i32) { *level += 1; }
level_up(&mut level);
```

```exercise
goal: "`add_bonus` should increase the caller's `score`. Mark the parameter as `mut`."
code: |-
  def add_bonus(score: Int):
      score += 50

  def main():
      var score = 100
      add_bonus(score)
      print(score)
checks:
  - match: 'def\s+add_bonus\(\s*mut\s+score\s*:\s*Int\s*\)'
    message: 'Write def add_bonus(mut score: Int):'
solution: |-
  def add_bonus(mut score: Int):
      score += 50

  def main():
      var score = 100
      add_bonus(score)
      print(score)
```

```quiz
question: "How do you call `def reset(mut count: Int)` with a variable `n`?"
options:
  - "`reset(mut n)`"
  - "`reset(&n)`"
  - "`reset(n)`"
answer: 2
explain: The mut is only written in the signature. The call looks like any other.
```
