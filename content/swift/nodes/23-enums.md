---
title: Enumerated cases
icon: 🛠️
branch: types
requires:
  - switch
summary: An enum restricts a value to its declared cases.
---

An enum restricts a value to its declared cases. A switch covering every case needs no default.

A useful term here is [[enum]]: A type whose values are selected from a declared set of cases.

```swift
enum Status { case todo, doing, done }
let status = Status.doing
switch status {
case .todo: print("Start")
case .doing: print("Continue")
case .done: print("Finished")
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about enumerated cases.
lang: swift
code: |-
  enum Status { case todo, doing, done }
  let status = Status.todo
  switch status {
  case .todo: print("Start")
  case .doing: print("Continue")
  case .done: print("Finished")
  }
checks:
  - match: Status\.doing
    message: Use Status.doing for this step.
  - notMatch: Status\.todo
    message: Replace Status.todo in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about enumerated cases is correct?
options:
  - Enums automatically contain all strings.
  - Enum switches always need default.
  - An enum restricts a value to its declared cases. A switch covering every case needs no default.
answer: 2
explain: An enum restricts a value to its declared cases. A switch covering every case needs no default.
```
