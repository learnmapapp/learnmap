---
title: Nimble packages
icon: 🧪
branch: tools
requires:
  - modules
  - testing
summary: Nimble manages package metadata and project tasks.
---

Nimble manages package metadata and project tasks. Configure a test task in the `.nimble` file so `nimble test` has a reproducible meaning.

```shell
nimble init
nimble test
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about nimble packages.
lang: shell
code: |-
  nimble init
  nimble build
checks:
  - match: nimble\s+test
    message: Use nimble test for this step.
  - notMatch: nimble\s+build
    message: Replace nimble build in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What makes `nimble test` reproducible for this project?
options:
  - Running `nimble init` before every test.
  - A defined test task in its `.nimble` file.
  - Naming the source directory `test` alone.
answer: 1
explain: The package's task definition records which test command to execute.
```
