---
title: Task tracker
icon: 🏷️
branch: runtime
requires:
  - objects
  - errors
  - testing
  - close
summary: Separate task validation, state changes, and display.
---

Separate task validation, state changes, and display. Extend this tracker with a module, a persistence format, and tests for invalid titles before adding features.

```lua
local Task = {}
Task.__index = Task
function Task.new(title)
  assert(type(title) == "string" and #title > 0, "title required")
  return setmetatable({title = title, done = false}, Task)
end
function Task:finish() self.done = true end
local tasks = {Task.new("Learn Lua")}
tasks[1]:finish()
assert(tasks[1].done)
for _, task in ipairs(tasks) do
  print(task.done and "[x]" or "[ ]", task.title)
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about task tracker.
lang: lua
code: |-
  local Task = {}
  Task.__index = Task
  function Task.new(title)
    assert(type(title) == "string" and #title > 0, "title required")
    return setmetatable({title = title, done = false}, Task)
  end
  function Task:finish() self.done = true end
  local tasks = {Task.new("Learn Lua")}
  tasks[1].done = false
  assert(tasks[1].done)
  for _, task in ipairs(tasks) do
    print(task.done and "[x]" or "[ ]", task.title)
  end
checks:
  - match: tasks\[1\]:finish\(\)
    message: Use tasks[1]:finish() for this step.
  - notMatch: tasks\[1\]\.done\s+=\s+false
    message: Replace tasks[1].done = false in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How should the tracker reject an empty task title?
options:
  - Wait until the title is printed.
  - Mark every empty-title task complete automatically.
  - Validate it in `Task.new` before creating a usable task.
answer: 2
explain: Keep domain validation at construction so later operations receive valid tasks.
```
