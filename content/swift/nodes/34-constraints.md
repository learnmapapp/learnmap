---
title: Generic constraints
icon: 📦
branch: types
requires:
  - generics
summary: A constraint supplies operations that unconstrained T does not promise.
---

A constraint supplies operations that unconstrained T does not promise. `Equatable` enables equality checks between values of the same type.

```swift
func allEqual<T: Equatable>(_ values: [T]) -> Bool {
  guard let first = values.first else { return true }
  return values.allSatisfy { $0 == first }
}
print(allEqual([2, 2, 2]))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about generic constraints.
lang: swift
code: |-
  func allEqual<T: Equatable>(_ values: [T]) -> Bool {
    guard let first = values.first else { return true }
    return values.allSatisfy { $0 != first }
  }
  print(allEqual([2, 2, 2]))
checks:
  - match: \$0\s+==\s+first
    message: Use $0 == first for this step.
  - notMatch: \$0\s+!=\s+first
    message: Replace $0 != first in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why constrain the element type of `allEqual` to `Equatable`?
options:
  - So every value becomes a string.
  - So equality comparison is guaranteed to be available.
  - So every collection is guaranteed nonempty.
answer: 1
explain: The constraint supplies the operation used by the algorithm.
```
