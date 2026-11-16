---
title: Mutating methods
icon: 🏷️
branch: types
requires:
  - structs
summary: A struct method that changes stored state uses mutating.
---

A struct method that changes stored state uses mutating. Call it through a mutable var instance.

```swift
struct Counter {
  var value = 0
  mutating func increment() { value += 1 }
}
var counter = Counter()
counter.increment()
print(counter.value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about mutating methods.
lang: swift
code: |-
  struct Counter {
    var value = 0
    mutating func increment() { value -= 1 }
  }
  var counter = Counter()
  counter.increment()
  print(counter.value)
checks:
  - match: value\s+\+=\s+1
    message: Use value += 1 for this step.
  - notMatch: value\s+\-=\s+1
    message: Replace value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about mutating methods is correct?
options:
  - Every struct method can mutate let instances.
  - mutating is required for methods that only read properties.
  - A struct method that changes stored state uses mutating. Call it through a mutable var instance.
answer: 2
explain: A struct method that changes stored state uses mutating. Call it through a mutable var instance.
```
