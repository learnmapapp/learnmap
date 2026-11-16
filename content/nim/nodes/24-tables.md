---
title: Keyed tables
icon: 🌐
branch: data
requires:
  - strings
summary: Table maps typed keys to typed values.
---

Table maps typed keys to typed values. getOrDefault handles absence explicitly without raising a missing-key error.

```nim
import std/tables
var counts = initTable[string, int]()
counts["Nim"] = 2
echo counts.getOrDefault("Lua", 0)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about keyed tables.
lang: nim
code: |-
  import std/tables
  var counts = initTable[string, int]()
  counts["Nim"] = 2
  echo counts.getOrDefault("Lua", 1)
checks:
  - match: getOrDefault\("Lua",\s+0\)
    message: Use getOrDefault("Lua", 0) for this step.
  - notMatch: getOrDefault\("Lua",\s+1\)
    message: Replace getOrDefault("Lua", 1) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about keyed tables is correct?
options:
  - Table maps typed keys to typed values. getOrDefault handles absence explicitly without raising a
    missing-key error.
  - Every missing table key automatically stores zero.
  - Table iteration is guaranteed to be sorted.
answer: 0
explain: Table maps typed keys to typed values. getOrDefault handles absence explicitly without
  raising a missing-key error.
```
