---
title: Async functions
icon: "⏳"
branch: concurrency
requires: [functions, errors]
summary: async marks work that waits, and await marks where your code might pause.
---
Ordering in a café is a good mental model for async code. You order, then step aside. The barista doesn't freeze until your flat white is done, and neither do you. When it's ready, your name is called and you carry on.

In Swift, a function that might have to wait (for the network, a file, a timer) is marked **`async`**, and every call to it is marked **`await`**:

```swift title=cafe.swift
func brew(_ drink: String) async -> String {
    try? await Task.sleep(for: .seconds(2))   // pretend this takes a while
    return "☕ \(drink)"
}

func morning() async {
    print("Ordering...")
    let coffee = await brew("flat white")
    print("Got my \(coffee)")
}

await morning()
```

```repl shell
> swift cafe.swift
Ordering...
Got my ☕ flat white
```

**What `await` really means.** It marks a **[[suspension point]]**: a place where this function may pause and give the thread back, so other work can run in the meantime. When the result is ready, the function resumes on the next line. The code still *reads* top to bottom, without callbacks or nested completion handlers.

Three rules to remember:

1. **You can only `await` inside an async context**: another `async` function, or a `Task { ... }`. At the top level of a script (like `cafe.swift` above) Swift allows `await` directly.
2. **`async` and `throws` combine.** A network call is typically `async throws`, and you call it with `try await`, in that order:

```swift
func fetchProfile(id: Int) async throws -> Profile { ... }

let profile = try await fetchProfile(id: 7)
```

3. **`await` is sequential.** Two awaits in a row means the second waits for the first. For running things *at the same time*, see the [next lesson](node:async-let).

Starting async work from regular code, such as a button tap, looks like this:

```swift
Task {
    let profile = try await fetchProfile(id: 7)
    print(profile.name)
}
```

```compare javascript
async function morning() {
  const coffee = await brew("flat white");
}
```

```compare python
async def morning():
    coffee = await brew("flat white")
```

```compare kotlin
suspend fun morning() {
    val coffee = brew("flat white")   // no await keyword in Kotlin
}
```

```exercise
goal: "`loadAvatar` both waits and can fail. Mark it `async throws`, and call it with the right keywords."
code: |-
  func loadAvatar(for user: String) -> Data {
      try await network.get("/avatars/\(user)")
  }

  let avatar = loadAvatar(for: "kim")
checks:
  - match: 'func\s+loadAvatar\(\s*for\s+user\s*:\s*String\s*\)\s*async\s+throws\s*->\s*Data'
    message: Add async throws before the arrow, in that order.
  - match: 'let\s+avatar\s*=\s*try\s+await\s+loadAvatar\(for:\s*"kim"\)'
    message: Call it with try await.
solution: |-
  func loadAvatar(for user: String) async throws -> Data {
      try await network.get("/avatars/\(user)")
  }

  let avatar = try await loadAvatar(for: "kim")
```

```quiz
question: What happens at an `await`?
options:
  - The whole program stops until the result arrives.
  - The function may pause, letting other work use the thread, and resumes when the result is ready.
  - A new thread is always started.
answer: 1
explain: An await is a possible suspension point. The thread isn't blocked; it's free for other tasks.
```
