---
title: Custom sorting
icon: 🛠️
branch: tables
requires:
  - functions
  - lists
summary: table.sort changes the sequence in place.
---

table.sort changes the sequence in place. Its comparator must describe a strict ordering; using <= breaks that contract.

```lua
local items = {7, 2, 5}
table.sort(items, function(a, b) return a < b end)
print(table.concat(items, ","))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about custom sorting.
lang: lua
code: |-
  local items = {7, 2, 5}
  table.sort(items, function(a, b) return a > b end)
  print(table.concat(items, ","))
checks:
  - match: return\s+a\s+<\s+b
    message: Use return a < b for this step.
  - notMatch: return\s+a\s+>\s+b
    message: Replace return a > b in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about custom sorting is correct?
options:
  - table.sort returns a newly sorted table.
  - A comparator should return true for equal values.
  - table.sort changes the sequence in place. Its comparator must describe a strict ordering; using
    <= breaks that contract.
answer: 2
explain: table.sort changes the sequence in place. Its comparator must describe a strict ordering;
  using <= breaks that contract.
```
