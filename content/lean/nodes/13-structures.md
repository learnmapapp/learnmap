---
title: Structures
icon: "📦"
branch: data
requires: [functions]
summary: Group named fields into your own type.
---
A [[structure]] bundles several named fields into one type:

```lean title=Points.lean
structure Point where
  x : Float
  y : Float
deriving Repr

def origin : Point := { x := 0.0, y := 0.0 }
def p : Point := { x := 3.0, y := 4.0 }

#eval p.x       -- 3.000000
#eval p         -- { x := 3.000000, y := 4.000000 }
```

`deriving Repr` lets `#eval` print the structure. Without it, Lean doesn't know how to show a `Point`.

## Three ways to build one

```lean
def a : Point := { x := 1.0, y := 2.0 }  -- named fields
def b : Point := Point.mk 1.0 2.0        -- the constructor, in field order
def c : Point := ⟨1.0, 2.0⟩              -- anonymous constructor (type \<>)
```

Every structure gets a constructor called `mk`. The angle brackets `⟨ ⟩` are a shorthand that works whenever Lean knows which type you want.

## Updating means copying

Values never change, so "updating" a field makes a **new** value with one field different:

```lean
def moved := { p with x := 10.0 }

#eval moved  -- { x := 10.000000, y := 4.000000 }
#eval p      -- unchanged: { x := 3.000000, y := 4.000000 }
```

## Functions on structures

```lean
def distance (a b : Point) : Float :=
  Float.sqrt ((b.x - a.x) ^ 2 + (b.y - a.y) ^ 2)

#eval distance origin p  -- 5.000000
```

Fields can have default values too: `count : Nat := 0`.

```compare python
@dataclass(frozen=True)
class Point:
    x: float
    y: float
```

```compare typescript
type Point = { readonly x: number; readonly y: number };
```

```compare kotlin
data class Point(val x: Double, val y: Double)
val moved = p.copy(x = 10.0)
```

```compare rust
struct Point { x: f64, y: f64 }
let moved = Point { x: 10.0, ..p };
```

```exercise
goal: "Define a structure `Book` with fields `title : String` and `pages : Nat`."
code: |
  structure Book where
checks:
  - match: 'structure\s+Book\s+where\s*\n\s+title\s*:\s*String\s*\n\s+pages\s*:\s*Nat'
    message: "Add title : String and pages : Nat on their own lines, indented."
solution: |
  structure Book where
    title : String
    pages : Nat
```

```quiz
question: "What does `{ p with y := 0.0 }` do?"
options:
  - "Changes p's y field to 0.0."
  - "Creates a new Point like p, but with y set to 0.0."
  - "Checks whether p.y is 0.0."
answer: 1
explain: "Values never change in Lean; with builds a copy that differs in the listed fields."
```
