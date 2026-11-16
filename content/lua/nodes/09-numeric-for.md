---
title: Numeric for loops
icon: 🧩
branch: flow
requires:
  - while
summary: A numeric for includes its final bound when the step reaches it.
---

A numeric for includes its final bound when the step reaches it. A third expression supplies a step, including negative steps.

```lua
local total = 0
for n = 1, 5 do
  total = total + n
end
print(total)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about numeric for loops.
lang: lua
code: |-
  local total = 0
  for n = 1, 3 do
    total = total + n
  end
  print(total)
checks:
  - match: for\s+n\s+=\s+1,\s+5
    message: Use for n = 1, 5 for this step.
  - notMatch: for\s+n\s+=\s+1,\s+3
    message: Replace for n = 1, 3 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which values does `for n = 1, 3 do` visit?
options:
  - "`1, 2, 3`"
  - "`1, 2`"
  - "`0, 1, 2`"
answer: 0
explain: A numeric `for` includes the final bound when its step reaches it.
```
