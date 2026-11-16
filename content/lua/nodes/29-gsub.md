---
title: Replace matches
icon: 🚦
branch: text
requires:
  - patterns
  - returns
summary: string.gsub returns both the transformed string and replacement count.
---

string.gsub returns both the transformed string and replacement count. The original string remains unchanged.

```lua
local result, count = string.gsub("a-b-c", "-", "/")
print(result, count)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about replace matches.
lang: lua
code: |-
  local result, count = string.gsub("a-b-c", "-", ":")
  print(result, count)
checks:
  - match: '"\-",\s+"/"'
    message: Use "-", "/" for this step.
  - notMatch: '"\-",\s+":"'
    message: Replace "-", ":" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about replace matches is correct?
options:
  - gsub mutates the original string.
  - gsub can never return a count.
  - string.gsub returns both the transformed string and replacement count. The original string
    remains unchanged.
answer: 2
explain: string.gsub returns both the transformed string and replacement count. The original string
  remains unchanged.
```
