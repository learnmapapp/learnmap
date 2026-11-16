---
title: var and let
icon: 🏷️
branch: basics
requires:
  - nim
summary: var creates mutable storage; let prevents reassignment of the binding.
---

var creates mutable storage; let prevents reassignment of the binding. Prefer let when the value does not need to change.

A useful term here is [[binding]]: A name associated with a value or mutable storage.

```nim
var score = 1
let step = 2
score += step
echo score
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
goal: Repair the starting example using what you learned about var and let.
lang: nim
code: |-
  var score = 1
  let step = 2
  score -= step
  echo score
checks:
  - match: score\s+\+=\s+step
    message: Use score += step for this step.
  - notMatch: score\s+\-=\s+step
    message: Replace score -= step in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about var and let is correct?
options:
  - let permits reassignment just like var.
  - var values must be initialized at compile time.
  - var creates mutable storage; let prevents reassignment of the binding. Prefer let when the value
    does not need to change.
answer: 2
explain: var creates mutable storage; let prevents reassignment of the binding. Prefer let when the
  value does not need to change.
```
