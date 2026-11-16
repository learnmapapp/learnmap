---
title: Return a module
icon: 📦
branch: design
requires:
  - functions
  - records
summary: A common module convention collects public functions in a local table and returns it.
---

A common module convention collects public functions in a local table and returns it. Private locals stay outside that returned API.

A useful term here is [[module]]: A reusable chunk loaded by require, commonly returning a table of public operations.

```lua
-- greetings.lua
local M = {}
function M.hello(name)
  return "Hello, " .. name
end
return M
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about return a module.
lang: lua
code: |-
  -- greetings.lua
  local M = {}
  function M.hello(name)
    return "Hello, " .. name
  end
  return nil
checks:
  - match: return\s+M
    message: Use return M for this step.
  - notMatch: return\s+nil
    message: Replace return nil in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about return a module is correct?
options:
  - Module return values must be strings.
  - A common module convention collects public functions in a local table and returns it. Private
    locals stay outside that returned API.
  - Every module must put its API in globals.
answer: 1
explain: A common module convention collects public functions in a local table and returns it.
  Private locals stay outside that returned API.
```
