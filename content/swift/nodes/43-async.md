---
title: Async functions
icon: 📋
branch: concurrency
requires:
  - functions
  - errors
summary: async marks a function that can suspend.
---

async marks a function that can suspend. await identifies a potential suspension point; async does not itself guarantee parallel execution.

A useful term here is [[suspension point]]: A location where an asynchronous task may pause and allow other work to proceed.

```swift
func greeting() async -> String { "Hello" }
func demonstrate() async {
  let message = await greeting()
  print(message)
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about async functions.
lang: swift
code: |-
  func greeting() async -> String { "Hello" }
  func demonstrate() async {
    let message = greeting()
    print(message)
  }
checks:
  - match: let\s+message\s+=\s+await\s+greeting\(\)
    message: Use let message = await greeting() for this step.
  - notMatch: let\s+message\s+=\s+greeting\(\)
    message: Replace let message = greeting() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about async functions is correct?
options:
  - An async function always runs in parallel with its caller.
  - async marks a function that can suspend. await identifies a potential suspension point; async
    does not itself guarantee parallel execution.
  - Every await starts a new operating-system thread.
answer: 1
explain: async marks a function that can suspend. await identifies a potential suspension point;
  async does not itself guarantee parallel execution.
```
