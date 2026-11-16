---
title: Meet Nim
icon: 👑
branch: core
requires: []
summary: Save a .nim file and run nim c -r hello.nim.
kind: hub
---

Save a .nim file and run nim c -r hello.nim. Nim compiles the program before executing it.

```nim
echo "Hello, Nim!"
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Nim 2.2+**. Check your local tool version before following examples. See the [official reference](https://nim-lang.org/docs/tut1.html) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Repair the starting example using what you learned about meet nim.
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
question: Which statement about meet nim is correct?
options:
  - Every Nim program needs a main procedure.
  - Save a .nim file and run nim c -r hello.nim. Nim compiles the program before executing it.
  - Nim source executes only in a browser.
answer: 1
explain: Save a .nim file and run nim c -r hello.nim. Nim compiles the program before executing it.
```
