---
title: Scoped cleanup
icon: "🧹"
branch: runtime
requires: [files, scope]
summary: "local x <close> closes a resource automatically when the scope ends, even on errors."
---
**Spot the leak.**

```lua
local function firstLine(path)
  local f = assert(io.open(path))
  local line = f:read("l")
  if not line then
    return nil          -- 💧 f is never closed
  end
  local value = tonumber(line)   -- 💧 and what if a later step raises an error?
  f:close()
  return value
end
```

Every early `return`, and every error, needs its own `f:close()`. Easy to forget, and the more paths a function has, the worse it gets.

Lua 5.4 has a solution: **to-be-closed variables**. Mark a local with `<close>`, and Lua closes it automatically when the variable goes out of scope, however that happens:

```lua title=firstline.lua
local function firstLine(path)
  local f <close> = assert(io.open(path))
  local line = f:read("l")
  if not line then
    return nil          -- f is closed here
  end
  return tonumber(line) -- and here
end                     -- and if an error escapes, too
```

Any `return`, the end of the block, a `break`, or an error all trigger the cleanup. It's the same idea as `with` in Python, `using` in C#, or `defer` in Go and Zig.

**How does Lua know what "closing" means?** It calls the value's `__close` [metamethod](node:metatables). Files already have one. For your own resources, add it yourself:

```lua
local function timer(label)
  local start = os.clock()
  return setmetatable({}, {
    __close = function()
      print(("%s took %.3fs"):format(label, os.clock() - start))
    end,
  })
end

do
  local _ <close> = timer("loading")
  loadEverything()
end   -- loading took 0.412s
```

Rules to know:

- The value must have a `__close` metamethod, or be `nil` or `false` (which are skipped). Anything else is an error.
- Several `<close>` variables in a scope are closed in reverse order, last declared first.
- The variable is also read-only, like [`<const>`](node:constants). You can't reassign it.
- `__close` receives the value and, if the scope is exiting because of an error, that error object.

```compare python
with open(path) as f:
    line = f.readline()
```

```compare javascript
// JS has a newer `using` declaration that works the same way:
using file = openFile(path);
```

```compare rust
// Rust runs Drop automatically at the end of every scope
let f = File::open(path)?;
```

```exercise
goal: "Make the handle close automatically, with `<close>`, and remove the manual `close` call."
code: |-
  local f = assert(io.open("settings.ini"))
  local text = f:read("a")
  f:close()
checks:
  - match: 'local\s+f\s*<close>\s*=\s*assert\(\s*io\.open\('
    message: Write local f <close> = assert(io.open(...))
  - notMatch: 'f:close\(\)'
    message: Remove f:close(); <close> handles it.
solution: |-
  local f <close> = assert(io.open("settings.ini"))
  local text = f:read("a")
```

```quiz
question: "A function has `local f <close> = ...` and raises an error halfway. What happens to `f`?"
options:
  - It stays open until garbage collection.
  - It's closed while the error leaves the scope.
  - The error is swallowed.
answer: 1
explain: to-be-closed variables are closed on every way out of the scope, including errors. The error still propagates.
```
