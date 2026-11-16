---
title: Inspect syntax trees
icon: 🔢
branch: design
requires:
  - templates
summary: Macros receive and return syntax trees at compile time.
---

Macros receive and return syntax trees at compile time. This inspection macro prints a tree and returns the original program unchanged.

A useful term here is [[macro]]: A compile-time transformation that inspects or constructs Nim syntax trees.

```nim
import std/macros
macro showTree(body: untyped): untyped =
  echo body.treeRepr
  result = body
showTree:
  echo 1 + 2
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about inspect syntax trees.
lang: nim
code: |-
  import std/macros
  macro showTree(body: untyped): untyped =
    echo body.treeRepr
    result = newEmptyNode()
  showTree:
    echo 1 + 2
checks:
  - match: result\s+=\s+body
    message: Use result = body for this step.
  - notMatch: result\s+=\s+newEmptyNode\(\)
    message: Replace result = newEmptyNode() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about inspect syntax trees is correct?
options:
  - Macros receive and return syntax trees at compile time. This inspection macro prints a tree and
    returns the original program unchanged.
  - Macros receive only already-executed runtime values.
  - A macro must return a string of source text.
answer: 0
explain: Macros receive and return syntax trees at compile time. This inspection macro prints a tree
  and returns the original program unchanged.
```
