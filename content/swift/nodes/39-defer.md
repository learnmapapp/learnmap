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
question: Which statement about guaranteed cleanup is correct?
options:
  - defer runs when its enclosing scope exits, including an error exit. Multiple deferred blocks run
    in reverse registration order.
  - defer always runs immediately.
  - Deferred blocks run in registration order.
answer: 0
explain: defer runs when its enclosing scope exits, including an error exit. Multiple deferred
  blocks run in reverse registration order.
```
