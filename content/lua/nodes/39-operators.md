---
title: Custom addition
icon: 🔢
branch: design
requires:
  - metatables
  - functions
summary: The __add metamethod defines addition for these vector tables.
---

The __add metamethod defines addition for these vector tables. Return another vector to preserve behavior for later operations.

```lua
local Vector = {}
Vector.__index = Vector
function Vector.__add(a, b)
  return setmetatable({x = a.x + b.x}, Vector)
end
local a = setmetatable({x = 2}, Vector)
local b = setmetatable({x = 3}, Vector)
print((a + b).x)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about custom addition.
lang: lua
code: |-
  local Vector = {}
  Vector.__index = Vector
  function Vector.__add(a, b)
    return setmetatable({x = a.x - b.x}, Vector)
  end
  local a = setmetatable({x = 2}, Vector)
  local b = setmetatable({x = 3}, Vector)
  print((a + b).x)
checks:
  - match: a\.x\s+\+\s+b\.x
    message: Use a.x + b.x for this step.
  - notMatch: a\.x\s+\-\s+b\.x
    message: Replace a.x - b.x in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which metamethod defines `a + b` for the vector tables in this lesson?
options:
  - "`__add`"
  - "`__index`"
  - "`__call`"
answer: 0
explain: "`__add` implements addition; lookup and function-call behavior have different hooks."
```
