---
title: Meet Mojo
icon: 🔥
branch: core
requires: []
summary: Save hello.mojo and run mojo run hello.mojo.
kind: hub
---

Save hello.mojo and run mojo run hello.mojo. This course uses Mojo 1.2.0, including def functions and std-prefixed library imports.

```mojo
def main() raises:
    print("Hello, Mojo!")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Mojo 1.2.0**. Check your local tool version before following examples. See the [official reference](https://mojolang.org/docs/manual/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Repair the starting example using what you learned about meet mojo.
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
question: Which statement about meet mojo is correct?
options:
  - A Mojo file must be interpreted by Python.
  - Save hello.mojo and run mojo run hello.mojo. This course uses Mojo 1.2.0, including def
    functions and std-prefixed library imports.
  - All historical Mojo tutorials use the same current syntax.
answer: 1
explain: Save hello.mojo and run mojo run hello.mojo. This course uses Mojo 1.2.0, including def
  functions and std-prefixed library imports.
```
