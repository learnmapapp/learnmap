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
question: Which statement about map iteration is correct?
options:
  - pairs visits table entries without a guaranteed order. Sort a separate list of keys when stable
    output matters.
  - pairs guarantees insertion order.
  - pairs sorts keys alphabetically.
answer: 0
explain: pairs visits table entries without a guaranteed order. Sort a separate list of keys when
  stable output matters.
```
