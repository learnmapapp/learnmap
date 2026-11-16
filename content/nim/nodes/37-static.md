---
title: Compile-time checks
icon: 🧪
branch: design
requires:
  - constants
  - functions
summary: A static block executes during compilation.
---

A static block executes during compilation. It can reject violated invariants before the program runs.

```nim
func square(n: int): int = n * n
static:
  doAssert square(4) == 16
echo square(5)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time checks.
lang: nim
code: |-
  func square(n: int): int = n * n
  static:
    doAssert square(4) == 8
  echo square(5)
checks:
  - match: square\(4\)\s+==\s+16
    message: Use square(4) == 16 for this step.
  - notMatch: square\(4\)\s+==\s+8
    message: Replace square(4) == 8 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What happens if a `doAssert` in a `static` block fails?
options:
  - The check is silently skipped in all builds.
  - Compilation fails.
  - The check waits until normal program startup.
answer: 1
explain: A static block executes while compiling.
```
