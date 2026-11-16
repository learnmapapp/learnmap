---
title: Map iteration
icon: 🧩
branch: tables
requires:
  - records
  - numeric-for
summary: pairs visits table entries without a guaranteed order.
---

pairs visits table entries without a guaranteed order. Sort a separate list of keys when stable output matters.

```lua
local scores = {Ada = 8, Lin = 9}
for name, score in pairs(scores) do
  print(name, score)
end
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about map iteration.
lang: lua
code: |-
  local scores = {Ada = 8, Lin = 9}
  for name, score in ipairs(scores) do
    print(name, score)
  end
checks:
  - match: pairs\(scores\)
    message: Use pairs(scores) for this step.
  - notMatch: ipairs\(scores\)
    message: Replace ipairs(scores) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What order should you assume for ordinary `pairs(scores)` iteration?
options:
  - No guaranteed order.
  - Alphabetical order of string keys.
  - The order entries were inserted.
answer: 0
explain: Sort a separate key list if output must have a stable order.
```
