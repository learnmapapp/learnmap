---
title: Load a module
icon: 🛠️
branch: design
requires:
  - modules
summary: require finds modules through Lua loaders and caches loaded values in package.loaded.
---

require finds modules through Lua loaders and caches loaded values in `package.loaded`. Use dotted module names rather than hard-coded source paths.

```lua
local mathlib = require("math")
print(mathlib.floor(3.8))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about load a module.
lang: lua
code: |-
  local mathlib = require("math")
  print(mathlib.ceil(3.8))
checks:
  - match: mathlib\.floor\(3\.8\)
    message: Use mathlib.floor(3.8) for this step.
  - notMatch: mathlib\.ceil\(3\.8\)
    message: Replace mathlib.ceil(3.8) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What normally happens when `require` loads the same module again?
options:
  - It executes the source from scratch every time.
  - It returns a fresh empty table every time.
  - It reuses the cached value from `package.loaded`.
answer: 2
explain: Lua caches loaded modules unless that cache is deliberately changed.
```
