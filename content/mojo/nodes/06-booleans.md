---
title: Boolean expressions
icon: "⚖️"
branch: basics
requires: [variables]
summary: True, False, and, or, not, and chained comparisons, written the Python way.
---
If you know Python, booleans in Mojo will feel familiar. The type is `Bool`, the values are `True` and `False` (with capitals), and the operators are words:

```mojo title=ride.mojo
def main():
    var age = 12
    var height_cm = 142
    var with_adult = False

    var tall_enough = height_cm >= 140
    var can_ride = tall_enough and (age >= 12 or with_adult)

    print("Can ride:", can_ride)   # Can ride: True
    print("Needs company:", not can_ride or age < 10)
```

**The operators:**

| Mojo | Meaning | Other languages |
| --- | --- | --- |
| `and` | both are true | `&&` |
| `or` | at least one is true | `\|\|` |
| `not` | flips it | `!` |
| `==`, `!=` | equal, not equal | |
| `<`, `<=`, `>`, `>=` | comparisons | |

`and` and `or` **short-circuit**: if the left side already decides the answer, the right side isn't evaluated at all. `count > 0 and total / count > 5` never divides by zero.

**Chained comparisons work**, just like in Python:

```mojo
var temp = 21
print(18 <= temp < 25)   # True: same as 18 <= temp and temp < 25
```

**Where Mojo differs from Python:** conditions in `if` and `while` must be something that can be turned into a `Bool`. Numbers and strings can (zero and empty are false), but the clearest style is to write the comparison out: `if len(name) > 0:` says exactly what you mean, where `if name:` makes the reader stop and think.

Booleans convert to numbers if you ask: `Int(True)` is 1, which is handy for counting how many conditions hold.

```compare python
can_ride = tall_enough and (age >= 12 or with_adult)
```

```compare javascript
const canRide = tallEnough && (age >= 12 || withAdult);
```

```compare rust
let can_ride = tall_enough && (age >= 12 || with_adult);
```

```exercise
goal: "This was translated from JavaScript and doesn't compile. Use Mojo's word operators, `and` and `not`."
code: |-
  def main():
      var logged_in = True
      var banned = False
      var can_post = logged_in && !banned
checks:
  - match: 'var\s+can_post\s*=\s*logged_in\s+and\s+not\s+banned'
    message: Write logged_in and not banned
  - notMatch: '&&|!banned'
    message: Remove the && and ! operators.
solution: |-
  def main():
      var logged_in = True
      var banned = False
      var can_post = logged_in and not banned
```

```quiz
question: "With `x = 0`, is `x != 0 and 10 / x > 1` safe to evaluate?"
options:
  - No, it divides by zero.
  - Yes, and stops after the left side, because it's False.
  - It's a compile error.
answer: 1
explain: and short-circuits. With a False left side, the right side never runs.
```
