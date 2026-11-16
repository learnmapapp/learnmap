---
title: Prototype objects
icon: 🚦
branch: design
requires:
  - methods
  - index
summary: A prototype table shares methods through __index while each instance keeps its own fields.
---

A prototype table shares methods through __index while each instance keeps its own fields. Lua supplies this pattern through tables, not class syntax.

```lua
local Task = {}
Task.__index = Task
function Task.new(title)
  return setmetatable({title = title, done = false}, Task)
end
function Task:finish() self.done = true end
local task = Task.new("Practice")
task:finish()
print(task.done)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about prototype objects.
lang: lua
code: |-
  local Task = {}
  Task.__index = Task
  function Task.new(title)
    return setmetatable({title = title, done = false}, Task)
  end
  function Task:finish() self.done = false end
  local task = Task.new("Practice")
  task:finish()
  print(task.done)
checks:
  - match: self\.done\s+=\s+true
    message: Use self.done = true for this step.
  - notMatch: self\.done\s+=\s+false
    message: Replace self.done = false in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: In the task prototype pattern, where should each task's `done` value live?
options:
  - In the shared prototype as the only mutable state.
  - In a global named `done`.
  - In the individual instance table.
answer: 2
explain: Instances keep independent fields while sharing methods through `__index`.
```
