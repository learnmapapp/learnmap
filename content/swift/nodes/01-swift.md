---
title: Meet Swift
icon: 🐦
branch: core
requires: []
summary: Save hello.swift and run swift hello.swift for a script, or swiftc hello.swift -o hello to
  compile an executable.
kind: hub
---

Save hello.swift and run swift hello.swift for a script, or swiftc hello.swift -o hello to compile an executable.

```swift
print("Hello, Swift!")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Swift 6**. Check your local tool version before following examples. See the [official reference](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Repair the starting example using what you learned about meet swift.
lang: swift
code: print("Goodbye")
checks:
  - match: '"Hello,\s+Swift!"'
    message: Use "Hello, Swift!" for this step.
  - notMatch: '"Goodbye"'
    message: Replace "Goodbye" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about meet swift is correct?
options:
  - A script must declare a class before printing.
  - Save hello.swift and run swift hello.swift for a script, or swiftc hello.swift -o hello to
    compile an executable.
  - Swift runs only inside iPhone applications.
answer: 1
explain: Save hello.swift and run swift hello.swift for a script, or swiftc hello.swift -o hello to
  compile an executable.
```
