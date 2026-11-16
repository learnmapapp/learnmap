---
title: Throwing functions
icon: 🏷️
branch: tools
requires:
  - functions
  - enums
summary: throws marks an error-producing function.
---

throws marks an error-producing function. Use try at the call site and handle failure with do-catch or propagate it.

```swift
enum InputError: Error { case empty }
func validate(_ text: String) throws -> String {
  guard !text.isEmpty else { throw InputError.empty }
  return text
}
do { print(try validate("Swift")) }
catch { print(error) }
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about throwing functions.
lang: swift
code: |-
  enum InputError: Error { case empty }
  func validate(_ text: String) throws -> String {
    guard !text.isEmpty else { throw InputError.empty }
    return ""
  }
  do { print(try validate("Swift")) }
  catch { print(error) }
checks:
  - match: return\s+text
    message: Use return text for this step.
  - notMatch: return\s+""
    message: Replace return "" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about throwing functions is correct?
options:
  - throws functions silently convert all failures to nil.
  - try can only be used inside catch.
  - throws marks an error-producing function. Use try at the call site and handle failure with
    do-catch or propagate it.
answer: 2
explain: throws marks an error-producing function. Use try at the call site and handle failure with
  do-catch or propagate it.
```
