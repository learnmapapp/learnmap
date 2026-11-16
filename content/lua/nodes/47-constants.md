---
title: Read-only bindings
icon: "🔒"
branch: basics
requires: [locals, scope]
summary: "local x <const> can't be reassigned, and the check happens before the program runs."
---
Lua 5.4 lets you mark a local as **constant** with the attribute `<const>`:

```lua title=physics.lua
local GRAVITY <const> = 9.81
local MAX_SPEED <const> = 50

local speed = 0
for second = 1, 10 do
  speed = math.min(speed + GRAVITY, MAX_SPEED)
end
print(speed)   -- 50
```

Now add `GRAVITY = 10` as line 9, at the very end. The program doesn't even start:

```repl shell
> lua physics.lua
error: lua: physics.lua:9: attempt to assign to const variable 'GRAVITY'
```

That's a **compile-time** error. Lua reads (compiles) the whole file before running any of it, so the mistake is caught even if the bad line is in a branch that rarely runs.

**What `<const>` protects, and what it doesn't.** It protects the *variable*, not the value:

```lua
local COLORS <const> = { "red", "green" }
COLORS[3] = "blue"      -- fine: the table itself can change
COLORS = {}             -- error: the variable can't point elsewhere
```

If you know `const` from JavaScript, it works exactly the same way. To make a table's *contents* read-only, you need a [`__newindex`](node:newindex) guard.

Some practical notes:

- **It only works on locals.** There's no constant global.
- **It's free.** For numbers and strings, Lua may even replace the variable with its value when compiling, so constants are never slower than plain locals.
- **Spelling:** `local x <const> = 1`. The attribute goes after the name, inside angle brackets. You can mix attributes in one statement: `local a <const>, b = 1, 2`, where only `a` is constant.

Should you use it everywhere? Many Lua codebases use it for real constants: configuration numbers, lookup tables, and anything named in `UPPER_CASE`. Others don't use it at all, because older Lua versions (and LuaJIT, which some programs embed) don't support it.

```compare javascript
const GRAVITY = 9.81;   // same rule: the binding is fixed, objects stay mutable
```

```compare rust
const GRAVITY: f64 = 9.81;
```

```compare python
GRAVITY = 9.81   # constant by convention only, nothing enforces it
```

```exercise
goal: "Make `TAX_RATE` a constant with the `<const>` attribute."
code: |-
  local TAX_RATE = 0.21
checks:
  - match: 'local\s+TAX_RATE\s*<const>\s*=\s*0\.21'
    message: Write local TAX_RATE <const> = 0.21
solution: |-
  local TAX_RATE <const> = 0.21
```

```quiz
question: "`local T <const> = {}`. Which line causes an error?"
options:
  - "`T.x = 1`"
  - "`T = { x = 1 }`"
  - Both.
answer: 1
explain: <const> fixes the variable, not the table's contents.
```
