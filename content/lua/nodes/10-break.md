---
title: Exit a loop
icon: 📦
branch: flow
requires:
  - numeric-for
summary: break exits the innermost loop.
---

break exits the innermost loop. This example prints 1 through 3 because the exit happens before print.

```lua
for n = 1, 10 do
  if n == 4 then break end
  print(n)
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about exit a loop.
lang: lua
code: |-
  for n = 1, 10 do
    if n == 8 then break end
    print(n)
  end
checks:
  - match: n\s+==\s+4
    message: Use n == 4 for this step.
  - notMatch: n\s+==\s+8
    message: Replace n == 8 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about exit a loop is correct?
options:
  - break skips only the current print and resumes the loop.
  - break exits the innermost loop. This example prints 1 through 3 because the exit happens before
    print.
  - break exits the whole program.
answer: 1
explain: break exits the innermost loop. This example prints 1 through 3 because the exit happens
  before print.
```
