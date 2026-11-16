---
title: Slice bytes
icon: 🏷️
branch: text
requires:
  - strings
summary: string.sub uses inclusive byte positions, with negative positions counting from the end.
---

`string.sub` uses inclusive byte positions, with negative positions counting from the end. Byte slicing can split a UTF-8 character.

```lua
local text = "learn.lua"
print(string.sub(text, 1, 5), string.sub(text, -3))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about slice bytes.
lang: lua
code: |-
  local text = "learn.lua"
  print(string.sub(text, 1, 4), string.sub(text, -3))
checks:
  - match: string\.sub\(text,\s+1,\s+5\)
    message: Use string.sub(text, 1, 5) for this step.
  - notMatch: string\.sub\(text,\s+1,\s+4\)
    message: Replace string.sub(text, 1, 4) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `string.sub("learn.lua", 1, 5)` return?
options:
  - '`"lear"`'
  - '`"earn."`'
  - '`"learn"`'
answer: 2
explain: Lua substring positions are byte-based and include both specified endpoints.
```
