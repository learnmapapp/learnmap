---
title: Build configurations
icon: 🌐
branch: tools
requires:
  - nim
  - when
summary: Use nim c -r for iteration and -d:release for an optimized native build.
---

Use `nim c -r` for iteration and `-d:release` for an optimized native build. Keep tests separate from performance measurements.

```shell
nim c -r hello.nim
nim c -d:release hello.nim
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about build configurations.
lang: shell
code: |-
  nim c -r hello.nim
  nim c -d:debug hello.nim
checks:
  - match: \-d:release\s+hello\.nim
    message: Use -d:release hello.nim for this step.
  - notMatch: \-d:debug\s+hello\.nim
    message: Replace -d:debug hello.nim in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which command requests an optimized native build?
options:
  - "`nim c -d:release hello.nim`"
  - "`nim check hello.nim`"
  - "`nim c --compileOnly hello.nim`"
answer: 0
explain: The release define selects optimized compilation; it does not automatically run tests.
```
