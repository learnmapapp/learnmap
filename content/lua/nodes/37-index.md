---
title: Fallback lookup
icon: "🪜"
branch: design
requires: [metatables]
summary: __index answers when a key is missing, with a table or a function.
---
**Two versions of the same settings code.**

Before: every lookup needs its own fallback.

```lua
local user = { theme = "dark" }
local theme = user.theme or "light"
local fontSize = user.fontSize or 14
local language = user.language or "en"
-- and so on, in every file that reads a setting...
```

After: the defaults live in one place, and `__index` connects them.

```lua title=settings.lua
local defaults = { theme = "light", fontSize = 14, language = "en" }
local user = setmetatable({ theme = "dark" }, { __index = defaults })

print(user.theme)      -- dark: user has its own
print(user.fontSize)   -- 14: missing, so Lua asks defaults
print(user.color)      -- nil: missing in both
```

The rule: when you read a key that **doesn't exist** in a table, Lua checks the metatable for `__index`. Keys that exist are returned directly; `__index` is never involved.

`__index` can be two things:

**A table.** Lua looks the key up there instead, as above. If *that* table has its own metatable with `__index`, the lookup continues, so you can build chains: user settings → team settings → defaults. This chaining is exactly how [prototype objects](node:objects) find their methods.

**A function.** It's called with the table and the missing key, and whatever it returns is the result. Great for computed or lazy values:

```lua
local squares = setmetatable({}, {
  __index = function(t, n)
    print("computing " .. n)
    t[n] = n * n          -- store it, so next time it's a normal key
    return n * n
  end,
})

print(squares[12])   -- computing 12, then 144
print(squares[12])   -- 144: no computing this time
```

**Bypassing it.** `rawget(t, key)` reads only the table itself, ignoring `__index`. Useful when you need to know whether the user set a value or it came from the defaults.

Writing is not affected: `user.fontSize = 18` stores 18 in `user`, and `defaults` stays the same.

```compare python
from collections import ChainMap
settings = ChainMap({"theme": "dark"}, defaults)
```

```compare javascript
const user = Object.create(defaults);   // prototype chain, the same idea
user.theme = "dark";
```

```exercise
goal: "Make `config` fall back to `defaults` for missing keys, using a metatable with `__index`."
code: |-
  local defaults = { port = 8080, host = "localhost" }
  local config = { port = 3000 }
checks:
  - match: 'setmetatable\(\s*\{\s*port\s*=\s*3000\s*\}\s*,\s*\{\s*__index\s*=\s*defaults\s*\}\s*\)|setmetatable\(\s*config\s*,\s*\{\s*__index\s*=\s*defaults\s*\}\s*\)'
    message: "Attach { __index = defaults } with setmetatable."
solution: |-
  local defaults = { port = 8080, host = "localhost" }
  local config = setmetatable({ port = 3000 }, { __index = defaults })
```

```quiz
question: "`t` has `name = \"x\"` and a metatable whose `__index` has `name = \"y\"`. What is `t.name`?"
options:
  - "\"x\""
  - "\"y\""
  - "It depends on the order they were created."
answer: 0
explain: __index is only consulted when the key is missing. t has its own name.
```
