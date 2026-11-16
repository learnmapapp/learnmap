---
title: Guaranteed cleanup
icon: "🧹"
branch: tools
requires: [functions, errors]
summary: defer runs code when the scope ends, however it ends.
---
**A bug hunt.** This function locks a door, does some work, and unlocks it again. Find the path that leaves the door locked forever:

```swift
func renovate(_ room: Room) throws {
    room.lock()
    if room.isEmpty { return }
    try room.paint()
    try room.replaceFloor()
    room.unlock()
}
```

Got it? There are actually *three*: the early `return`, and a `throw` from either `paint()` or `replaceFloor()`. In each case, `unlock()` is skipped. Every time someone adds another exit, the bug gets another chance.

**`defer`** fixes all of them at once:

```swift title=renovate.swift
func renovate(_ room: Room) throws {
    room.lock()
    defer { room.unlock() }

    if room.isEmpty { return }
    try room.paint()
    try room.replaceFloor()
}
```

A `defer` block runs when the current scope is left, **however** it's left: normal end, `return`, `throw` or `break`. Writing the cleanup right next to the setup means you can see at a glance that they belong together.

The rules, in short:

- `defer` runs at the **end of the enclosing scope**, not the end of the function. A `defer` inside a loop body runs at the end of each iteration.
- **Several defers run in reverse order**, last one first, like unstacking plates. That's exactly right for nested resources: open A, open B, then close B before A.

```swift
func demo() {
    defer { print("1") }
    defer { print("2") }
    print("work")
}
demo()   // work, 2, 1
```

- A defer only runs if execution actually **reached** it. Put it straight after the thing it cleans up, not at the top of the function.

Typical uses: closing files and connections, releasing locks, stopping a timer or a loading spinner, and logging "finished" for a function with many exits.

```compare python
try:
    room.paint()
finally:
    room.unlock()
```

```compare javascript
try { room.paint(); } finally { room.unlock(); }
```

```compare kotlin
try { room.paint() } finally { room.unlock() }
```

```exercise
goal: "The spinner never stops when `fetch()` throws. Add a `defer` right after `start()` that calls `spinner.stop()`, and remove the last line."
code: |-
  func refresh() throws {
      spinner.start()
      try fetch()
      spinner.stop()
  }
checks:
  - match: 'spinner\.start\(\)\s*\n\s*defer\s*\{\s*spinner\.stop\(\)\s*\}'
    message: "Put defer { spinner.stop() } directly after spinner.start()."
  - match: '^[^\n]*try fetch\(\)\s*\n\s*\}'
    message: Remove the old spinner.stop() at the end.
solution: |-
  func refresh() throws {
      spinner.start()
      defer { spinner.stop() }
      try fetch()
  }
```

```quiz
question: "A function has `defer { print(\"A\") }` followed by `defer { print(\"B\") }`. What's printed when it returns?"
options:
  - A then B
  - B then A
  - Only B
answer: 1
explain: Deferred blocks run in reverse order, so the last one registered runs first.
```
