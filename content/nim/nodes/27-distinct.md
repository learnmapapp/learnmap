---
title: Distinct domain types
icon: "🛡️"
branch: data
requires: [types]
summary: distinct creates a new type from an existing one, so the compiler can't mix them up.
---
**A true story.** In 1999, NASA lost the Mars Climate Orbiter. One team's software produced thrust figures in pound-force seconds; another team's software read them as newton-seconds. Both were just numbers, so nothing complained.

In Nim, you can make that mistake impossible:

```nim title=units.nim
type
  Meters = distinct float
  Feet = distinct float

proc toMeters(f: Feet): Meters = Meters(float(f) * 0.3048)

let runway = Meters(3000.0)
let altitude = Feet(1200.0)

echo float(runway)               # 3000.0
echo float(toMeters(altitude))   # 365.76
let total = runway + altitude    # Error: type mismatch
```

A [[distinct type]] has the same memory layout as its base type, so it's exactly as fast. But the compiler treats it as a different type: a `Meters` won't go where a `Feet` or a plain `float` is expected.

**Converting** is explicit, in both directions: `Meters(3000.0)` wraps a float, `float(runway)` unwraps it.

**The catch: operators are gone too.** `distinct` doesn't assume that every `float` operation makes sense for your type. `runway + runway` doesn't compile until you allow it. Borrow the ones you want from the base type:

```nim
proc `+`(a, b: Meters): Meters {.borrow.}
proc `<`(a, b: Meters): bool {.borrow.}
proc `$`(m: Meters): string = $float(m) & " m"

echo runway + runway             # 6000.0 m
```

`{.borrow.}` means "use the base type's implementation". You'd borrow `+` and `<`, but probably not `*`: meters times meters isn't meters.

**Where else it shines**, beyond units:

- **IDs:** `UserId = distinct int` and `OrderId = distinct int`, so you can't pass one for the other.
- **Checked strings:** `Email = distinct string`, only created by a proc that validates it.
- **Currencies:** `Euros` and `Dollars`.

```compare python
from typing import NewType
Meters = NewType("Meters", float)   # checked by type checkers, not at runtime
```

```compare javascript
// No equivalent; TypeScript uses "branded" types as a workaround.
```

```compare rust
struct Meters(f64);   // the newtype pattern
```

```exercise
goal: "Make `UserId` and `OrderId` distinct ints, so the mistaken last line is caught by the compiler."
code: |-
  type
    UserId = int
    OrderId = int

  proc cancel(order: OrderId) = echo "cancelled"

  let user = UserId(42)
  cancel(user)
checks:
  - match: 'UserId\s*=\s*distinct\s+int'
    message: Write UserId = distinct int
  - match: 'OrderId\s*=\s*distinct\s+int'
    message: Write OrderId = distinct int
solution: |-
  type
    UserId = distinct int
    OrderId = distinct int

  proc cancel(order: OrderId) = echo "cancelled"

  let user = UserId(42)
  cancel(user)
```

```quiz
question: "With `type Cents = distinct int`, why doesn't `a + b` compile for two Cents values?"
options:
  - Distinct types can't be added, ever.
  - A distinct type starts without the base type's operators; you borrow the ones that make sense.
  - Cents must be converted to float first.
answer: 1
explain: Declare a + proc for Cents with the borrow pragma to reuse the int version.
```
