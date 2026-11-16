---
title: Format source
icon: 🛠️
branch: tools
requires:
  - zig
summary: zig fmt applies the standard formatting style; --check verifies formatting without
  rewriting the file.
---

zig fmt applies the standard formatting style; --check verifies formatting without rewriting the file. Use the check form in CI.

```shell
zig fmt hello.zig
zig fmt --check hello.zig
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about format source.
lang: shell
code: |-
  zig fmt hello.zig
  zig fmt --check other.zig
checks:
  - match: zig\s+fmt\s+\-\-check\s+hello\.zig
    message: Use zig fmt --check hello.zig for this step.
  - notMatch: zig\s+fmt\s+\-\-check\s+other\.zig
    message: Replace zig fmt --check other.zig in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about format source is correct?
options:
  - --check rewrites every source file.
  - zig fmt compiles and runs every test.
  - zig fmt applies the standard formatting style; --check verifies formatting without rewriting the
    file. Use the check form in CI.
answer: 2
explain: zig fmt applies the standard formatting style; --check verifies formatting without
  rewriting the file. Use the check form in CI.
```
