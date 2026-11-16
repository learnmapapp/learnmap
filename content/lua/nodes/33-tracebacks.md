---
title: Error context
icon: 🧩
branch: runtime
requires:
  - errors
summary: xpcall runs a message handler while the failed stack is still available.
---

xpcall runs a message handler while the failed stack is still available. `debug.traceback` can attach useful call context.

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
question: Why pass `debug.traceback` as the message handler to `xpcall`?
options:
  - To add call-stack context to an error.
  - To retry the failed function automatically.
  - To convert every failed call into a successful result.
answer: 0
explain: The handler can inspect the failed stack before it is unwound.
```
