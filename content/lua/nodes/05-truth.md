---
title: Truth and nil
icon: "🎭"
branch: basics
requires: [locals]
summary: Only nil and false are falsy, and 'and'/'or' return values, not just booleans.
---
Time for a quick quiz from a JavaScript or Python developer's point of view. Which of these values count as true in a Lua `if`?

`0`, `""`, `{}`, `"false"`, `false`, `nil`

The answer: **everything except `false` and `nil`.** In Lua, `0` is [[truthy]]. The empty string is truthy. An empty table is truthy. There are exactly two falsy values, and that's the whole rule.

```lua title=truth.lua
if 0 then print("0 is true in Lua!") end
if "" then print("so is the empty string") end
if not nil then print("nil is falsy") end
```

[[nil]] is Lua's "nothing". You get it from variables that were never set, from table keys that don't exist, and from functions that don't return anything.

**Comparing.** `==` and the not-equal operator `~=` (tilde, not `!`) work on any values:

```lua
print(1 == 1.0)      -- true
print("1" == 1)      -- false: no conversion when comparing
print(3 ~= 4)        -- true
```

**`and`, `or`, `not`** are words, not symbols. And here's the clever part: `and` and `or` **return one of their operands**, not just `true` or `false`.

| Expression | Returns |
| --- | --- |
| `a or b` | `a` if it's truthy, otherwise `b` |
| `a and b` | `a` if it's falsy, otherwise `b` |

That gives Lua its two favourite idioms:

```lua
local name = input or "stranger"            -- a default
local label = count > 1 and "items" or "item"  -- a mini if/else
```

The second one works as long as the middle value is never `false` or `nil`. `x and false or "yes"` always gives `"yes"`, which catches people out now and then.

```compare javascript
// JS has many falsy values: 0, "", NaN, null, undefined, false.
const name = input || "stranger";
```

```compare python
# Python treats 0, "", [] and {} as false.
name = user_input or "stranger"
```

```compare rust
// Rust only allows real bools in an if; there's no truthiness at all.
```

```exercise
goal: "This check was ported from JavaScript, where 0 is false. In Lua, 0 is true, so the empty case is never reached. Compare with 0 explicitly."
code: |-
  if count then
    print(count .. " messages")
  else
    print("No messages")
  end
checks:
  - match: 'if\s+count\s*>\s*0\s+then'
    message: Write if count > 0 then
solution: |-
  if count > 0 then
    print(count .. " messages")
  else
    print("No messages")
  end
```

```quiz
question: "What does `nil or 0 or 5` evaluate to?"
options:
  - "`5`"
  - "`0`"
  - "`true`"
answer: 1
explain: or returns the first truthy operand. nil is falsy, but 0 is truthy in Lua.
```
