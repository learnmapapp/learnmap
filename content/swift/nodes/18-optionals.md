---
title: Optional values
icon: "📦"
branch: data
requires: [types]
summary: "Maybe a value, maybe nil: how Swift makes \"might be missing\" part of the type."
---
Tony Hoare, who invented the null reference, later called it his "billion-dollar mistake". In most languages any object might secretly be null, and you find out at runtime.

Swift's answer: a normal `String` can **never** be nil. If a value might be missing, its type says so with a question mark:

```swift
var nickname: String? = nil   // might hold a String, currently doesn't
nickname = "Ace"              // now it does
```

`String?` is an **[[optional]]** String. Think of it as a box that either contains a String or is empty.

Where do optionals come from? Anywhere the honest answer is "maybe":

```swift title=maybe.swift
let age = Int("42")          // Int?  -- "forty-two" wouldn't parse
let first = [3, 1, 4].first  // Int?  -- the array might be empty
let user = ["id": 7]["name"] // Int?  -- the key might not exist
```

The crucial rule: **you can't use the value without opening the box first.**

```swift title=age.swift
let age = Int("42")
print(age + 1)
```

```repl shell
> swift age.swift
error: value of optional type 'Int?' must be unwrapped to a value of type 'Int'
```

That error is the whole point. The compiler won't let you forget the "missing" case. The next few lessons show the ways to unwrap, from safest to bluntest:

| Tool | Use it when | Lesson |
| --- | --- | --- |
| `if let` | do something only when there's a value | [Optional binding](node:if-let) |
| `guard let` | bail out early when there isn't | [guard](node:guard) |
| `??` | a fallback value makes sense | [Fallback](node:coalescing) |
| `?.` | reaching through a chain of maybes | [Chaining](node:chaining) |
| `!` | you're *certain*, and a crash is acceptable otherwise | — |

That last one, the **force unwrap** `age!`, crashes the program if the box is empty. It has its uses (in tests, or for values that can't be missing in practice), but if you're reaching for it to make an error go away, pick one of the others.

```compare kotlin
// Kotlin has the same idea:
var nickname: String? = null
```

```compare typescript
let nickname: string | undefined = undefined;
```

```compare python
nickname: str | None = None   # only a hint; Python won't stop you
```

```exercise
goal: "A user might not have a middle name. Change the declaration so `middleName` can be nil."
code: |-
  var middleName: String = nil
checks:
  - match: 'var\s+middleName\s*:\s*String\?\s*=\s*nil'
    message: Make the type an optional String with String?
solution: |-
  var middleName: String? = nil
```

```quiz
question: "What's the type of `Int(\"12a\")`?"
options:
  - "`Int`, with the value 0"
  - "`Int?`, with the value nil"
  - It's a compile error.
answer: 1
explain: Parsing can fail, so Int(String) returns an optional. "12a" doesn't parse, so it's nil.
```
