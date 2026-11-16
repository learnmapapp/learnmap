---
title: Dynamic child tasks
icon: "🐝"
branch: concurrency
requires: [async-let, arrays]
summary: When the number of jobs depends on the data, a task group runs them all and collects the results.
---
`async let` needs one line per task. That's fine for three, but how do you download the thumbnails for **every** photo in an album, when an album might have 4 photos or 400?

A **task group** lets you add as many child tasks as you need, in a loop:

```swift title=thumbnails.swift
func thumbnails(for ids: [Int]) async throws -> [Int: Image] {
    try await withThrowingTaskGroup(of: (Int, Image).self) { group in
        for id in ids {
            group.addTask {
                let image = try await downloadThumbnail(id)
                return (id, image)
            }
        }

        var result: [Int: Image] = [:]
        for try await (id, image) in group {
            result[id] = image
        }
        return result
    }
}
```

Let's take it apart:

| Piece | What it does |
| --- | --- |
| `withThrowingTaskGroup(of: (Int, Image).self)` | Opens a group. Every child returns an `(Int, Image)`. |
| `group.addTask { ... }` | Starts one child task. They all run concurrently. |
| `for try await ... in group` | Receives results **as they finish**, not in the order they were added. |
| `return result` | The group's value becomes the function's result. |

Why return `(id, image)` and not just the image? Because results arrive in **completion order**. If photo 9 downloads faster than photo 2, it arrives first. Carrying the id along lets you put every image in the right place.

Like `async let`, a task group is **structured**:

- The function can't return until every child has finished.
- If any child throws, the error comes out of `for try await`, and the remaining children are cancelled.

Use `withTaskGroup` (no "Throwing") when the children can't fail.

**Careful with very large inputs.** Adding 10,000 tasks at once means 10,000 downloads competing. A common pattern is to add a handful of tasks first, then add a new one each time a result comes in. That keeps, say, at most 5 running at a time.

```compare javascript
const images = await Promise.all(ids.map(id => downloadThumbnail(id)));
```

```compare python
async with asyncio.TaskGroup() as tg:
    tasks = [tg.create_task(download_thumbnail(i)) for i in ids]
```

```compare kotlin
val images = ids.map { id -> async { downloadThumbnail(id) } }.awaitAll()
```

```exercise
goal: "Start one child task per URL: inside the loop, call `group.addTask` and return `try await fetch(url)` from it."
code: |-
  let pages = try await withThrowingTaskGroup(of: String.self) { group in
      for url in urls {
          let page = try await fetch(url)
      }
      var all: [String] = []
      for try await page in group { all.append(page) }
      return all
  }
checks:
  - match: 'for\s+url\s+in\s+urls\s*\{\s*group\.addTask\s*\{\s*(return\s+)?try\s+await\s+fetch\(url\)\s*\}'
    message: "Inside the loop write: group.addTask { try await fetch(url) }"
solution: |-
  let pages = try await withThrowingTaskGroup(of: String.self) { group in
      for url in urls {
          group.addTask { try await fetch(url) }
      }
      var all: [String] = []
      for try await page in group { all.append(page) }
      return all
  }
```

```quiz
question: In which order does `for try await result in group` deliver results?
options:
  - The order the tasks were added.
  - The order the tasks finish.
  - Random, but the same each run.
answer: 1
explain: Results arrive as soon as each child finishes, so faster tasks come first.
```
