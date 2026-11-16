---
title: Ranges and iteration
icon: 🔧
branch: flow
requires:
  - types
summary: The .
---

The ... operator includes the upper bound; ..< excludes it. Half-open ranges fit zero-based collection indexing.

```swift
for number in 1...3 {
  print(number)
}
for index in 0..<3 {
  print(index)
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about ranges and iteration.
lang: swift
code: |-
  for number in 1...2 {
    print(number)
  }
  for index in 0..<3 {
    print(index)
  }
checks:
  - match: 1\.\.\.3
    message: Use 1...3 for this step.
  - notMatch: 1\.\.\.2
    message: Replace 1...2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about ranges and iteration is correct?
options:
  - ..< includes both endpoints.
  - ... excludes the first endpoint.
  - The ... operator includes the upper bound; ..< excludes it. Half-open ranges fit zero-based
    collection indexing.
answer: 2
explain: The ... operator includes the upper bound; ..< excludes it. Half-open ranges fit zero-based
  collection indexing.
```
