---
title: Choose a branch
icon: 🔁
branch: flow
requires:
  - truth
  - numbers
summary: An if chain runs the first branch whose condition is truthy.
---

An if chain runs the first branch whose condition is truthy. elseif belongs to the same chain.

```lua
local score = 75
if score >= 70 then
  print("pass")
elseif score >= 50 then
  print("retry")
else
  print("practice")
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about choose a branch.
lang: lua
code: |-
  local score = 75
  if score >= 80 then
    print("pass")
  elseif score >= 50 then
    print("retry")
  else
    print("practice")
  end
checks:
  - match: score\s+>=\s+70
    message: Use score >= 70 for this step.
  - notMatch: score\s+>=\s+80
    message: Replace score >= 80 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Two conditions in one `if`/`elseif` chain are `true`. Which bodies run?
options:
  - Only the first matching body.
  - Both matching bodies.
  - Only the final matching body.
answer: 0
explain: Lua stops selecting branches after the first truthy condition.
```
