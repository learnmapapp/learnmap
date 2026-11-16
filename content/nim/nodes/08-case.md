---
title: Case selection
icon: "🎰"
branch: flow
requires: [if]
summary: case picks a branch by value, and the compiler checks that you covered them all.
---
A vending machine reads the button you pressed. With `if`, that's a long chain of `elif button == ...`. With `case`, it's a table:

```nim title=vending.nim
let button = 'B'

case button
of 'A':
  echo "Cola"
of 'B', 'C':
  echo "Juice"
of 'D'..'F':
  echo "Snacks"
else:
  echo "Unknown button"
```

**Reading it:**

- `case button` names the value to look at.
- Each `of` lists one or more values, separated by commas, or a range like `'D'..'F'` (both ends included).
- The first matching branch runs. There's no fall-through, so no `break` is needed.

**Exhaustiveness: the compiler's checklist.** Nim checks that every possible value is covered. For a `char` there are 256 possibilities, so without `else` this wouldn't compile:

```nim
case button
of 'A': echo "Cola"
# Error: not all cases are covered
```

That check really pays off with [enums](node:enums). When every value of an enum has its own `of`, you leave out `else`, and if someone adds a new value to the enum later, the compiler points out every `case` that needs updating.

**Strings work too**, though they always need an `else`, because there are infinitely many strings:

```nim
case command
of "start", "go": echo "Starting"
of "stop": echo "Stopping"
else: echo "Unknown command"
```

**`case` is also an expression**, just like [if](node:if):

```nim
let size = case cups
  of 0: "none"
  of 1..3: "small"
  of 4..9: "medium"
  else: "large"
```

```compare python
match button:
    case "A": print("Cola")
    case "B" | "C": print("Juice")
    case _: print("Unknown button")
```

```compare javascript
switch (button) {
  case "A": console.log("Cola"); break;
  case "B": case "C": console.log("Juice"); break;   // forget break and it falls through
  default: console.log("Unknown button");
}
```

```compare rust
match button {
    'A' => println!("Cola"),
    'B' | 'C' => println!("Juice"),
    'D'..='F' => println!("Snacks"),
    _ => println!("Unknown button"),
}
```

```exercise
goal: "Weekend days are missing. Add an `of 6, 7:` branch that echoes `\"weekend\"` before the else."
code: |-
  let day = 6
  case day
  of 1..5:
    echo "weekday"
  else:
    echo "invalid"
checks:
  - match: 'of\s+6\s*,\s*7\s*:\s*\n\s+echo\s+"weekend"\s*\n\s*else'
    message: 'Add of 6, 7: echo "weekend" before else.'
solution: |-
  let day = 6
  case day
  of 1..5:
    echo "weekday"
  of 6, 7:
    echo "weekend"
  else:
    echo "invalid"
```

```quiz
question: "In a case statement, what happens after a matching branch runs?"
options:
  - The next branch runs too, unless you write break.
  - The case statement ends.
  - Nim checks the remaining branches as well.
answer: 1
explain: Nim's case has no fall-through. Only the first matching branch runs.
```
