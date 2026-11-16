---
title: Exhaustive switch
icon: "🎛️"
branch: flow
requires: [if]
summary: switch on ranges, tuples and patterns, with no fall-through and nothing forgotten.
---
If you've only seen `switch` in C, Java or JavaScript, prepare to be pleasantly surprised. Swift's version is one of its best features.

```swift title=grades.swift
func grade(for score: Int) -> String {
    switch score {
    case 90...100:
        return "A 🌟"
    case 80..<90:
        return "B"
    case 70..<80:
        return "C"
    case 0..<70:
        return "Keep practising"
    default:
        return "Invalid score"
    }
}

print(grade(for: 85))  // B
```

What's different from C-style switches:

- **No `break` needed, and no accidental fall-through.** Exactly one case runs. (If you ever really want fall-through, there's a `fallthrough` keyword, but you'll almost never use it.)
- **Cases can be ranges**: `90...100` includes 100, `80..<90` stops before 90.
- **It must be exhaustive.** Every possible value needs a case. An `Int` has billions of values, so `default` is required here. For an [[enum]], listing every case is enough, and then the compiler will tell you when a new case is added.
- **Several values per case**: `case "a", "e", "i", "o", "u":`.

It gets better. You can switch on a **tuple** and match parts of it, with `_` meaning "anything":

```swift
let point = (0, 5)
switch point {
case (0, 0):
    print("origin")
case (0, _):
    print("on the y-axis")
case (let x, 0):
    print("on the x-axis at \(x)")
default:
    print("somewhere else")
}
```

`let x` binds part of the value to a name, for use in that case. And you can add conditions with `where`: `case let n where n.isMultiple(of: 2):`.

```compare javascript
switch (score) {
  case 90: // only exact values; ranges need if/else
    grade = "A";
    break;  // forget this and you fall through
}
```

```compare kotlin
when (score) {
    in 90..100 -> "A"
    in 80 until 90 -> "B"
    else -> "Keep practising"
}
```

```exercise
goal: Add a case so that "x" and "y" both return "coordinate". Use one case with two values.
code: |-
  func describe(_ key: String) -> String {
      switch key {
      case "name":
          return "label"
      default:
          return "unknown"
      }
  }
checks:
  - match: 'case\s+"x"\s*,\s*"y"\s*:'
    message: 'Write one case with both values: case "x", "y":'
  - match: 'return\s+"coordinate"'
    message: Return "coordinate" from the new case.
solution: |-
  func describe(_ key: String) -> String {
      switch key {
      case "name":
          return "label"
      case "x", "y":
          return "coordinate"
      default:
          return "unknown"
      }
  }
```

```quiz
question: "Which values does `case 1..<4:` match?"
options:
  - 1, 2 and 3
  - 1, 2, 3 and 4
  - 2 and 3
answer: 0
explain: "..< is a half-open range: it includes the start and stops before the end."
```
