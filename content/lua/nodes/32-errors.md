---
title: Protected calls
icon: 🔧
branch: runtime
requires:
  - assertions
  - returns
summary: pcall catches a raised error and returns false plus the error value.
---

pcall catches a raised error and returns false plus the error value. On success it returns true followed by the function results.

A useful term here is [[protected call]]: A function invocation that catches Lua errors and reports success as a return value.

```lua
local ok, result = pcall(function()
  error("invalid task")
end)
print(ok, result)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about protected calls.
lang: lua
code: |-
  local ok, result = pcall(function()
    error("valid task")
  end)
  print(ok, result)
checks:
  - match: error\("invalid\s+task"\)
    message: Use error("invalid task") for this step.
  - notMatch: error\("valid\s+task"\)
    message: Replace error("valid task") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about protected calls is correct?
options:
  - pcall always rethrows the error.
  - pcall returns only a Boolean.
  - pcall catches a raised error and returns false plus the error value. On success it returns true
    followed by the function results.
answer: 2
explain: pcall catches a raised error and returns false plus the error value. On success it returns
  true followed by the function results.
```
