---
title: Grow a sequence
icon: 📦
branch: tables
requires:
  - length
summary: table.insert appends by default; table.remove shifts later sequence elements down.
---

table.insert appends by default; table.remove shifts later sequence elements down. Removing index 1 implements a small queue, but shifts cost time.

```lua
local queue = {"first"}
table.insert(queue, "second")
local nextItem = table.remove(queue, 1)
print(nextItem, #queue)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about grow a sequence.
lang: lua
code: |-
  local queue = {"first"}
  table.insert(queue, "second")
  local nextItem = table.remove(queue, 2)
  print(nextItem, #queue)
checks:
  - match: table\.remove\(queue,\s+1\)
    message: Use table.remove(queue, 1) for this step.
  - notMatch: table\.remove\(queue,\s+2\)
    message: Replace table.remove(queue, 2) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about grow a sequence is correct?
options:
  - table.insert always prepends.
  - table.insert appends by default; table.remove shifts later sequence elements down. Removing
    index 1 implements a small queue, but shifts cost time.
  - Removing an entry leaves an interior nil hole.
answer: 1
explain: table.insert appends by default; table.remove shifts later sequence elements down. Removing
  index 1 implements a small queue, but shifts cost time.
```
