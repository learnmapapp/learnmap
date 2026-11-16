---
title: Encode typed JSON
icon: 🚦
branch: tools
requires:
  - structs
  - errors
summary: Codable can synthesize encoding and decoding for compatible stored properties.
---

`Codable` can synthesize encoding and decoding for compatible stored properties. Decoding checks types, but domain constraints still need validation.

```swift
import Foundation
struct Task: Codable { let title: String; let done: Bool }
let task = Task(title: "Practice", done: false)
let data = try JSONEncoder().encode(task)
let restored = try JSONDecoder().decode(Task.self, from: data)
print(restored.title)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about encode typed json.
lang: swift
code: |-
  import Foundation
  struct Task: Codable { let title: String; let done: Bool }
  let task = Task(title: "Practice", done: true)
  let data = try JSONEncoder().encode(task)
  let restored = try JSONDecoder().decode(Task.self, from: data)
  print(restored.title)
checks:
  - match: done:\s+false
    message: "Use done: false for this step."
  - notMatch: done:\s+true
    message: "Replace done: true in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does synthesized `Codable` decoding establish?
options:
  - That every custom business rule is automatically satisfied.
  - That custom validating initializers are always called.
  - That encoded data fits the declared decoding structure and types.
answer: 2
explain: Domain validation may require custom decoding beyond synthesized type checks.
```
