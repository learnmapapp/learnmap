---
title: Custom initialization
icon: "🐣"
branch: types
requires: [structs]
summary: Write your own init to validate input, derive values, or refuse to build a bad instance.
---
The free memberwise initializer is great until your type has **rules**. A percentage must be between 0 and 100. A username can't be empty. That's when you write your own `init`.

Three kinds you'll write, from simplest to strictest:

**1. Convenience defaults.** An initializer that fills in values for the caller:

```swift
struct Color {
    var red, green, blue: Double

    init(gray: Double) {
        red = gray; green = gray; blue = gray
    }
}

let mid = Color(gray: 0.5)
```

**2. Derived values.** Compute stored properties from the input, using `self.` when the parameter has the same name:

```swift
struct Temperature {
    let celsius: Double
    let fahrenheit: Double

    init(celsius: Double) {
        self.celsius = celsius
        self.fahrenheit = celsius * 9 / 5 + 32
    }
}
```

**3. Failable initializers**, written `init?`, which return `nil` when the input doesn't make sense:

```swift title=percent.swift
struct Percentage {
    let value: Int

    init?(_ value: Int) {
        guard (0...100).contains(value) else { return nil }
        self.value = value
    }
}

let ok = Percentage(42)     // Percentage?
let bad = Percentage(150)   // nil
```

You've used failable initializers already: `Int("42")` is one. It gives you an optional because the parsing might fail.

The one hard rule: **every stored property must have a value before `init` finishes.** Forget one and you get *return from initializer without initializing all stored properties*.

A surprise for some: once you write your own `init` inside a struct, the free memberwise one **disappears**. If you want both, put your custom `init` in an [extension](node:extensions), and the memberwise one stays.

```compare kotlin
class Percentage private constructor(val value: Int) {
    companion object {
        fun of(value: Int) = if (value in 0..100) Percentage(value) else null
    }
}
```

```compare python
class Percentage:
    def __init__(self, value):
        if not 0 <= value <= 100:
            raise ValueError("out of range")
        self.value = value
```

```exercise
goal: "A Username can't be empty. Turn the init into a failable `init?` that returns nil for an empty name."
code: |-
  struct Username {
      let name: String

      init(_ name: String) {
          self.name = name
      }
  }
checks:
  - match: 'init\?\(\s*_\s+name\s*:\s*String\s*\)'
    message: Make it failable with init?
  - match: 'guard\s+!name\.isEmpty\s+else\s*\{\s*return\s+nil\s*\}|if\s+name\.isEmpty\s*\{\s*return\s+nil\s*\}'
    message: Return nil when name.isEmpty, for example with guard !name.isEmpty else { return nil }
solution: |-
  struct Username {
      let name: String

      init?(_ name: String) {
          guard !name.isEmpty else { return nil }
          self.name = name
      }
  }
```

```quiz
question: "What's the type of `Percentage(42)` when the initializer is declared `init?(_ value: Int)`?"
options:
  - "`Percentage`"
  - "`Percentage?`"
  - "`Int?`"
answer: 1
explain: A failable initializer always produces an optional, even when the input happens to be valid.
```
