---
title: Build a native program
icon: 🧪
branch: tools
requires:
  - mojo
summary: mojo run compiles and executes a source file; mojo build creates a native executable for
  later execution.
---

`mojo run` compiles and executes a source file; `mojo build` creates a native executable for later execution. Check `mojo --version` against the course target.

```shell
mojo run hello.mojo
mojo build hello.mojo -o hello
./hello
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about build a native program.
lang: shell
code: |-
  mojo run hello.mojo
  mojo build hello.mojo -o other
  ./hello
checks:
  - match: \-o\s+hello
    message: Use -o hello for this step.
  - notMatch: \-o\s+other
    message: Replace -o other in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which command creates a native executable without also running it?
options:
  - "`./hello`"
  - "`mojo build hello.mojo -o hello`"
  - "`mojo run hello.mojo`"
answer: 1
explain: Build produces the executable; run or invoking the binary executes it.
```
