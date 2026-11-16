---
title: Fallback lookup
icon: 🧪
branch: design
requires:
  - metatables
summary: When a normal lookup finds no key, __index can supply fallback fields from another table or
  a function.
---

When a normal lookup finds no key, __index can supply fallback fields from another table or a function.

```lua
local defaults = {color = "blue"}
local item = setmetatable({}, {__index = defaults})
print(item.color)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about fallback lookup.
lang: lua
code: |-
  local defaults = {color = "blue"}
  local item = setmetatable({}, {__index = {}})
  print(item.color)
checks:
  - match: __index\s+=\s+defaults
    message: Use __index = defaults for this step.
  - notMatch: __index\s+=\s+\{\}
    message: Replace __index = {} in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When does a table-valued `__index` supply a fallback field?
options:
  - Only when assigning a new key.
  - When the original table does not contain that key.
  - Whenever the original table contains that key.
answer: 1
explain: An ordinary successful lookup takes precedence over the fallback.
```
