---
title: Join a sequence
icon: 🌐
branch: text
requires:
  - lists
  - strings
summary: table.concat joins a sequence of strings or numbers with an optional separator.
---

`table.concat` joins a sequence of strings or numbers with an optional separator. It avoids repeated concatenation inside a loop.

```lua
local parts = {"learn", "Lua", "today"}
print(table.concat(parts, " "))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about join a sequence.
lang: lua
code: |-
  local parts = {"learn", "Lua", "today"}
  print(table.concat(parts, ""))
checks:
  - match: table\.concat\(parts,\s+"\s+"\)
    message: Use table.concat(parts, " ") for this step.
  - notMatch: table\.concat\(parts,\s+""\)
    message: Replace table.concat(parts, "") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What is `table.concat({"learn", "Lua"}, " ")`?
options:
  - '`"learn Lua"`'
  - '`"learnLua"`'
  - '`"learn Lua "`'
answer: 0
explain: The separator appears between items, not after the final item.
```
