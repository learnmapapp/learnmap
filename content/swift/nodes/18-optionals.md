---
title: Optional values
icon: 🔁
branch: data
requires:
  - types
summary: An optional represents either a wrapped value or nil.
---

An optional represents either a wrapped value or nil. Failable conversion returns nil when the input cannot become an Int.

A useful term here is [[optional]]: A value that explicitly represents either a wrapped value or nil, written T?.

```swift
let text = "42"
let number: Int? = Int(text)
print(number as Any)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional values.
lang: swift
code: |-
  let text = "42"
  let number: Int? = Int("oops")
  print(number as Any)
checks:
  - match: Int\(text\)
    message: Use Int(text) for this step.
  - notMatch: Int\("oops"\)
    message: Replace Int("oops") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about optional values is correct?
options:
  - An optional represents either a wrapped value or nil. Failable conversion returns nil when the
    input cannot become an Int.
  - A failed Int conversion always returns zero.
  - Every optional must contain a value.
answer: 0
explain: An optional represents either a wrapped value or nil. Failable conversion returns nil when
  the input cannot become an Int.
```
