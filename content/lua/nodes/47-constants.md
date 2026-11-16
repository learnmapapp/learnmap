---
title: Read-only bindings
icon: 🛠️
branch: basics
requires:
  - locals
  - scope
summary: Lua 5.4 <const> prevents reassignment of a local binding.
---

Lua 5.4 `<const>` prevents reassignment of a local binding. It does not freeze the contents of a table stored in that binding.

```lua
local limit <const> = 5
for n = 1, limit do print(n) end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about read-only bindings.
lang: lua
code: |-
  local limit <const> = 2
  for n = 1, limit do print(n) end
checks:
  - match: limit\s+<const>\s+=\s+5
    message: Use limit <const> = 5 for this step.
  - notMatch: limit\s+<const>\s+=\s+2
    message: Replace limit <const> = 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: For `local t <const> = {}`, which operation is allowed?
options:
  - Rebinding `t = {name = "Ada"}`.
  - Rebinding `t = nil`.
  - Assigning `t.name = "Ada"`.
answer: 2
explain: "`<const>` protects the binding, not the contents of the referenced table."
```
