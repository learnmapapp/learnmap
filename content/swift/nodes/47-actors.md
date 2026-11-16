---
title: Isolated actor state
icon: 🛠️
branch: concurrency
requires:
  - classes
  - async
summary: An actor isolates its mutable state.
---

An actor isolates its mutable state. Calls from outside that isolation generally require await, and invariants must be reconsidered across suspension points.

A useful term here is [[actor]]: A reference type that isolates its mutable state and coordinates access through Swift concurrency.

```swift
actor Counter {
  private var value = 0
  func increment() -> Int {
    value += 1
    return value
  }
}
func demonstrate() async {
  let counter = Counter()
  print(await counter.increment())
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about isolated actor state.
lang: swift
code: |-
  actor Counter {
    private var value = 0
    func increment() -> Int {
      value -= 1
      return value
    }
  }
  func demonstrate() async {
    let counter = Counter()
    print(await counter.increment())
  }
checks:
  - match: value\s+\+=\s+1
    message: Use value += 1 for this step.
  - notMatch: value\s+\-=\s+1
    message: Replace value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why does an outside caller generally `await` an actor-isolated method?
options:
  - Every actor call creates a new process.
  - Actor fields are shared without coordination.
  - Access must cross the actor's isolation boundary.
answer: 2
explain: Actors coordinate access to isolated state; suspension can still affect higher-level invariants.
```
