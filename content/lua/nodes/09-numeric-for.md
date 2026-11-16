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
question: Which statement about numeric for loops is correct?
options:
  - A numeric for includes its final bound when the step reaches it. A third expression supplies a
    step, including negative steps.
  - The upper bound is always excluded.
  - Numeric for only counts downward.
answer: 0
explain: A numeric for includes its final bound when the step reaches it. A third expression
  supplies a step, including negative steps.
```
