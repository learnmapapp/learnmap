---
title: Meet Nim
icon: 👑
branch: core
requires: []
summary: Save a .nim file and run nim c -r hello.nim.
kind: hub
---

Save a `.nim` file and run `nim c -r hello.nim`. Nim compiles the program before executing it.

```nim
echo "Hello, Nim!"
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Nim 2.2+**. Check your local tool version before following examples. See the [official reference](https://nim-lang.org/docs/tut1.html) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Make the program print `Hello, Nim!`.
lang: nim
code: echo "Goodbye"
checks:
  - match: '"Hello,\s+Nim!"'
    message: Use "Hello, Nim!" for this step.
  - notMatch: '"Goodbye"'
    message: Replace "Goodbye" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does the terminal command `nim c -r hello.nim` do?
options:
  - Opens the source in an interactive REPL.
  - Compiles the source and runs the resulting program.
  - Checks formatting without compiling.
answer: 1
explain: "`c` requests native compilation; `-r` runs the result."
```
