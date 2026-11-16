---
title: Argument labels
icon: 🛠️
branch: functions
requires:
  - functions
  - strings
summary: An external argument label can differ from the internal parameter name.
---

An external argument label can differ from the internal parameter name. An underscore omits the external label.

```swift
func greet(person name: String) -> String {
  "Hello, \(name)"
}
print(greet(person: "Ada"))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about argument labels.
lang: swift
code: |-
  func greet(person name: String) -> String {
    "Hello, \(name)"
  }
  print(greet(name: "Ada"))
checks:
  - match: greet\(person:\s+"Ada"\)
    message: 'Use greet(person: "Ada") for this step.'
  - notMatch: greet\(name:\s+"Ada"\)
    message: 'Replace greet(name: "Ada") in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about argument labels is correct?
options:
  - The internal name must always be used at the call site.
  - Argument labels cannot be customized.
  - An external argument label can differ from the internal parameter name. An underscore omits the
    external label.
answer: 2
explain: An external argument label can differ from the internal parameter name. An underscore omits
  the external label.
```
