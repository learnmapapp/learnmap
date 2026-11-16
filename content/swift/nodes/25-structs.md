---
title: Value structs
icon: 🧪
branch: types
requires:
  - types
summary: A struct models data as a value type.
---

A struct models data as a value type. Swift can synthesize a memberwise initializer for its stored properties.

A useful term here is [[value semantics]]: A model where assigning or passing a value behaves as an independent value rather than shared mutable identity.

```swift
struct Task {
  var title: String
  var done = false
}
let task = Task(title: "Practice")
print(task.title)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about value structs.
lang: swift
code: |-
  struct Task {
    var title: String
    var done = false
  }
  let task = Task(title: "Later")
  print(task.title)
checks:
  - match: Task\(title:\s+"Practice"\)
    message: 'Use Task(title: "Practice") for this step.'
  - notMatch: Task\(title:\s+"Later"\)
    message: 'Replace Task(title: "Later") in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What kind of semantics does an ordinary Swift struct provide?
options:
  - Global singleton identity.
  - Value semantics.
  - Shared reference identity by default.
answer: 1
explain: A struct represents a value rather than an implicitly shared mutable object.
```
