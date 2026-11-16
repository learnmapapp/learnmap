---
title: Optional binding
icon: 📋
branch: data
requires:
  - optionals
  - if
summary: if let unwraps a present optional into a nonoptional binding within the success branch.
---

if let unwraps a present optional into a nonoptional binding within the success branch. Handle absence in the other branch.

```swift
let number = Int("42")
if let value = number {
  print(value + 1)
} else {
  print("Invalid number")
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional binding.
lang: swift
code: |-
  let number = Int("42")
  if let value = number {
    print(value - 1)
  } else {
    print("Invalid number")
  }
checks:
  - match: print\(value\s+\+\s+1\)
    message: Use print(value + 1) for this step.
  - notMatch: print\(value\s+\-\s+1\)
    message: Replace print(value - 1) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where is `value` available after `if let value = number { ... }`?
options:
  - Only inside the `else` branch.
  - Inside the successful binding branch.
  - In every later scope, even if `number` was `nil`.
answer: 1
explain: "`Optional` binding provides a nonoptional local where the value is known to exist."
```
