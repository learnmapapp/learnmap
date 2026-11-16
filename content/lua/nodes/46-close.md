---
title: Scoped cleanup
icon: 📦
branch: runtime
requires:
  - files
  - scope
summary: Lua 5.4 to-be-closed locals run their closing method when the scope exits, including error exits.
---

Lua 5.4 to-be-closed locals run their closing method when the scope exits, including error exits. A temporary file avoids overwriting project data.

```lua
local file <close> = assert(io.tmpfile())
file:write("practice\n")
file:seek("set", 0)
print(file:read("l"))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about scoped cleanup.
lang: lua
code: |-
  local file <close> = assert(io.tmpfile())
  file:write("practice\n")
  file:seek("end", 0)
  print(file:read("l"))
checks:
  - match: file:seek\("set",\s+0\)
    message: Use file:seek("set", 0) for this step.
  - notMatch: file:seek\("end",\s+0\)
    message: Replace file:seek("end", 0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When is a Lua 5.4 local marked `<close>` closed?
options:
  - Only if the scope reaches its final statement normally.
  - When control leaves its scope, including on an error.
  - Only during a later garbage-collection cycle.
answer: 1
explain: To-be-closed locals provide deterministic scope-exit cleanup.
```
