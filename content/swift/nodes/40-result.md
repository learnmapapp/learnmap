---
title: Explicit Result values
icon: 💬
branch: tools
requires:
  - errors
  - associated
summary: Result represents success or typed failure as a value that can be stored or passed.
---

`Result` represents success or typed failure as a value that can be stored or passed. It complements throwing APIs.

```swift
enum LookupError: Error { case missing }
let outcome: Result<Int, LookupError> = .success(8)
switch outcome {
case .success(let value): print(value)
case .failure(let error): print(error)
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about explicit result values.
lang: swift
code: |-
  enum LookupError: Error { case missing }
  let outcome: Result<Int, LookupError> = .success(0)
  switch outcome {
  case .success(let value): print(value)
  case .failure(let error): print(error)
  }
checks:
  - match: \.success\(8\)
    message: Use .success(8) for this step.
  - notMatch: \.success\(0\)
    message: Replace .success(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `Result<Int, LookupError>` represent?
options:
  - Both a success and failure active simultaneously.
  - An integer success or a `LookupError` failure.
  - An optional integer with no failure information.
answer: 1
explain: "`Result` stores one of two explicitly modeled outcomes."
```
