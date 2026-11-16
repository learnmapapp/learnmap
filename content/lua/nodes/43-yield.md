---
title: Suspend and resume
icon: 📋
branch: runtime
requires:
  - coroutines
summary: yield returns control to the resumer.
---

yield returns control to the resumer. The next successful resume continues after the yield rather than restarting the function.

```lua
local worker = coroutine.create(function()
  coroutine.yield("first")
  return "last"
end)
print(coroutine.resume(worker))
print(coroutine.resume(worker))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about suspend and resume.
lang: lua
code: |-
  local worker = coroutine.create(function()
    coroutine.yield("skip")
    return "last"
  end)
  print(coroutine.resume(worker))
  print(coroutine.resume(worker))
checks:
  - match: coroutine\.yield\("first"\)
    message: Use coroutine.yield("first") for this step.
  - notMatch: coroutine\.yield\("skip"\)
    message: Replace coroutine.yield("skip") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about suspend and resume is correct?
options:
  - yield permanently destroys the coroutine.
  - yield returns control to the resumer. The next successful resume continues after the yield
    rather than restarting the function.
  - resume always restarts at the first statement.
answer: 1
explain: yield returns control to the resumer. The next successful resume continues after the yield
  rather than restarting the function.
```
