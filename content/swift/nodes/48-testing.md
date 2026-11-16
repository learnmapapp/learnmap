---
title: Swift Testing
icon: 🌐
branch: tools
requires:
  - functions
  - errors
summary: "Swift Testing uses @Test functions and #expect checks."
---

Swift Testing uses @Test functions and #expect checks. Put tests in a Swift package test target and run `swift test`.

```swift
import Testing
func square(_ n: Int) -> Int { n * n }
@Test func squareHandlesZeroAndPositive() {
  #expect(square(0) == 0)
  #expect(square(3) == 9)
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about swift testing.
lang: swift
code: |-
  import Testing
  func square(_ n: Int) -> Int { n * n }
  @Test func squareHandlesZeroAndPositive() {
    #expect(square(0) == 0)
    #expect(square(3) == 6)
  }
checks:
  - match: square\(3\)\s+==\s+9
    message: Use square(3) == 9 for this step.
  - notMatch: square\(3\)\s+==\s+6
    message: Replace square(3) == 6 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which Swift Testing construct records a checked expectation?
options:
  - "`#expect(square(3) == 9)`"
  - "`print(square(3) == 9)`"
  - "`let expected = 9`"
answer: 0
explain: An expectation reports a test failure when its expression is `false`.
```
