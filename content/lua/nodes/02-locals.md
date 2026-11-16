---
title: Local bindings
icon: 🏷️
branch: basics
requires:
  - lua
summary: Use local for bindings confined to the current scope; assigning an undeclared name
  otherwise writes a global.
---

Use local for bindings confined to the current scope; assigning an undeclared name otherwise writes a global.

```lua
local score = 12
score = score + 1
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
goal: Repair the starting example using what you learned about local bindings.
lang: lua
code: |-
  local score = 0
  score = score + 1
  print(score)
checks:
  - match: local\s+score\s+=\s+12
    message: Use local score = 12 for this step.
  - notMatch: local\s+score\s+=\s+0
    message: Replace local score = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Inside a function, which declaration keeps `score` local?
options:
  - "`score = 12`"
  - "`_G.score = 12`"
  - "`local score = 12`"
answer: 2
explain: Use `local` to avoid assigning an undeclared name in the global environment.
```
