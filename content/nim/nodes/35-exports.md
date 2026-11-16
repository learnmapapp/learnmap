---
title: Public interfaces
icon: 🛠️
branch: design
requires:
  - modules
summary: A trailing * exports a declaration from its module.
---

A trailing * exports a declaration from its module. when isMainModule runs a demonstration only when that file is the entry point.

```nim
proc publicDouble*(n: int): int = n * 2
proc internalOffset(n: int): int = n + 1
when isMainModule:
  echo publicDouble(internalOffset(2))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about public interfaces.
lang: nim
code: |-
  proc publicDouble(n: int): int = n * 2
  proc internalOffset(n: int): int = n + 1
  when isMainModule:
    echo publicDouble(internalOffset(2))
checks:
  - match: proc\s+publicDouble\*\(n:\s+int\)
    message: "Use proc publicDouble*(n: int) for this step."
  - notMatch: proc\s+publicDouble\(n:\s+int\)
    message: "Replace proc publicDouble(n: int) in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about public interfaces is correct?
options:
  - All top-level procedures are exported by default.
  - isMainModule is true in every imported file.
  - A trailing * exports a declaration from its module. when isMainModule runs a demonstration only
    when that file is the entry point.
answer: 2
explain: A trailing * exports a declaration from its module. when isMainModule runs a demonstration
  only when that file is the entry point.
```
