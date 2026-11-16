---
title: Task tracker
icon: "🏁"
branch: runtime
requires: [objects, errors, testing, close]
summary: Build a small to-do tracker that saves to a file, using objects, errors, cleanup and tests.
---
Time to put the course together. You'll build `todo`, a tiny command-line task tracker that remembers tasks between runs:

```repl shell
> lua todo.lua add "Water the plants"
Added #1: Water the plants
> lua todo.lua add "Learn coroutines"
Added #2: Learn coroutines
> lua todo.lua done 1
> lua todo.lua list
[x] 1. Water the plants
[ ] 2. Learn coroutines
> lua todo.lua done 9
error: no task #9
```

Here's how the pieces map to lessons you've done:

| Part | Lesson |
| --- | --- |
| `Task` and `TaskList` classes | [prototype objects](node:objects) |
| one module, required by the CLI and the tests | [modules](node:modules) |
| reading and writing `tasks.txt` safely | [files](node:files), [cleanup](node:close) |
| rejecting bad input | [assertions](node:assertions), [protected calls](node:errors) |
| parsing the saved lines | [patterns](node:patterns) |
| tests | [assertion tests](node:testing) |

**The module.** One file for the logic, with no printing and no command-line handling, so it's easy to test:

```lua title=tasks.lua
local Task = {}
Task.__index = Task

function Task.new(title)
  assert(type(title) == "string" and title:match("%S"), "a task needs a title")
  return setmetatable({ title = title, done = false }, Task)
end

function Task:finish()
  self.done = true
end

function Task:__tostring()
  return (self.done and "[x] " or "[ ] ") .. self.title
end

local TaskList = {}
TaskList.__index = TaskList

function TaskList.new()
  return setmetatable({ items = {} }, TaskList)
end

function TaskList:add(title)
  local task = Task.new(title)
  table.insert(self.items, task)
  return #self.items, task
end

function TaskList:finish(n)
  local task = self.items[n]
  if not task then error("no task #" .. tostring(n), 2) end
  task:finish()
end

function TaskList:save(path)
  local f <close> = assert(io.open(path, "w"))
  for _, task in ipairs(self.items) do
    f:write(task.done and "1" or "0", "\t", task.title, "\n")
  end
end

function TaskList.load(path)
  local list = TaskList.new()
  local f <close> = io.open(path, "r")
  if not f then return list end            -- no file yet: an empty list
  for line in f:lines() do
    local done, title = line:match("^([01])\t(.+)$")
    if done then
      local _, task = list:add(title)
      if done == "1" then task:finish() end
    end
  end
  return list
end

return { Task = Task, TaskList = TaskList }
```

Some details worth a second look:

- `Task:__tostring()` is defined with a colon on the class, so `Task` is its own metatable *and* `print(task)` shows a checkbox and the title, which is handy while debugging.
- `title:match("%S")` rejects titles that are empty or only spaces.
- `load` uses `<close>` on a handle that may be `nil`. That's allowed: `nil` is simply skipped.
- The file format is one task per line: `1` or `0`, a tab, and the title. Simple to read in a text editor, and the pattern `^([01])\t(.+)$` parses it back.

**The command line** is a thin layer on top. Lua puts command-line arguments in the global table `arg`:

```lua title=todo.lua
local tasks = require("tasks")
local FILE = "tasks.txt"
local list = tasks.TaskList.load(FILE)
local command, value = arg[1], arg[2]

local ok, err = pcall(function()
  if command == "add" then
    local n, task = list:add(value)
    print(("Added #%d: %s"):format(n, task.title))
  elseif command == "done" then
    list:finish(tonumber(value))
  elseif command == "list" then
    for i, task in ipairs(list.items) do
      print(("%s %d. %s"):format(task.done and "[x]" or "[ ]", i, task.title))
    end
  else
    error("usage: lua todo.lua add <title> | done <n> | list", 0)
  end
end)

if not ok then
  io.stderr:write("error: ", tostring(err):gsub("^.-:%d+: ", ""), "\n")
  os.exit(1)
end
list:save(FILE)
```

The `gsub` in the error handler strips the `file:line:` prefix, because users don't care which line of `tasks.lua` complained.

**Ideas to take it further:** a `remove` command, due dates (`os.time` and `os.date`), listing only open tasks, or a `__len` metamethod on `TaskList` so `#list` works.

```exercise
goal: "Finish the test file: add a test that checks `finish` on a missing task raises an error, using `pcall`."
code: |-
  local tasks = require("tasks")
  local tests = {}

  tests["add returns the new number"] = function()
    local list = tasks.TaskList.new()
    assert(list:add("one") == 1)
    assert(list:add("two") == 2)
  end

  tests["finishing a missing task fails"] = function()
    local list = tasks.TaskList.new()
  end
checks:
  - match: 'local\s+ok\s*=\s*pcall\(\s*list\.finish\s*,\s*list\s*,\s*\d+\s*\)|local\s+ok\s*=\s*pcall\(\s*function\s*\(\s*\)\s*list:finish\(\s*\d+\s*\)\s*end\s*\)'
    message: Call list:finish with a missing number inside pcall, and store the result in ok.
  - match: 'assert\(\s*not\s+ok'
    message: Then assert(not ok, ...)
solution: |-
  local tasks = require("tasks")
  local tests = {}

  tests["add returns the new number"] = function()
    local list = tasks.TaskList.new()
    assert(list:add("one") == 1)
    assert(list:add("two") == 2)
  end

  tests["finishing a missing task fails"] = function()
    local list = tasks.TaskList.new()
    local ok = pcall(list.finish, list, 99)
    assert(not ok, "expected an error for a missing task")
  end
```

```quiz
question: "Why does `tasks.lua` contain no `print` calls?"
options:
  - Modules aren't allowed to print.
  - Keeping output in todo.lua makes the logic easy to test and reuse.
  - print doesn't work inside methods.
answer: 1
explain: The module returns values and raises errors. The command-line layer decides how to show them.
```
