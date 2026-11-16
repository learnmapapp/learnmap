---
title: While loops
icon: 📋
branch: flow
requires:
  - conditionals
summary: A while loop checks its condition before each iteration.
---

A while loop checks its condition before each iteration. Update the value that controls termination.

```lua
local count = 0
while count < 3 do
  count = count + 1
end
print(count)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about while loops.
lang: lua
code: |-
  local count = 0
  while count < 1 do
    count = count + 1
  end
  print(count)
checks:
  - match: count\s+<\s+3
    message: Use count < 3 for this step.
  - notMatch: count\s+<\s+1
    message: Replace count < 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about while loops is correct?
options:
  - The condition is checked only after the loop.
  - A while loop checks its condition before each iteration. Update the value that controls
    termination.
  - The body always runs once.
answer: 1
explain: A while loop checks its condition before each iteration. Update the value that controls
  termination.
```
