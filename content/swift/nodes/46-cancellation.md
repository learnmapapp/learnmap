---
title: Cooperative cancellation
icon: "🛑"
branch: concurrency
requires: [async, errors]
summary: Cancelling a task only sets a flag. Your code decides when to look at it and stop.
---
A user types "swi" into a search box. You start a search. Then they type "swif", and you start another one. The first search is now pointless, so you cancel it:

```swift
searchTask?.cancel()
searchTask = Task { try await search(for: text) }
```

Here's the surprise: **`cancel()` doesn't stop anything by itself.** It doesn't kill the task halfway through a line. It just sets a flag that says "please stop". The task has to *notice* that flag and stop itself. That's why Swift calls it **cooperative** cancellation.

Two ways to notice:

```swift title=search.swift
func search(for text: String) async throws -> [Result] {
    var found: [Result] = []
    for shard in allShards {
        try Task.checkCancellation()          // 1. throws CancellationError if cancelled
        found += try await shard.lookup(text)
    }
    return found
}

func indexPhotos(_ photos: [Photo]) async -> Int {
    var done = 0
    for photo in photos {
        if Task.isCancelled { break }         // 2. check the flag, and stop your own way
        await index(photo)
        done += 1
    }
    return done                               // partial progress is still useful
}
```

| | `try Task.checkCancellation()` | `Task.isCancelled` |
| --- | --- | --- |
| What happens | throws `CancellationError` | gives you a Bool |
| Good for | "half a result is useless, just abort" | "stop early, but return what's done so far" |

**Where should the checks go?** At the start of each round of a loop, and before any expensive step. A loop that never checks will happily run to the end, cancelled or not.

**The good news:** many built-in async functions already check for you. `Task.sleep` throws as soon as its task is cancelled, and so do URLSession requests. And cancellation **flows downwards** automatically: cancel a task, and all of its child tasks (`async let`s and task group children) are cancelled too.

A tidy trick: clean up after cancellation with [`defer`](node:defer), which runs whether the function returns normally or throws `CancellationError`.

```compare javascript
// JS uses an AbortController and signal, also cooperative:
if (signal.aborted) return;
```

```compare kotlin
// Kotlin coroutines are cooperative too:
ensureActive()   // like Task.checkCancellation()
```

```compare python
# asyncio raises CancelledError at the next await instead.
```

```exercise
goal: "This loop ignores cancellation. Add `try Task.checkCancellation()` as the first line of the loop body."
code: |-
  for chunk in chunks {
      try await upload(chunk)
  }
checks:
  - match: 'for\s+chunk\s+in\s+chunks\s*\{\s*try\s+Task\.checkCancellation\(\)'
    message: Put try Task.checkCancellation() at the top of the loop body.
solution: |-
  for chunk in chunks {
      try Task.checkCancellation()
      try await upload(chunk)
  }
```

```quiz
question: "What does `task.cancel()` do to a task that never checks for cancellation?"
options:
  - It stops the task immediately.
  - It sets a flag, but the task keeps running until it checks the flag or reaches something that does.
  - It throws an error at the line that called cancel().
answer: 1
explain: Cancellation in Swift is cooperative. It's a request that the task must check for.
```
