---
title: Associated values
icon: 🌐
branch: types
requires:
  - enums
summary: Associated values attach case-specific data to an enum.
---

Associated values attach case-specific data to an enum. Pattern matching extracts the data for the selected case.

```swift
enum Outcome {
  case success(Int)
  case failure(String)
}
let outcome = Outcome.success(8)
switch outcome {
case .success(let count): print(count)
case .failure(let reason): print(reason)
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about associated values.
lang: swift
code: |-
  enum Outcome {
    case success(Int)
    case failure(String)
  }
  let outcome = Outcome.success(0)
  switch outcome {
  case .success(let count): print(count)
  case .failure(let reason): print(reason)
  }
checks:
  - match: Outcome\.success\(8\)
    message: Use Outcome.success(8) for this step.
  - notMatch: Outcome\.success\(0\)
    message: Replace Outcome.success(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about associated values is correct?
options:
  - Associated values attach case-specific data to an enum. Pattern matching extracts the data for
    the selected case.
  - Associated values must be identical for every case.
  - An enum case can never carry data.
answer: 0
explain: Associated values attach case-specific data to an enum. Pattern matching extracts the data
  for the selected case.
```
