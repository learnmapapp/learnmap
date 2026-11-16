---
title: Optional fallback
icon: "🪂"
branch: data
requires: [optionals]
summary: "?? gives you the value, or a sensible default when there isn't one."
---
Lots of missing values have an obvious stand-in. No display name? Show "Anonymous". No saved volume? Use 50. For those cases, unwrapping with `if let` is overkill. Use the **nil-coalescing operator** `??`:

```swift title=settings.swift
let saved: [String: Int] = ["brightness": 80]

let brightness = saved["brightness"] ?? 50
let volume = saved["volume"] ?? 50

print("Brightness \(brightness), volume \(volume)")
// Brightness 80, volume 50
```

`a ?? b` means "the value inside `a` if there is one, otherwise `b`". The result is **not** optional: `brightness` is a plain `Int`. That's the big win.

The two sides need matching types. `optionalInt ?? "none"` won't compile, because the result has to be either an Int or a String, not sometimes one and sometimes the other. When you want text, convert first:

```swift
let label = saved["contrast"].map { "\($0)%" } ?? "auto"   // map converts the Int inside, if there is one
```

You can **chain** fallbacks, and Swift takes the first one that has a value:

```swift
let name = user.nickname ?? user.firstName ?? "friend"
```

The right side is only evaluated **when it's needed**. So `cache[key] ?? expensiveLookup(key)` won't do the expensive lookup when the cache already has the answer.

A small warning: `??` makes things *quietly* fine. That's perfect for real defaults, but if a missing value actually means something went wrong, a silent `?? 0` can hide a bug. Then `guard` with an error message is the honest choice.

```compare kotlin
val volume = saved["volume"] ?: 50   // the "Elvis operator"
```

```compare javascript
const volume = saved.volume ?? 50;
```

```compare python
volume = saved.get("volume", 50)
```

```exercise
goal: Replace the four-line if let with a single line using ??.
code: |-
  var title = "Untitled"
  if let given = doc.title {
      title = given
  }
checks:
  - match: 'let\s+title\s*=\s*doc\.title\s*\?\?\s*"Untitled"'
    message: 'Write: let title = doc.title ?? "Untitled"'
  - notMatch: 'if\s+let'
    message: The if let can go.
solution: |-
  let title = doc.title ?? "Untitled"
```

```quiz
question: "`let n: Int? = nil; let x = n ?? 7` — what's the type of `x`?"
options:
  - "`Int?`"
  - "`Int`"
  - "`Int` or `nil`, depending on n"
answer: 1
explain: "?? always produces a value, so the result is a plain Int (7 here)."
```
