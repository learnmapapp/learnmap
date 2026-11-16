---
title: Early exits with guard
icon: 🔧
branch: data
requires:
  - if-let
  - functions
summary: A guard failure must exit its enclosing scope.
---

A guard failure must exit its enclosing scope. Successfully bound values remain available after the guard.

```swift
func greet(_ name: String?) -> String {
  guard let name, !name.isEmpty else {
    return "Name required"
  }
  return "Hello, \(name)"
}
print(greet("Ada"))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about early exits with guard.
lang: swift
code: |-
  func greet(_ name: String?) -> String {
    guard let name, !name.isEmpty else {
      return "Missing"
    }
    return "Hello, \(name)"
  }
  print(greet("Ada"))
checks:
  - match: return\s+"Name\s+required"
    message: Use return "Name required" for this step.
  - notMatch: return\s+"Missing"
    message: Replace return "Missing" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What must the `else` branch of a `guard` do?
options:
  - Continue with the following statement.
  - Assign a fallback to every unwrapped constant.
  - Exit the enclosing scope.
answer: 2
explain: A successful guard lets execution proceed with its bindings available afterward.
```
