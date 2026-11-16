---
title: Custom initialization
icon: 🚦
branch: types
requires:
  - structs
summary: A failable initializer returns nil when an input cannot produce a valid instance.
---

A failable initializer returns `nil` when an input cannot produce a valid instance. Initialize every stored property before success.

```swift
struct User {
  let name: String
  init?(name: String) {
    guard !name.isEmpty else { return nil }
    self.name = name
  }
}
print(User(name: "Ada")?.name ?? "Invalid")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about custom initialization.
lang: swift
code: |-
  struct User {
    let name: String
    init?(name: String) {
      guard name.isEmpty else { return nil }
      self.name = name
    }
  }
  print(User(name: "Ada")?.name ?? "Invalid")
checks:
  - match: guard\s+!name\.isEmpty
    message: Use guard !name.isEmpty for this step.
  - notMatch: guard\s+name\.isEmpty
    message: Replace guard name.isEmpty in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `init?` use to reject invalid input?
options:
  - An uninitialized stored property.
  - A mandatory `false` return value.
  - "`return nil`."
answer: 2
explain: A failable initializer produces no instance when validation fails.
```
