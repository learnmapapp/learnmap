---
title: "Variables"
icon: "🏷️"
branch: "basics"
requires: ["running-python"]
summary: "Names refer to objects; assignment does not declare a type."
---
In Python you make a variable by assigning to it. No `let`, no `var`, no type:

```python
score = 10
player = "Ada"
print(player, "has", score, "points")
```

## Labels, not boxes

A helpful picture: a variable isn't a box that holds a value. It's a **label** stuck onto a value. Assignment moves the label:

```python
score = 10
score = 20   # the label moves to 20; 10 is untouched
score += 5   # short for: score = score + 5
print(score) # 25
```

Python calls this a [[binding]]: a name bound to a value. Because the label carries no type, it can even move to a different kind of value:

```python
score = "game over"   # legal, but confusing to readers
```

Python won't stop you. Your future self might, though, so keep one meaning per name.

## A few house rules

- **Names use `snake_case`**: `high_score`, not `highScore`.
- **Constants are `UPPER_CASE`** by convention: `MAX_LIVES = 3`. Python doesn't enforce it; it's a note to readers.
- **Case matters**: `score` and `Score` are two different names.
- **Don't reuse built-in names** like `list`, `str` or `input`. It works, until you need the real one three lines later.

Reading a name before anything was assigned to it is an error:

```repl
> print(scor)
error: NameError: name 'scor' is not defined
```

That's often just a typo, and the message tells you exactly which name it couldn't find.

```compare javascript
let score = 10;   // Python has no let/const; assignment is enough
score += 5;
```

```compare kotlin
var score = 10    // Kotlin pins the type: score = "x" won't compile
score += 5
```

```exercise
goal: "The player should end up with 15 points. Change the increment, using `+=`."
lang: python
code: |
  score = 10
  score += 1
  print(score)
checks:
  - match: '^score\s*\+=\s*5\s*$'
    message: "Change the increment to score += 5."
hint: 10 plus what makes 15?
solution: |
  score = 10
  score += 5
  print(score)
```

```quiz
question: "After `a = 10` and then `a = \"ten\"`, what happens?"
options:
  - A TypeError, because a was an int.
  - The name a now refers to the string "ten".
  - a holds both values.
answer: 1
explain: Names have no fixed type in Python. Assignment just moves the label to the new value.
```
