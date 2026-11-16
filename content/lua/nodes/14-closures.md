---
title: Captured state
icon: 🏷️
branch: functions
requires:
  - scope
summary: A closure retains access to locals from its enclosing function.
---

A closure retains access to locals from its enclosing function. Each call to counter creates a separate captured value.

A useful term here is [[closure]]: A function together with the surrounding local bindings it captures.

```lua
local function counter()
  local value = 0
  return function()
    value = value + 1
    return value
  end
end
local nextCount = counter()
print(nextCount(), nextCount())
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about captured state.
lang: lua
code: |-
  local function counter()
    local value = 0
    return function()
      value = value + 2
      return value
    end
  end
  local nextCount = counter()
  print(nextCount(), nextCount())
checks:
  - match: value\s+=\s+value\s+\+\s+1
    message: Use value = value + 1 for this step.
  - notMatch: value\s+=\s+value\s+\+\s+2
    message: Replace value = value + 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Two functions returned by separate calls to `counter()` capture a local `value`. What
  state do they use?
options:
  - One shared global `value`.
  - A new zero value on every increment call.
  - A separate captured `value` for each counter.
answer: 2
explain: Each call to the factory creates a new local retained by its closure.
```
