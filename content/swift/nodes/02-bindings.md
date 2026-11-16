---
title: let and var
icon: 🏷️
branch: basics
requires:
  - swift
summary: let defines a constant binding; var permits reassignment.
---

let defines a constant binding; var permits reassignment. Start with let and introduce mutation only where the program needs it.

```swift
let step = 2
var score = 1
score += step
print(score)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
score = 1
score += 2
print(score)
```

```compare javascript
let score = 1;
score += 2;
console.log(score);
```

```compare rust
fn main() {
    let mut score = 1;
    score += 2;
    println!("{score}");
}
```

```exercise
goal: Repair the starting example using what you learned about let and var.
lang: swift
code: |-
  let step = 2
  var score = 1
  score -= step
  print(score)
checks:
  - match: score\s+\+=\s+step
    message: Use score += step for this step.
  - notMatch: score\s+\-=\s+step
    message: Replace score -= step in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about let and var is correct?
options:
  - let and var both allow reassignment.
  - var makes the value a global.
  - let defines a constant binding; var permits reassignment. Start with let and introduce mutation
    only where the program needs it.
answer: 2
explain: let defines a constant binding; var permits reassignment. Start with let and introduce
  mutation only where the program needs it.
```
