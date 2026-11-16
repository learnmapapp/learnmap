---
title: Multiple returns
icon: 🌐
branch: functions
requires:
  - functions
summary: Lua functions can return several values.
---

Lua functions can return several values. Multiple assignment captures them in order, with missing results filled by `nil`.

```lua
local function bounds()
  return 2, 8
end
local low, high = bounds()
print(low, high)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about multiple returns.
lang: lua
code: |-
  local function bounds()
    return 8, 2
  end
  local low, high = bounds()
  print(low, high)
checks:
  - match: return\s+2,\s+8
    message: Use return 2, 8 for this step.
  - notMatch: return\s+8,\s+2
    message: Replace return 8, 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: A function returns `2, 8`. What does `local low, high = bounds()` assign?
options:
  - "`low` is `2`, and `high` is `8`."
  - "`low` is a table, and `high` is `nil`."
  - "`low` is `8`, and `high` is `2`."
answer: 0
explain: Multiple assignment captures returned values in order.
```
