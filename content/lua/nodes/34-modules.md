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
question: In the module pattern `local M = {}; ...; return M`, what is exported?
options:
  - Only functions whose names start with an underscore.
  - The table returned as `M`.
  - Every local declared in the file.
answer: 1
explain: The returned table defines the public API; other locals can remain private.
```
