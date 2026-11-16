---
title: Cooperative cancellation
icon: 📦
branch: concurrency
requires:
  - async
  - errors
summary: Cancellation is cooperative.
---

Cancellation is cooperative. `Task.checkCancellation` throws when the current task has been cancelled, allowing expensive work to stop at useful boundaries.

```swift
func work() async throws -> Int {
  try Task.checkCancellation()
  return 42
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about cooperative cancellation.
lang: swift
code: |-
  func work() async throws -> Int {
    try Task.checkCancellation()
    return 0
  }
checks:
  - match: return\s+42
    message: Use return 42 for this step.
  - notMatch: return\s+0
    message: Replace return 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `Task.checkCancellation()` do for a cancelled task?
options:
  - Silently restarts the task.
  - Throws a cancellation error.
  - Forcibly kills its current thread.
answer: 1
explain: Cancellation is cooperative, so code checks and responds at appropriate boundaries.
```
