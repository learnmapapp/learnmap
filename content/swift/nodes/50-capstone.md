---
title: A tested task model
icon: "🏁"
branch: tools
requires: [codable, guard, protocols, testing]
summary: Put structs, enums, guard, Codable and tests together in one small, sturdy model.
---
Time to build something real with what you've learned: the model layer of a little to-do app. No UI, just the part that has to be *right*. Here's the brief:

> A task has a title and a priority. Titles can't be blank. Tasks can be completed. The list can be saved as JSON and loaded back. And it's all tested.

Each requirement maps onto something from the course. Here's the whole thing, with a note on where each idea came from:

```swift title=Sources/Tasks/Task.swift
import Foundation

enum Priority: String, Codable, CaseIterable, Comparable {   // enums, raw values
    case low, normal, high

    static func < (a: Priority, b: Priority) -> Bool {        // protocols
        allCases.firstIndex(of: a)! < allCases.firstIndex(of: b)!
    }
}

struct TodoItem: Codable, Equatable, Identifiable {          // structs, Codable
    let id: UUID
    private(set) var title: String
    var priority: Priority
    private(set) var isDone = false

    init?(_ title: String, priority: Priority = .normal) {     // failable init, defaults
        let trimmed = title.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return nil }             // guard
        self.id = UUID()
        self.title = trimmed
        self.priority = priority
    }

    mutating func complete() { isDone = true }                // mutating
}

extension [TodoItem] {                                        // extensions
    var open: [TodoItem] {
        filter { !$0.isDone }.sorted { $0.priority > $1.priority }   // closures, map/filter
    }
}
```

(We call it `TodoItem` rather than `Task`, because Swift already has a `Task` type for concurrency.)

A few design choices worth pointing out:

- **`init?` makes invalid tasks unrepresentable.** If you hold a `TodoItem`, its title isn't blank. Nobody has to check again.
- **`private(set)`** means anyone can *read* `title` and `isDone`, but only the type itself can change them. Completing a task has to go through `complete()`.
- **Codable comes for free**, because every property is Codable already.

And the tests, which also document how the model behaves:

```swift title=Tests/TasksTests/TaskTests.swift
import Foundation
import Testing
@testable import Tasks

@Test func blankTitlesAreRejected() {
    #expect(TodoItem("   ") == nil)
}

@Test func openTasksAreSortedByPriority() throws {
    var chores = try #require(TodoItem("Dishes", priority: .low))
    let taxes = try #require(TodoItem("Taxes", priority: .high))
    let call = try #require(TodoItem("Call mum"))
    chores.complete()

    #expect([chores, taxes, call].open.map(\.title) == ["Taxes", "Call mum"])
}

@Test func roundTripsThroughJSON() throws {
    let original = [try #require(TodoItem("Write tests", priority: .high))]
    let data = try JSONEncoder().encode(original)
    let decoded = try JSONDecoder().decode([TodoItem].self, from: data)
    #expect(decoded == original)
}
```

```repl shell
> swift test
✔ Test blankTitlesAreRejected() passed.
✔ Test openTasksAreSortedByPriority() passed.
✔ Test roundTripsThroughJSON() passed.
✔ Test run with 3 tests passed.
```

**Where to go from here?** Some ideas to stretch it: add a due date (`Date` is Codable too), save the list to a file with the [files lesson](node:files), wrap the list in an [actor](node:actors) so several tasks can update it safely, or put a SwiftUI screen on top. Congratulations on finishing the Swift map! 🎉

```exercise
goal: "Add the missing test: a title with spaces around it should be trimmed. Mark it `@Test`, and expect that `TodoItem(\"  Walk  \")?.title` equals \"Walk\"."
code: |-
  func titlesAreTrimmed() {
  }
checks:
  - match: '@Test\s+func\s+titlesAreTrimmed\(\)'
    message: Mark the function with @Test.
  - match: '#expect\(\s*TodoItem\("\s+Walk\s+"\)\?\.title\s*==\s*"Walk"\s*\)'
    message: 'Write #expect(TodoItem("  Walk  ")?.title == "Walk")'
solution: |-
  @Test func titlesAreTrimmed() {
      #expect(TodoItem("  Walk  ")?.title == "Walk")
  }
```

```quiz
question: "Why does `TodoItem` use `private(set) var isDone`?"
options:
  - So the property can't be encoded to JSON.
  - So other code can read isDone, but can only change it through complete().
  - So the property is hidden from tests.
answer: 1
explain: private(set) keeps the getter visible and makes the setter private to the type.
```
