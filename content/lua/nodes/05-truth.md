---
title: Truth and nil
icon: 🚦
branch: basics
requires:
  - locals
summary: Only false and nil are falsey in Lua; zero and the empty string are truthy.
---

Only `false` and `nil` are falsey in Lua; zero and the empty string are truthy. The or operator returns an operand.

A useful term here is [[nil]]: The value representing absence; assigning it to a table key removes that entry.

```lua
local enabled = false
local name = nil
print(enabled or "fallback", name == nil)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about truth and `nil`.
lang: lua
code: |-
  local enabled = true
  local name = nil
  print(enabled or "fallback", name == nil)
checks:
  - match: local\s+enabled\s+=\s+false
    message: Use local enabled = false for this step.
  - notMatch: local\s+enabled\s+=\s+true
    message: Replace local enabled = true in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which Lua value makes an `if` condition `false`?
options:
  - "`0`"
  - '`""`'
  - "`nil`"
answer: 2
explain: Only `nil` and `false` are falsey; zero and empty strings are truthy.
```
