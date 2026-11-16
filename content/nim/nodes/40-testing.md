---
title: Unit test suites
icon: 💬
branch: tools
requires:
  - procedures
  - exceptions
summary: std/unittest groups checks into named suites and tests.
---

std/unittest groups checks into named suites and tests. Run a test file with `nim c -r tests.nim` and include boundary inputs.

```nim
import std/unittest
func square(n: int): int = n * n
suite "arithmetic":
  test "squares a positive input":
    check square(3) == 9
  test "handles zero":
    check square(0) == 0
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about unit test suites.
lang: nim
code: |-
  import std/unittest
  func square(n: int): int = n * n
  suite "arithmetic":
    test "squares a positive input":
      check square(3) == 6
    test "handles zero":
      check square(0) == 0
checks:
  - match: square\(3\)\s+==\s+9
    message: Use square(3) == 9 for this step.
  - notMatch: square\(3\)\s+==\s+6
    message: Replace square(3) == 6 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which command compiles and runs the example unit test file?
options:
  - "`nim check tests.nim`"
  - "`nim c -r tests.nim`"
  - "`nim c tests.nim`"
answer: 1
explain: The `-r` flag runs the compiled tests; checking or compiling alone does not execute them.
```
