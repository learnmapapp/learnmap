---
title: Reference identity
icon: 💬
branch: types
requires:
  - structs
summary: Class instances have reference identity.
---

Class instances have reference identity. A let class binding prevents rebinding while mutable properties of the object may still change.

```swift
final class Counter { var value = 0 }
let first = Counter()
let second = first
second.value = 9
print(first === second, first.value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reference identity.
lang: swift
code: |-
  final class Counter { var value = 0 }
  let first = Counter()
  let second = first
  second.value = 0
  print(first === second, first.value)
checks:
  - match: second\.value\s+=\s+9
    message: Use second.value = 9 for this step.
  - notMatch: second\.value\s+=\s+0
    message: Replace second.value = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: After `let second = first` for a class instance, what does `first === second` mean?
options:
  - One reference contains a deep clone of the other.
  - Both references identify the same instance.
  - Both objects have equal fields but different identities.
answer: 1
explain: The identity operator checks whether class references point to one instance.
```
