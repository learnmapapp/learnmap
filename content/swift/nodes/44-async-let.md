---
title: Concurrent child work
icon: 🔧
branch: concurrency
requires:
  - async
summary: async let starts structured child work whose lifetime belongs to its scope.
---

async let starts structured child work whose lifetime belongs to its scope. Await the values before using their completed results.

```swift
func score(_ value: Int) async -> Int { value * 2 }
func combined() async -> Int {
  async let first = score(2)
  async let second = score(3)
  return await first + second
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about concurrent child work.
lang: swift
code: |-
  func score(_ value: Int) async -> Int { value * 2 }
  func combined() async -> Int {
    async let first = score(1)
    async let second = score(3)
    return await first + second
  }
checks:
  - match: score\(2\)
    message: Use score(2) for this step.
  - notMatch: score\(1\)
    message: Replace score(1) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `async let` introduce?
options:
  - A global background operation with unlimited lifetime.
  - A synchronous constant that cannot suspend.
  - Structured child work whose lifetime belongs to its scope.
answer: 2
explain: The enclosing scope manages and awaits its child work.
```
