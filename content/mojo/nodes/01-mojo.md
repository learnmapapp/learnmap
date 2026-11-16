---
title: Meet Mojo
icon: 🔥
branch: core
requires: []
summary: Save hello.mojo and run mojo run hello.mojo.
kind: hub
---

Save `hello.mojo` and run `mojo run hello.mojo`. This course uses Mojo 1.2.0, including def functions and std-prefixed library imports.

```mojo
def main() raises:
    print("Hello, Mojo!")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Mojo 1.2.0**. Check your local tool version before following examples. See the [official reference](https://mojolang.org/docs/manual/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Make the program print `Hello, Mojo!`.
lang: mojo
code: |-
  def main() raises:
      print("Hello, world!")
checks:
  - match: Hello,\s+Mojo!
    message: Use Hello, Mojo! for this step.
  - notMatch: Hello,\s+world!
    message: Replace Hello, world! in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which terminal command compiles and executes `hello.mojo`?
options:
  - "`mojo build hello.mojo` alone."
  - "`mojo run hello.mojo`"
  - "`mojo format hello.mojo`"
answer: 1
explain: "`run` executes the program; `build` creates an executable without running it."
```
