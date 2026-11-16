---
title: Conditional repetition
icon: "🎲"
branch: flow
requires: [if, bindings]
summary: while for "keep going until", and repeat-while for "at least once".
---
`for` is for when you know what you're walking through. `while` is for when you don't know how many rounds it'll take.

Let's roll a die until we get a six:

```swift title=dice.swift
var rolls = 0
var roll = 0

while roll != 6 {
    roll = Int.random(in: 1...6)
    rolls += 1
    print("🎲 \(roll)")
}
print("Got a six after \(rolls) rolls")
```

The condition is checked **before** every round. That's why `roll` starts at `0` above: something that isn't 6, so the loop runs at least once.

That "initialise it to something fake" trick is a bit clumsy. Swift has a loop for exactly this situation, **repeat-while**, which checks the condition **after** each round:

```swift
var rolls = 0
var roll: Int
repeat {
    roll = Int.random(in: 1...6)
    rolls += 1
} while roll != 6
```

The body always runs at least once, so `roll` doesn't need a fake starting value. (`repeat` is what other languages call `do`. Swift uses `do` for error handling, which you'll meet [later](node:errors).)

Which loop when?

| Situation | Loop |
| --- | --- |
| Going through a collection or a range | `for-in` |
| Keep going while something is true, possibly zero times | `while` |
| Do it once, then repeat while needed | `repeat-while` |

And when the exit condition is clearest in the middle of the loop, `while true { ... }` with a `break` is perfectly respectable Swift.

```compare python
# Python has no do-while; you'd write:
while True:
    roll = random.randint(1, 6)
    if roll == 6:
        break
```

```compare javascript
let roll;
do {
  roll = Math.ceil(Math.random() * 6);
} while (roll !== 6);
```

```exercise
goal: The menu should be shown at least once. Rewrite this loop as repeat-while.
code: |-
  var choice = ""
  while choice != "q" {
      choice = showMenu()
  }
checks:
  - match: 'repeat\s*\{'
    message: Start the loop with repeat {
  - match: '\}\s*while\s+choice\s*!=\s*"q"'
    message: 'End it with: } while choice != "q"'
solution: |-
  var choice = ""
  repeat {
      choice = showMenu()
  } while choice != "q"
```

```quiz
question: How often does the body of `repeat { ... } while false` run?
options:
  - Never
  - Once
  - Forever
answer: 1
explain: repeat-while runs the body first and checks the condition afterwards, so it always runs at least once.
```
