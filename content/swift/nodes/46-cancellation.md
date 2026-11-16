---
title: Cooperative cancellation
icon: 📦
branch: concurrency
requires:
  - async
  - errors
summary: Cancellation is cooperative.
---

Cancellation is cooperative. Task.checkCancellation throws when the current task has been cancelled, allowing expensive work to stop at useful boundaries.

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
question: Which statement about cooperative cancellation is correct?
options:
  - Cancellation is impossible in throwing functions.
  - Cancellation is cooperative. Task.checkCancellation throws when the current task has been
    cancelled, allowing expensive work to stop at useful boundaries.
  - Cancelling a task forcibly kills its thread immediately.
answer: 1
explain: Cancellation is cooperative. Task.checkCancellation throws when the current task has been
  cancelled, allowing expensive work to stop at useful boundaries.
```
