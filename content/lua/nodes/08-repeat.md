---
title: Repeat until
icon: 🔧
branch: flow
requires:
  - while
summary: repeat checks its condition after the body, so the body executes at least once.
---

repeat checks its condition after the body, so the body executes at least once. It stops when the condition becomes `true`.

```lua
local count = 0
repeat
  count = count + 1
until count >= 3
print(count)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about repeat until.
lang: lua
code: |-
  local count = 0
  repeat
    count = count + 1
  until count >= 1
  print(count)
checks:
  - match: count\s+>=\s+3
    message: Use count >= 3 for this step.
  - notMatch: count\s+>=\s+1
    message: Replace count >= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When can `repeat ... until condition` stop?
options:
  - Before its first body execution if `condition` is `true`.
  - After a body execution makes `condition` `false`.
  - After a body execution makes `condition` `true`.
answer: 2
explain: The condition is checked after the body, and `true` ends the loop.
```
