---
title: Return a module
icon: "📦"
branch: design
requires: [functions, records]
summary: A Lua module is just a file that returns a table.
---
Lua's module system has no special syntax at all. A module is a file that ends with `return` and some value, almost always a table of functions. Here's the whole recipe.

**Ingredients:** one file, one local table, one `return`.

```lua title=temperature.lua
local M = {}

local ABSOLUTE_ZERO = -273.15        -- private: not in M

local function check(c)              -- private helper
  assert(c >= ABSOLUTE_ZERO, "below absolute zero")
end

function M.toFahrenheit(c)
  check(c)
  return c * 9 / 5 + 32
end

function M.toKelvin(c)
  check(c)
  return c - ABSOLUTE_ZERO
end

return M
```

**Method:**

1. Start with `local M = {}`. The name `M` is a common convention. Some people use the module's name instead.
2. Add public functions to `M`, written as `function M.name(...)`. That's short for `M.name = function(...)`.
3. Anything declared with `local` and *not* put in `M` is private. Other files can't see `check` or `ABSOLUTE_ZERO`.
4. End with `return M`. What you return is exactly what users of the module get.

**Serving:**

```lua title=main.lua
local temperature = require("temperature")
print(temperature.toFahrenheit(21))   -- 69.8
```

How `require` finds and loads the file is the [next lesson](node:require).

**Why not use globals?** Older Lua code had modules set global variables. It works, but then every module can clash with every other one, and you can't tell where a name came from. With `local temperature = require("temperature")`, every dependency is visible at the top of the file.

Since a module is a plain table, people can also replace or wrap its functions, which is great for testing. Just don't count on the module's private locals being changeable from outside, since they truly aren't.

```compare python
# temperature.py: every top-level name is exported
def to_fahrenheit(c):
    return c * 9 / 5 + 32
```

```compare javascript
// temperature.js
export function toFahrenheit(c) {
  return c * 9 / 5 + 32;
}
```

```compare rust
// temperature.rs
pub fn to_fahrenheit(c: f64) -> f64 { c * 9.0 / 5.0 + 32.0 }
```

```exercise
goal: "Turn this file into a module: put `greet` on a table `M`, and return `M` at the end."
code: |-
  function greet(name)
    return "Hello, " .. name
  end
checks:
  - match: '^local\s+M\s*=\s*\{\s*\}'
    message: Start with local M = {}
  - match: 'function\s+M\.greet\(\s*name\s*\)'
    message: Define the function as function M.greet(name)
  - match: 'return\s+M\s*$'
    message: End the file with return M
solution: |-
  local M = {}

  function M.greet(name)
    return "Hello, " .. name
  end

  return M
```

```quiz
question: "In a module file, how do you keep a helper function private?"
options:
  - Name it starting with an underscore.
  - Declare it as a local and don't add it to the returned table.
  - Mark it with the private keyword.
answer: 1
explain: Only what's in the returned table is visible to other files. Locals stay inside.
```
