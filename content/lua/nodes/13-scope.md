---
title: Block scope
icon: "📦"
branch: functions
requires: [functions, conditionals]
summary: Every do, then and function body is a block, and locals live and die inside it.
---
**A bug hunt.** This function should report the best score, but it always prints `nil`. Why?

```lua title=best.lua
local function report(scores)
  if #scores > 0 then
    local best = math.max(table.unpack(scores))
  end
  print("Best: " .. tostring(best))
end

report({ 4, 9, 6 })   -- Best: nil
```

`local best` was declared *inside* the `if` block. When the block's `end` is reached, `best` disappears. By the `print` line, `best` refers to a global called `best`, which doesn't exist, so it's `nil`.

The fix is to declare it in the scope where it's used:

```lua
local function report(scores)
  local best
  if #scores > 0 then
    best = math.max(table.unpack(scores))
  end
  print("Best: " .. tostring(best))
end
```

The rule: **a local is visible from its declaration until the end of the innermost block that contains it.** Blocks are:

- a function body
- the body of `if`/`elseif`/`else`, `while`, `for` and `repeat`
- a whole file
- an explicit `do ... end`, which exists purely to create a scope

```lua
do
  local temp = 42
  print(temp)   -- 42
end
print(temp)     -- nil: temp is gone
```

**Shadowing.** An inner local can reuse a name from outside. Inside the block it hides the outer one, and afterwards the outer one is back:

```lua
local x = "outer"
do
  local x = "inner"
  print(x)   -- inner
end
print(x)     -- outer
```

Legal, but confusing in larger code. Tools like `luacheck` warn about it.

(`table.unpack(t)` spreads a list into separate arguments. `tostring` is there because `..` refuses to join `nil`.)

```compare javascript
if (ok) {
  let best = 9;   // let is block-scoped, like Lua's local
}
```

```compare python
if scores:
    best = max(scores)
print(best)   # Python has no block scope: this works (if scores wasn't empty)
```

```exercise
goal: "`message` is declared inside the if, so the print outside can't see it. Declare it with `local message` before the if, and assign it inside."
code: |-
  if hour < 12 then
    local message = "Good morning"
  end
  print(message)
checks:
  - match: '^local\s+message\s*\n\s*if'
    message: Put local message on its own line, before the if.
  - match: '^\s+message\s*=\s*"Good morning"'
    message: Inside the if, assign without local.
solution: |-
  local message
  if hour < 12 then
    message = "Good morning"
  end
  print(message)
```

```quiz
question: "What is a `do ... end` block on its own for?"
options:
  - To run its body twice.
  - To create a new scope, so locals inside it disappear at the end.
  - To catch errors.
answer: 1
explain: A bare do ... end only introduces a block, which limits the lifetime of the locals inside.
```
