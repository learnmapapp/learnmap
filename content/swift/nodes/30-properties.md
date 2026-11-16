---
title: Computed properties
icon: "🧮"
branch: types
requires: [structs]
summary: Properties that calculate their value, and observers that react when one changes.
---
A rectangle has a width and a height. Does it also *store* its area? If it did, you'd have to remember to update the area whenever the width changed, and one day someone would forget.

A **computed property** looks like a property to the caller, but runs code every time it's read:

```swift title=shapes.swift
struct Rectangle {
    var width: Double
    var height: Double

    var area: Double {
        width * height
    }

    var isSquare: Bool {
        width == height
    }
}

var r = Rectangle(width: 3, height: 4)
print(r.area)      // 12.0
r.width = 4
print(r.area)      // 16.0, always up to date
print(r.isSquare)  // true
```

Callers write `r.area`, without parentheses, and can't tell whether it's stored or computed. That's the point: you can switch between the two later without changing any calling code.

**Property or method?** Swift convention: use a computed property when it's cheap, has no side effects, and feels like a *fact about* the value (`count`, `isEmpty`, `area`). Use a method when it does work, takes arguments or might be slow (`sorted()`, `save()`).

Computed properties can also have a **setter**, which translates a new value back into stored ones:

```swift
struct Temperature {
    var celsius: Double
    var fahrenheit: Double {
        get { celsius * 9 / 5 + 32 }
        set { celsius = (newValue - 32) * 5 / 9 }
    }
}
```

**Property observers** go the other way: a *stored* property that runs code when it changes. `didSet` is the one you'll use most, and `oldValue` holds the previous value:

```swift
struct Player {
    var score = 0 {
        didSet {
            if score > oldValue { print("🎉 +\(score - oldValue)") }
        }
    }
}

var p = Player()
p.score += 10   // 🎉 +10
```

Observers are handy for logging, keeping things in sync, or clamping a value. Keep them light: if `didSet` grows into a big block of logic, a method with a clear name is usually easier to follow.

```compare kotlin
val area: Double get() = width * height
```

```compare python
@property
def area(self):
    return self.width * self.height
```

```compare javascript
get area() { return this.width * this.height; }
```

```exercise
goal: "`fullName` gets out of date when the first or last name changes. Turn it into a computed property."
code: |-
  struct Person {
      var first: String
      var last: String
      var fullName: String = ""
  }
checks:
  - match: 'var\s+fullName\s*:\s*String\s*\{[^}]*first[^}]*last[^}]*\}'
    message: 'Write var fullName: String { "\(first) \(last)" }'
  - notMatch: 'fullName\s*:\s*String\s*='
    message: A computed property has a body in braces, not = ""
solution: |-
  struct Person {
      var first: String
      var last: String
      var fullName: String {
          "\(first) \(last)"
      }
  }
```

```quiz
question: What does `oldValue` refer to inside `didSet`?
options:
  - The value the property had before the change.
  - The initial value from when the instance was created.
  - The value that's about to be set.
answer: 0
explain: In didSet the property already holds the new value, and oldValue is the previous one. In willSet you get newValue instead.
```
