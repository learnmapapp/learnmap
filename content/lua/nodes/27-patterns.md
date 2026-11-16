---
title: Find a pattern
icon: 🔢
branch: text
requires:
  - substrings
summary: Lua patterns use % classes, such as %d for digits.
---

Lua patterns use % classes, such as %d for digits. They are a smaller pattern language than regular expressions.

A useful term here is [[pattern]]: Lua’s built-in string matching language, using classes and repetition operators.

```lua
local text = "task-42"
local digits = string.match(text, "%d+")
print(digits)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about find a pattern.
lang: lua
code: |-
  local text = "task-42"
  local digits = string.match(text, "%a+")
  print(digits)
checks:
  - match: '"%d\+"'
    message: Use "%d+" for this step.
  - notMatch: '"%a\+"'
    message: Replace "%a+" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which Lua pattern matches one or more digits?
options:
  - '`"%d+"`'
  - '`"%a+"`'
  - '`"%s+"`'
answer: 0
explain: "`%d` matches digits; `%a` matches letters and `%s` matches whitespace."
```
