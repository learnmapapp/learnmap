---
title: "Variables"
icon: "🏷️"
branch: "basics"
requires: ["running-python"]
summary: "Names refer to objects; assignment does not declare a type."
---

Assignment attaches a name to a value. You do not need `let`, `var`, or a type declaration:

```python
score = 10
score = score + 5
player_name = "Ada"
print(player_name, score)  # Ada 15
```

A [[binding]] connects a name to an object. Reassigning the name changes that connection. Types belong to objects, so `score = "finished"` is legal, though changing what a name means usually makes a program harder to follow.

Use descriptive `snake_case` names for variables and functions. Constants conventionally use `UPPER_CASE`, such as `MAX_ATTEMPTS = 3`; Python does not prevent reassignment.

## Read before writing

Using a name before assigning it raises `NameError`. Assignment uses `=`; equality comparisons use `==`. Augmented assignment, such as `score += 1`, is a convenient way to update a counter.

Python names are case-sensitive: `score` and `Score` are different names. Avoid replacing built-in names such as `list` or `str`, because you may need those functions later.

```compare javascript
let score = 10;
score += 5;
```

```compare rust
let mut score = 10;
score += 5;
```

```exercise
goal: "Set score to 10, then add five with +=."
lang: python
code: |
  score = 10
  score += 1
  print(score)
checks:
  - match: "^score\\s*\\+=\\s*5\\s*$"
    message: "Change the increment to score += 5."
hint: "Change the increment to score += 5."
```

```quiz
question: "What does score = 20 do after score = 10?"
options:
  - "Changes the integer object 10."
  - "Binds score to the value 20."
  - "Declares a second variable with the same name."
answer: 1
explain: "Assignment rebinds the name. Integers themselves are immutable."
```
