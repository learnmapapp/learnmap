---
title: Swift packages
icon: 🧪
branch: tools
requires:
  - swift
  - testing
summary: Swift Package Manager organizes source targets and test targets through Package.swift.
---

Swift Package Manager organizes source targets and test targets through `Package.swift`. Add a test target when the chosen template does not create one.

```shell
swift package init --type executable
swift build
swift test
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about swift packages.
lang: shell
code: |-
  swift package init --type executable
  swift build
  swift run
checks:
  - match: swift\s+test
    message: Use swift test for this step.
  - notMatch: swift\s+run
    message: Replace swift run in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which Swift Package Manager command executes package tests?
options:
  - "`swift package describe`"
  - "`swift test`"
  - "`swift build`"
answer: 1
explain: Building and describing a package do not execute its test suite.
```
