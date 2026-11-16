---
title: Variable arguments
icon: 🔢
branch: functions
requires:
  - returns
summary: The .
---

The ... expression receives extra arguments. `select("#", ...)` counts all arguments, including trailing or interior `nil` values.

```lua
local function count(...)
  return select("#", ...)
end
print(count(10, nil, 30))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about variable arguments.
lang: lua
code: |-
  local function count(...)
    return select(1, ...)
  end
  print(count(10, nil, 30))
checks:
  - match: select\("\#",\s+\.\.\.\)
    message: Use select("#", ...) for this step.
  - notMatch: select\(1,\s+\.\.\.\)
    message: Replace select(1, ...) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How many arguments does `select("#", 10, nil, 30)` count?
options:
  - "`3`"
  - "`2`"
  - "`1`"
answer: 0
explain: The argument count includes `nil` values.
```
