---
title: Create a coroutine
icon: 🔁
branch: runtime
requires:
  - functions
  - returns
summary: A coroutine starts suspended.
---

A coroutine starts suspended. resume runs it and reports success plus yielded or returned values; it is cooperative execution, not an OS thread.

A useful term here is [[coroutine]]: A cooperatively scheduled execution context that can suspend and resume.

```lua
local worker = coroutine.create(function()
  return 7
end)
local ok, result = coroutine.resume(worker)
print(ok, result)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about create a coroutine.
lang: lua
code: |-
  local worker = coroutine.create(function()
    return 0
  end)
  local ok, result = coroutine.resume(worker)
  print(ok, result)
checks:
  - match: return\s+7
    message: Use return 7 for this step.
  - notMatch: return\s+0
    message: Replace return 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `coroutine.create(worker)` do immediately?
options:
  - Creates a suspended coroutine.
  - Runs `worker` to completion.
  - Starts `worker` on a new OS thread.
answer: 0
explain: "`coroutine.resume` starts or continues its cooperative execution."
```
