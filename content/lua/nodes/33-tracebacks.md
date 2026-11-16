---
title: Error context
icon: 🧩
branch: runtime
requires:
  - errors
summary: xpcall runs a message handler while the failed stack is still available.
---

xpcall runs a message handler while the failed stack is still available. debug.traceback can attach useful call context.

```lua
local ok, message = xpcall(function()
  error("failed")
end, debug.traceback)
print(ok, message)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about error context.
lang: lua
code: |-
  local ok, message = xpcall(function()
    error("failed")
  end, tostring)
  print(ok, message)
checks:
  - match: end,\s+debug\.traceback\)
    message: Use end, debug.traceback) for this step.
  - notMatch: end,\s+tostring\)
    message: Replace end, tostring) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about error context is correct?
options:
  - xpcall runs a message handler while the failed stack is still available. debug.traceback can
    attach useful call context.
  - xpcall handlers run only after all stack context is discarded.
  - debug.traceback prevents all errors.
answer: 0
explain: xpcall runs a message handler while the failed stack is still available. debug.traceback
  can attach useful call context.
```
