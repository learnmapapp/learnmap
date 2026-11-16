---
title: Local bindings
icon: "🏠"
branch: basics
requires: [lua]
summary: Why every variable should start with local, and what happens when it doesn't.
---
**Predict the output.** What does this print?

```lua title=oops.lua
function setScore()
  score = 10
end

setScore()
print(score)
```

```repl shell
> lua oops.lua
10
```

It prints 10, even though `score` was created inside a function. In Lua, **a variable is global unless you say otherwise**. Assigning to a name that doesn't exist yet creates a global, visible to the entire program, including every library you load.

That's the opposite of what most languages do, and it's the single most common Lua surprise. The fix is one word, **[[local]]**:

```lua
local score = 10
local name, level = "Ada", 3   -- several at once
local nothing                  -- declared, and nil for now
```

A `local` lives only in the block where it's declared: a function, a loop body, an `if` branch, or the file itself. Outside that block, the name doesn't exist.

Why bother?

- **No accidental sharing.** Two functions that both use a global `count` will trample each other's value.
- **Typos become visible.** With globals, `scroe = 11` silently creates a brand-new variable. In a file that only uses locals, a misspelt name stands out as the odd one, and linters like `luacheck` flag it.
- **Speed.** Locals are stored in registers; globals are a table lookup. It's a small win, but it's free.

Reading a variable that was never assigned isn't an error. You just get [[nil]]:

```lua
print(undefinedThing)   -- nil
```

The house rule for the rest of this course, and for real Lua code: **always write `local`**, unless you truly want a global.

```compare javascript
// Like JavaScript before "use strict": assigning an undeclared name made a global.
score = 10;
```

```compare python
# Python is the other way round: assignment inside a function is local by default.
```

```exercise
goal: "Both variables leak out as globals. Make them local."
code: |-
  total = 0
  label = "Total"
checks:
  - match: '^local\s+total\s*=\s*0'
    message: Write local total = 0
  - match: '^local\s+label\s*=\s*"Total"'
    message: Write local label = "Total"
solution: |-
  local total = 0
  local label = "Total"
```

```quiz
question: "In Lua, what does `x = 5` inside a function do, if there's no `local x` anywhere?"
options:
  - It creates a variable local to the function.
  - It creates (or changes) a global variable.
  - It's a syntax error.
answer: 1
explain: Lua variables are global unless declared with local.
```
