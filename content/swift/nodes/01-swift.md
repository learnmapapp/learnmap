---
title: Meet Swift
icon: 🐦
branch: core
requires: []
summary: Save hello.swift and run swift hello.swift for a script, or swiftc hello.swift -o hello to
  compile an executable.
kind: hub
---

Save `hello.swift` and run `swift hello.swift` for a script, or `swiftc hello.swift -o hello` to compile an executable.

```swift
print("Hello, Swift!")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Swift 6**. Check your local tool version before following examples. See the [official reference](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Make the script print `Hello, Swift!`.
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
question: Which terminal command runs `hello.swift` as a Swift script?
options:
  - "`swift test hello.swift`"
  - "`swift hello.swift`"
  - "`swift package hello.swift`"
answer: 1
explain: The Swift interpreter can compile and execute a source script directly.
```
