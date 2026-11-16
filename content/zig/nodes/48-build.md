---
title: Compile an executable
icon: 🌐
branch: tools
requires:
  - imports
  - tests
summary: build-exe creates an executable.
---

build-exe creates an executable. ReleaseSafe enables optimization while retaining runtime safety checks; ReleaseFast makes a different safety tradeoff.

```shell
zig build-exe hello.zig -O ReleaseSafe
./hello
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile an executable.
lang: shell
code: |-
  zig build-exe hello.zig -O ReleaseFast
  ./hello
checks:
  - match: \-O\s+ReleaseSafe
    message: Use -O ReleaseSafe for this step.
  - notMatch: \-O\s+ReleaseFast
    message: Replace -O ReleaseFast in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What is the defining tradeoff of `ReleaseSafe`?
options:
  - Optimization with runtime safety checks retained.
  - Optimization with all runtime safety checks removed.
  - No optimization and no safety checks.
answer: 0
explain: The release modes differ in their optimization and safety choices.
```
