---
title: Guaranteed cleanup
icon: 🔢
branch: tools
requires:
  - functions
  - errors
summary: defer runs when its enclosing scope exits, including an error exit.
---

defer runs when its enclosing scope exits, including an error exit. Multiple deferred blocks run in reverse registration order.

```swift
func demonstrate() {
  defer { print("cleanup") }
  print("work")
}
demonstrate()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about guaranteed cleanup.
lang: swift
code: |-
  func demonstrate() {
    defer { print("later") }
    print("work")
  }
  demonstrate()
checks:
  - match: print\("cleanup"\)
    message: Use print("cleanup") for this step.
  - notMatch: print\("later"\)
    message: Replace print("later") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: If two `defer` blocks are registered in one scope, which runs first on exit?
options:
  - The one registered last.
  - The one registered first.
  - Whichever block has fewer statements.
answer: 0
explain: Deferred actions execute in reverse registration order.
```
