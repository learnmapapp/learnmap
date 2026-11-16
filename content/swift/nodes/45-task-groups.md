---
title: Dynamic child tasks
icon: 🧩
branch: concurrency
requires:
  - async-let
  - arrays
summary: A task group manages a dynamic set of child tasks.
---

A task group manages a dynamic set of child tasks. Results arrive in completion order, so do not assume submission order.

```swift
func total() async -> Int {
  await withTaskGroup(of: Int.self) { group in
    for value in 1...3 { group.addTask { value * 2 } }
    var sum = 0
    for await value in group { sum += value }
    return sum
  }
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about dynamic child tasks.
lang: swift
code: |-
  func total() async -> Int {
    await withTaskGroup(of: Int.self) { group in
      for value in 1...3 { group.addTask { value * 2 } }
      var sum = 0
      for await value in group { sum -= value }
      return sum
    }
  }
checks:
  - match: sum\s+\+=\s+value
    message: Use sum += value for this step.
  - notMatch: sum\s+\-=\s+value
    message: Replace sum -= value in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about dynamic child tasks is correct?
options:
  - A task group manages a dynamic set of child tasks. Results arrive in completion order, so do not
    assume submission order.
  - Task groups guarantee results arrive in submission order.
  - Leaving a group discards running children without waiting.
answer: 0
explain: A task group manages a dynamic set of child tasks. Results arrive in completion order, so
  do not assume submission order.
```
