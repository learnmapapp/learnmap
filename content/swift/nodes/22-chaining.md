---
title: Optional chaining
icon: 📦
branch: data
requires:
  - optionals
summary: Optional chaining stops when a receiver is nil and returns an optional result.
---

Optional chaining stops when a receiver is nil and returns an optional result. Combine it with ?? for an explicit display fallback.

```swift
struct Profile { let city: String }
let profile: Profile? = Profile(city: "Sydney")
print(profile?.city.uppercased() ?? "Unknown")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional chaining.
lang: swift
code: |-
  struct Profile { let city: String }
  let profile: Profile? = Profile(city: "Sydney")
  print(profile?.city.lowercased() ?? "Unknown")
checks:
  - match: profile\?\.city\.uppercased\(\)
    message: Use profile?.city.uppercased() for this step.
  - notMatch: profile\?\.city\.lowercased\(\)
    message: Replace profile?.city.lowercased() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about optional chaining is correct?
options:
  - Optional chaining always returns a nonoptional result.
  - Optional chaining stops when a receiver is nil and returns an optional result. Combine it with
    ?? for an explicit display fallback.
  - Optional chaining crashes whenever a receiver is nil.
answer: 1
explain: Optional chaining stops when a receiver is nil and returns an optional result. Combine it
  with ?? for an explicit display fallback.
```
