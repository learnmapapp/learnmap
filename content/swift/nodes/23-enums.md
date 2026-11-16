---
title: Enumerated cases
icon: "🚥"
branch: types
requires: [switch]
summary: Model a fixed set of choices as a type, and let switch check you've handled them all.
---
A traffic light is red, amber or green. Nothing else. If you store that as a `String`, nothing stops `"purple"` or `"Red"` sneaking in. An **[[enum]]** makes the set of possibilities part of the type:

```swift title=traffic.swift
enum Light {
    case red, amber, green

    var next: Light {
        switch self {
        case .red: .green
        case .green: .amber
        case .amber: .red
        }
    }
}

var light = Light.red
for _ in 1...4 {
    print(light)
    light = light.next
}
```

```repl shell
> swift traffic.swift
red
green
amber
red
```

Things worth noticing:

- **Dot shorthand.** Once Swift knows the type, you can write `.green` instead of `Light.green`. You'll see this everywhere in Swift code.
- **Enums have members.** `next` is a [computed property](node:properties) living right inside the enum.
- **The switch has no `default`.** It doesn't need one, because all three cases are listed. And this is the real superpower: add `case flashing` later, and the compiler points at every switch that doesn't handle it yet.

**Raw values** connect cases to a String or Int, which is handy for storage or display:

```swift
enum Planet: Int {
    case mercury = 1, venus, earth   // venus = 2, earth = 3
}
print(Planet.earth.rawValue)          // 3
print(Planet(rawValue: 2))            // Optional(venus) -- 9 would give nil
```

With a `String` raw type, each case's raw value defaults to its name. And add **`CaseIterable`** to get a list of all cases for free:

```swift
enum Size: String, CaseIterable { case small, medium, large }
print(Size.allCases.map(\.rawValue))  // ["small", "medium", "large"]
```

```compare typescript
type Light = "red" | "amber" | "green";
```

```compare kotlin
enum class Light { RED, AMBER, GREEN }
```

```compare python
from enum import Enum
class Light(Enum):
    RED = 1
    AMBER = 2
    GREEN = 3
```

```exercise
goal: "Strings are too loose for a coffee size. Replace the variable with an enum `Size` with cases small, medium and large, and set `order` to `.medium`."
code: |-
  var order = "medium"
checks:
  - match: 'enum\s+Size\s*(:[^{]*)?\{[^}]*case\s+small\s*,\s*medium\s*,\s*large'
    message: Declare enum Size { case small, medium, large }
  - match: 'var\s+order(\s*:\s*Size)?\s*=\s*(Size)?\.medium'
    message: "Set order to .medium (write var order: Size = .medium)."
solution: |-
  enum Size {
      case small, medium, large
  }

  var order: Size = .medium
```

```quiz
question: Why can a switch over an enum often skip `default`?
options:
  - Because enums can't be compared.
  - Because listing every case already makes it exhaustive, and the compiler warns when a new case appears.
  - Because default is not allowed for enums.
answer: 1
explain: Skipping default is a feature. Adding a case later turns every incomplete switch into a compile error.
```
