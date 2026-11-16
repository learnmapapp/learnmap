---
title: Intercept new fields
icon: "🚧"
branch: design
requires: [index]
summary: __newindex runs when a new key is assigned, which is great for catching typos.
---
**A bug hunt.** This code should mark a task as done, but the task stays open:

```lua
local task = { title = "Water plants", done = false }
task.dnoe = true          -- 🙃
print(task.done)          -- false
```

Lua happily created a new field called `dnoe`. No error, no warning. Here's how to make a table that refuses unknown fields.

`__newindex` is `__index`'s counterpart for writing. Lua calls it when you **assign to a key that doesn't exist yet** in the table:

```lua title=strict.lua
local function strict(t)
  return setmetatable(t, {
    __newindex = function(_, key)
      error("unknown field '" .. tostring(key) .. "'", 2)
    end,
  })
end

local task = strict({ title = "Water plants", done = false })
task.done = true      -- fine: done already exists
task.dnoe = true      -- error
```

```repl shell
> lua strict.lua
error: lua: strict.lua:11: unknown field 'dnoe'
```

The level `2` in `error` makes the message point at the line that did the assignment, not at the inside of the handler.

**Storing the value yourself.** Inside `__newindex`, a plain `t[key] = value` would trigger `__newindex` again, forever. Use **`rawset(t, key, value)`**, which writes directly and skips the metatable. Here's a table that logs every new field and then stores it:

```lua
local log = setmetatable({}, {
  __newindex = function(t, key, value)
    print("new field: " .. key)
    rawset(t, key, value)
  end,
})

log.a = 1   -- new field: a
log.a = 2   -- (silent: a exists now, so __newindex isn't called)
```

That second line shows the catch: `__newindex` only fires for **new** keys. To watch *every* write, keep the real data in a separate table and leave the visible one empty, a trick known as a proxy table.

**A classic use: catching accidental globals.** Globals live in a table too (`_G`), so the same trick can catch every misspelled global variable. That's what tools like `strict.lua` do.

```compare javascript
const task = Object.seal({ title: "Water plants", done: false });
task.dnoe = true;   // TypeError in strict mode
```

```compare python
class Task:
    __slots__ = ("title", "done")   # assigning t.dnoe raises AttributeError
```

```exercise
goal: "The handler causes infinite recursion. Store the value with `rawset` instead of assigning it."
code: |-
  setmetatable(store, {
    __newindex = function(t, key, value)
      print("set " .. key)
      t[key] = value
    end,
  })
checks:
  - match: 'rawset\(\s*t\s*,\s*key\s*,\s*value\s*\)'
    message: Write rawset(t, key, value)
  - notMatch: 't\[key\]\s*=\s*value'
    message: Remove the plain assignment.
solution: |-
  setmetatable(store, {
    __newindex = function(t, key, value)
      print("set " .. key)
      rawset(t, key, value)
    end,
  })
```

```quiz
question: When is __newindex called?
options:
  - On every assignment to the table.
  - Only when assigning to a key that doesn't exist yet.
  - Only when assigning nil.
answer: 1
explain: Updating an existing key writes directly. That's why proxies keep the real data elsewhere.
```
