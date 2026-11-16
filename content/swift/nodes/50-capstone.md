---
title: A tested task model
icon: 🏷️
branch: tools
requires:
  - codable
  - guard
  - protocols
  - testing
summary: Keep domain validation in an initializer and state changes in named methods.
---

Keep domain validation in an initializer and state changes in named methods. Add tests for empty titles, completion, and JSON round trips before adding a UI.

```swift
import Foundation
enum TaskError: Error { case emptyTitle }
struct StudyTask: Codable, Equatable {
  let title: String
  var done = false
  init(title: String) throws {
    guard !title.isEmpty else { throw TaskError.emptyTitle }
    self.title = title
  }
  mutating func finish() { done = true }
}
var task = try StudyTask(title: "Learn Swift")
task.finish()
let data = try JSONEncoder().encode(task)
print(try JSONDecoder().decode(StudyTask.self, from: data) == task)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a tested task model.
lang: swift
code: |-
  import Foundation
  enum TaskError: Error { case emptyTitle }
  struct StudyTask: Codable, Equatable {
    let title: String
    var done = false
    init(title: String) throws {
      guard !title.isEmpty else { throw TaskError.emptyTitle }
      self.title = title
    }
    mutating func finish() { done = false }
  }
  var task = try StudyTask(title: "Learn Swift")
  task.finish()
  let data = try JSONEncoder().encode(task)
  print(try JSONDecoder().decode(StudyTask.self, from: data) == task)
checks:
  - match: done\s+=\s+true\s+\}
    message: Use done = true } for this step.
  - notMatch: done\s+=\s+false\s+\}
    message: Replace done = false } in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about a tested task model is correct?
options:
  - A synthesized JSON decoder automatically calls every custom validating initializer.
  - A UI is required before domain logic can be tested.
  - Keep domain validation in an initializer and state changes in named methods. Add tests for empty
    titles, completion, and JSON round trips before adding a UI.
answer: 2
explain: Keep domain validation in an initializer and state changes in named methods. Add tests for
  empty titles, completion, and JSON round trips before adding a UI.
```
