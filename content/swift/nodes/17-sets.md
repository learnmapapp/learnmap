---
title: Unique sets
icon: 🚦
branch: data
requires:
  - arrays
summary: Set stores unique Hashable values without a defined iteration order.
---

Set stores unique Hashable values without a defined iteration order. Membership checks express intent directly.

```swift
let topics: Set<String> = ["Swift", "Lua", "Swift"]
print(topics.count, topics.contains("Lua"))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about unique sets.
lang: swift
code: |-
  let topics: Set<String> = ["Swift", "Lua", "Swift"]
  print(topics.count, topics.contains("Rust"))
checks:
  - match: contains\("Lua"\)
    message: Use contains("Lua") for this step.
  - notMatch: contains\("Rust"\)
    message: Replace contains("Rust") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about unique sets is correct?
options:
  - A Set preserves duplicates.
  - A Set guarantees insertion order.
  - Set stores unique Hashable values without a defined iteration order. Membership checks express
    intent directly.
answer: 2
explain: Set stores unique Hashable values without a defined iteration order. Membership checks
  express intent directly.
```
