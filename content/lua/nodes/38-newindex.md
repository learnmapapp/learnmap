---
title: Intercept new fields
icon: 🏷️
branch: design
requires:
  - index
summary: __newindex handles assignments to absent keys.
---

__newindex handles assignments to absent keys. rawset bypasses this mechanism; existing keys are assigned directly.

```lua
local data = {}
local proxy = setmetatable({}, {
  __newindex = function(_, key, value)
    data[key] = value
  end
})
proxy.name = "Ada"
print(data.name)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about intercept new fields.
lang: lua
code: |-
  local data = {}
  local proxy = setmetatable({}, {
    __newindex = function(_, key, value)
      data[key] = nil
    end
  })
  proxy.name = "Ada"
  print(data.name)
checks:
  - match: data\[key\]\s+=\s+value
    message: Use data[key] = value for this step.
  - notMatch: data\[key\]\s+=\s+nil
    message: Replace data[key] = nil in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about intercept new fields is correct?
options:
  - __newindex intercepts every assignment even to existing keys.
  - Calling rawset triggers __newindex again.
  - __newindex handles assignments to absent keys. rawset bypasses this mechanism; existing keys are
    assigned directly.
answer: 2
explain: __newindex handles assignments to absent keys. rawset bypasses this mechanism; existing
  keys are assigned directly.
```
