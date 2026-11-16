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
question: In what order does `for await` receive task-group results?
options:
  - Completion order.
  - Always submission order.
  - Always ascending result-value order.
answer: 0
explain: Do not assume concurrent children finish in the order they were added.
```
