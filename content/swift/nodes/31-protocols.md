---
title: Protocol contracts
icon: 📋
branch: types
requires:
  - structs
summary: A protocol declares requirements that conforming types implement.
---

A protocol declares requirements that conforming types implement. A generic constraint lets code use that contract without depending on one concrete type.

A useful term here is [[protocol]]: A contract of requirements that a type can adopt and implement.

```swift
protocol Named { var name: String { get } }
struct User: Named { let name: String }
func greet<T: Named>(_ value: T) {
  print("Hello, \(value.name)")
}
greet(User(name: "Ada"))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about protocol contracts.
lang: swift
code: |-
  protocol Named { var name: String { get } }
  struct User: Named { let name: String }
  func greet<T: Named>(_ value: T) {
    print("Hello, \(value.name)")
  }
  greet(User(name: "Unknown"))
checks:
  - match: User\(name:\s+"Ada"\)
    message: 'Use User(name: "Ada") for this step.'
  - notMatch: User\(name:\s+"Unknown"\)
    message: 'Replace User(name: "Unknown") in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about protocol contracts is correct?
options:
  - Only classes can conform to protocols.
  - A protocol declares requirements that conforming types implement. A generic constraint lets code
    use that contract without depending on one concrete type.
  - Protocols must store instance fields directly.
answer: 1
explain: A protocol declares requirements that conforming types implement. A generic constraint lets
  code use that contract without depending on one concrete type.
```
