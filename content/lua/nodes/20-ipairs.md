---
title: Ordered iteration
icon: 🔧
branch: tables
requires:
  - lists
  - numeric-for
summary: ipairs visits integer keys from 1 upward and stops at the first absent index.
---

ipairs visits integer keys from 1 upward and stops at the first absent index. Use it for contiguous sequences.

```lua
local colors = {"red", "blue"}
for index, color in ipairs(colors) do
  print(index, color)
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about ordered iteration.
lang: lua
code: |-
  local colors = {"red", "blue"}
  for index, color in pairs(colors) do
    print(index, color)
  end
checks:
  - match: ipairs\(colors\)
    message: Use ipairs(colors) for this step.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about ordered iteration is correct?
options:
  - ipairs visits every string key.
  - ipairs continues past holes automatically.
  - ipairs visits integer keys from 1 upward and stops at the first absent index. Use it for
    contiguous sequences.
answer: 2
explain: ipairs visits integer keys from 1 upward and stops at the first absent index. Use it for
  contiguous sequences.
```
