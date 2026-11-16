---
title: Variant objects
icon: "🔀"
branch: data
requires: [enums, objects]
summary: An object whose fields depend on an enum, so each kind carries exactly the data it needs.
---
**FAQ: shapes, and why one object can't fit them all.**

**Q: I need circles and rectangles. What's wrong with one object for both?**

```nim
type Shape = object
  isCircle: bool
  radius: float      # only for circles
  width, height: float   # only for rectangles
```

Nothing stops you from reading `width` on a circle and getting a meaningless `0.0`. The type allows nonsense.

**Q: What's the alternative?**

A [[variant object]]: an object with a `case` *inside the type*. An enum field, the *discriminator*, decides which other fields exist:

```nim title=shapes.nim
import std/math

type
  ShapeKind = enum
    circle, rect

  Shape = object
    name: string             # every shape has a name
    case kind: ShapeKind
    of circle:
      radius: float
    of rect:
      width, height: float

func area(s: Shape): float =
  case s.kind
  of circle: PI * s.radius * s.radius
  of rect: s.width * s.height

let shapes = @[
  Shape(name: "coin", kind: circle, radius: 1.0),
  Shape(name: "door", kind: rect, width: 0.9, height: 2.1),
]
for s in shapes:
  echo s.name, ": ", s.area
```

**Q: What if I read the wrong field?**

`shapes[0].width` raises a `FieldDefect` at runtime, explaining that `width` isn't accessible when `kind` is `circle`. Wrong data access stops loudly instead of returning garbage.

**Q: Can I change the kind later?**

Not by assigning `s.kind = rect` on an existing value; that would leave the `rect` fields uninitialized. Create a new `Shape` with the new kind instead.

**Q: Why put both shapes in one type, instead of two objects?**

So they can live in one `seq[Shape]`, be passed to one `area` proc, and be handled with a `case` that the compiler checks for completeness, just like with [enums](node:enums). Add a `triangle` kind, and every `case s.kind` that forgot it fails to compile.

**Q: Where would I use this for real?**

Anywhere a value is "one of several kinds": JSON values (Nim's own `JsonNode` is a variant), tokens in a parser, events in a game, results that are either success or failure.

```compare python
@dataclass
class Circle: radius: float
@dataclass
class Rect: width: float; height: float
Shape = Circle | Rect
```

```compare javascript
// A discriminated union in TypeScript:
// type Shape = { kind: "circle"; radius: number } | { kind: "rect"; width: number; height: number };
```

```compare rust
enum Shape {
    Circle { radius: f64 },
    Rect { width: f64, height: f64 },
}
```

```exercise
goal: "Add a `square` kind with one field, `side: float`: add it to the enum, give it an `of square:` branch in the type, and handle it in `area` with `s.side * s.side`."
code: |-
  type
    ShapeKind = enum
      circle, rect

    Shape = object
      case kind: ShapeKind
      of circle:
        radius: float
      of rect:
        width, height: float

  func area(s: Shape): float =
    case s.kind
    of circle: 3.14159 * s.radius * s.radius
    of rect: s.width * s.height
checks:
  - match: 'circle\s*,\s*rect\s*,\s*square'
    message: 'The enum should read: circle, rect, square'
  - match: 'of\s+square\s*:\s*\n\s+side\s*:\s*float'
    message: 'Add of square: with the field side: float to the type.'
  - match: 'of\s+square\s*:\s*s\.side\s*\*\s*s\.side'
    message: 'Add of square: s.side * s.side to area.'
solution: |-
  type
    ShapeKind = enum
      circle, rect, square

    Shape = object
      case kind: ShapeKind
      of circle:
        radius: float
      of rect:
        width, height: float
      of square:
        side: float

  func area(s: Shape): float =
    case s.kind
    of circle: 3.14159 * s.radius * s.radius
    of rect: s.width * s.height
    of square: s.side * s.side
```

```quiz
question: "`let c = Shape(kind: circle, radius: 2.0)`. What happens on `echo c.width`?"
options:
  - It prints 0.0.
  - It raises a FieldDefect, because circles have no width.
  - It prints the radius.
answer: 1
explain: Variant fields are checked against the kind. Reading the wrong one stops the program.
```
