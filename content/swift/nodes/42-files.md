---
title: File URLs and data
icon: 🔁
branch: tools
requires:
  - codable
summary: Foundation file APIs accept URLs and can throw.
---

Foundation file APIs accept URLs and can throw. Use a temporary location for experiments and clean up the example file afterward.

```swift
import Foundation
let url = FileManager.default.temporaryDirectory.appendingPathComponent("learnmap-example.txt")
try "Practice".write(to: url, atomically: true, encoding: .utf8)
let text = try String(contentsOf: url, encoding: .utf8)
print(text)
try FileManager.default.removeItem(at: url)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about file urls and data.
lang: swift
code: |-
  import Foundation
  let url = FileManager.default.temporaryDirectory.appendingPathComponent("learnmap-example.txt")
  try "Practice".write(to: url, atomically: true, encoding: .utf8)
  let text = try String(contentsOf: url, encoding: .ascii)
  print(text)
  try FileManager.default.removeItem(at: url)
checks:
  - match: |-
      encoding:\s+\.utf8\)\
      print\(text\)
    message: |-
      Use encoding: .utf8)
      print(text) for this step.
  - notMatch: |-
      encoding:\s+\.ascii\)\
      print\(text\)
    message: |-
      Replace encoding: .ascii)
      print(text) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about file urls and data is correct?
options:
  - Foundation file APIs accept URLs and can throw. Use a temporary location for experiments and
    clean up the example file afterward.
  - File writes can never fail.
  - A URL is always an HTTP network address.
answer: 0
explain: Foundation file APIs accept URLs and can throw. Use a temporary location for experiments
  and clean up the example file afterward.
```
