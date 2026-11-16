---
title: Numbers and division
icon: 🔢
branch: basics
requires:
  - locals
summary: The / operator performs floating division; // rounds the quotient down, and % returns the
  corresponding remainder.
---

The / operator performs floating division; // rounds the quotient down, and % returns the corresponding remainder.

```lua
local total = 17
print(total / 5, total // 5, total % 5)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about numbers and division.
lang: lua
code: |-
  local total = 17
  print(total / 5, total / 5, total % 5)
checks:
  - match: total\s+/\s+5,\s+total\s+//\s+5
    message: Use total / 5, total // 5 for this step.
  - notMatch: total\s+/\s+5,\s+total\s+/\s+5
    message: Replace total / 5, total / 5 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about numbers and division is correct?
options:
  - The / operator performs floating division; // rounds the quotient down, and % returns the
    corresponding remainder.
  - // rounds toward zero for negative values.
  - Lua has no integer arithmetic.
answer: 0
explain: The / operator performs floating division; // rounds the quotient down, and % returns the
  corresponding remainder.
```
