---
title: Independent value copies
icon: 🔢
branch: types
requires:
  - structs
summary: Assigning a struct creates a value copy.
---

Assigning a struct creates a value copy. Mutating second does not change first, even when the implementation uses storage optimizations.

```swift
struct Counter { var value = 0 }
var first = Counter()
var second = first
second.value = 9
print(first.value, second.value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about independent value copies.
lang: swift
code: |-
  struct Counter { var value = 0 }
  var first = Counter()
  var second = first
  second.value = 0
  print(first.value, second.value)
checks:
  - match: second\.value\s+=\s+9
    message: Use second.value = 9 for this step.
  - notMatch: second\.value\s+=\s+0
    message: Replace second.value = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about independent value copies is correct?
options:
  - Assigning a struct creates a value copy. Mutating second does not change first, even when the
    implementation uses storage optimizations.
  - All struct copies share observable mutable state.
  - Copy-on-write means values must expose shared mutations.
answer: 0
explain: Assigning a struct creates a value copy. Mutating second does not change first, even when
  the implementation uses storage optimizations.
```
