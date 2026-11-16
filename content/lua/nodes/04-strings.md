---
title: Quoted strings
icon: 💬
branch: basics
requires:
  - locals
summary: Concatenate strings with two dots.
---

Concatenate strings with two dots. Strings are immutable byte sequences, so concatenation produces a new value.

A useful term here is [[concatenation]]: Combining strings into a new string with the .. operator.

```lua
local name = "Ada"
print("Hello, " .. name)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about quoted strings.
lang: lua
code: |-
  local name = "Ada"
  print("Hello, " + name)
checks:
  - match: '"Hello,\s+"\s+\.\.\s+name'
    message: Use "Hello, " .. name for this step.
  - notMatch: '"Hello,\s+"\s+\+\s+name'
    message: Replace "Hello, " + name in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about quoted strings is correct?
options:
  - String indices can be assigned directly.
  - Concatenate strings with two dots. Strings are immutable byte sequences, so concatenation
    produces a new value.
  - The + operator joins strings.
answer: 1
explain: Concatenate strings with two dots. Strings are immutable byte sequences, so concatenation
  produces a new value.
```
