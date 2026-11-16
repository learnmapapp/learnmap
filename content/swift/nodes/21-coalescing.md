---
title: Optional fallback
icon: 🧩
branch: data
requires:
  - optionals
summary: The ?? operator supplies a fallback only when an optional is nil.
---

The ?? operator supplies a fallback only when an optional is nil. It preserves a present empty string.

```swift
let requested: String? = nil
let title = requested ?? "Untitled"
print(title)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional fallback.
lang: swift
code: |-
  let requested: String? = nil
  let title = requested ?? ""
  print(title)
checks:
  - match: requested\s+\?\?\s+"Untitled"
    message: Use requested ?? "Untitled" for this step.
  - notMatch: requested\s+\?\?\s+""
    message: Replace requested ?? "" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about optional fallback is correct?
options:
  - The ?? operator supplies a fallback only when an optional is nil. It preserves a present empty
    string.
  - ?? replaces every empty string too.
  - ?? force-unwraps nil without a fallback.
answer: 0
explain: The ?? operator supplies a fallback only when an optional is nil. It preserves a present
  empty string.
```
