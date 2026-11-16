---
title: Isolated actor state
icon: "🎭"
branch: concurrency
requires: [classes, async]
summary: An actor protects its state by letting only one task in at a time, and the compiler enforces it.
---
**The race.** A class keeps a ticket counter for a concert, and a thousand fans try to buy at the same moment:

```swift
final class BoxOffice {
    var ticketsLeft = 100

    func buy() -> Bool {
        guard ticketsLeft > 0 else { return false }
        ticketsLeft -= 1
        return true
    }
}
```

Run `buy()` from many tasks at once, and two of them can both read `ticketsLeft == 1`, both pass the guard, and both sell the last ticket. That's a **data race**: a bug that shows up once in a thousand runs and never on your machine. (Swift 6 won't even compile code that shares this class across tasks, which is how you'd find out.)

The fix is one word. Change `class` to **`actor`**:

```swift title=tickets.swift
actor BoxOffice {
    var ticketsLeft = 100

    func buy() -> Bool {
        guard ticketsLeft > 0 else { return false }
        ticketsLeft -= 1
        return true
    }
}

let office = BoxOffice()

await withTaskGroup(of: Bool.self) { group in
    for _ in 1...1_000 {
        group.addTask { await office.buy() }
    }
}

print(await office.ticketsLeft)   // 0, never -1
```

An **[[actor]]** is like a class, but it handles callers **one at a time**. Think of a shop with a single counter: however many customers arrive, the clerk serves one before starting on the next. Inside the actor, your code can treat the state as if nobody else exists.

The price is **`await` from the outside.** Calling `office.buy()` from outside means you might have to queue for a bit, so it's an async call, even though `buy()` isn't marked `async`. Inside the actor, its own methods call each other directly, without `await`.

Two things to know:

- **Actor methods can still suspend.** If `buy()` itself awaited something, other callers could run in that gap. State you checked before an `await` might have changed after it. So re-check, or do the check and the update without an await in between.
- **`@MainActor`** is a special, global actor for the main thread. UI code in SwiftUI and UIKit runs on it, and marking a class `@MainActor` makes sure all of its code does too.

Values that are passed into or out of actors need to be safe to share. Swift calls that **`Sendable`**: structs and enums made of Sendable parts usually are, automatically. That's one more reason value types are the default in Swift.

```compare kotlin
// Kotlin needs a Mutex or a single-threaded dispatcher for this:
mutex.withLock { ticketsLeft-- }
```

```compare javascript
// JavaScript runs one thing at a time on its event loop, so this race can't happen there.
```

```compare rust
let tickets = Arc::new(Mutex::new(100));
```

```exercise
goal: "`Wallet` is used from many tasks at once. Make it an actor."
code: |-
  final class Wallet {
      var coins = 0
      func add(_ n: Int) { coins += n }
  }
checks:
  - match: '^\s*actor\s+Wallet'
    message: Replace final class with actor.
  - notMatch: 'class\s+Wallet'
    message: It shouldn't be a class any more.
solution: |-
  actor Wallet {
      var coins = 0
      func add(_ n: Int) { coins += n }
  }
```

```quiz
question: "Why does calling `wallet.add(5)` on an actor from outside need `await`?"
options:
  - Because add is secretly marked async.
  - Because the call may have to wait until the actor has finished serving another caller.
  - Because actors always run on a background thread.
answer: 1
explain: The actor serves one caller at a time, so a call from outside is a possible suspension point.
```
