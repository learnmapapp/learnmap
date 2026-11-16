---
title: Attach behavior
icon: 🌐
branch: design
requires:
  - records
summary: A metatable can customize selected operations through specially named fields.
---

A metatable can customize selected operations through specially named fields. Ordinary fields such as label do not change behavior by themselves.

A useful term here is [[metatable]]: A table that supplies metamethods to customize operations on another value.

```lua
local value = {}
local meta = {label = "task"}
setmetatable(value, meta)
print(getmetatable(value).label)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about attach behavior.
lang: lua
code: |-
  local value = {}
  local meta = {label = "task"}
  setmetatable(value, {})
  print(getmetatable(value).label)
checks:
  - match: setmetatable\(value,\s+meta\)
    message: Use setmetatable(value, meta) for this step.
  - notMatch: setmetatable\(value,\s+\{\}\)
    message: Replace setmetatable(value, {}) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about attach behavior is correct?
options:
  - A metatable can customize selected operations through specially named fields. Ordinary fields
    such as label do not change behavior by themselves.
  - Every metatable field is a metamethod.
  - Attaching a metatable copies all fields into the value.
answer: 0
explain: A metatable can customize selected operations through specially named fields. Ordinary
  fields such as label do not change behavior by themselves.
```
