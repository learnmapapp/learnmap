---
title: Replace matches
icon: 🚦
branch: text
requires:
  - patterns
  - returns
summary: string.gsub returns both the transformed string and replacement count.
---

`string.gsub` returns both the transformed string and replacement count. The original string remains unchanged.

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
question: What are the results of `string.gsub("a-b-c", "-", "/")`?
options:
  - '`"a/b/c"` and `3`.'
  - '`"a/b-c"` and `1`.'
  - '`"a/b/c"` and `2`.'
answer: 2
explain: "`gsub` returns the new string and the number of replacements."
```
