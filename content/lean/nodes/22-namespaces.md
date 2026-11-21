---
title: Namespaces
icon: "🗂️"
branch: data
requires: [structures]
summary: Group definitions, and call them with dot notation.
---
A [[namespace]] groups related definitions under a common prefix, so names don't clash:

```lean title=Geometry.lean
structure Point where
  x : Float
  y : Float
deriving Repr

namespace Point

def origin : Point := ⟨0.0, 0.0⟩

def add (p q : Point) : Point := ⟨p.x + q.x, p.y + q.y⟩

def scale (k : Float) (p : Point) : Point := ⟨k * p.x, k * p.y⟩

end Point

#eval Point.add Point.origin ⟨1.0, 2.0⟩
```

Inside `namespace Point ... end Point`, every definition gets the `Point.` prefix: `Point.origin`, `Point.add`, `Point.scale`. You can also just write the full name: `def Point.add ...`.

## Dot notation

Here's the payoff. If `p` is a `Point`, then `p.add q` means `Point.add p q`. Lean looks in the namespace matching the type of `p`, and passes `p` as the **first argument of type `Point`**:

```lean
def a : Point := ⟨1.0, 2.0⟩
def b : Point := ⟨3.0, 4.0⟩

#eval a.add b          -- { x := 4.000000, y := 6.000000 }
#eval a.scale 10.0     -- { x := 10.000000, y := 20.000000 }: p is the second argument here
#eval (a.add b).scale 2.0
```

That's exactly how `"hello".length` and `xs.map f` work: `String.length` and `List.map` live in those namespaces.

## open

`open` makes a namespace's names available without the prefix:

```lean
open Point in
#eval add origin a

open List
#eval map (· + 1) [1, 2]
```

`open X in` applies only to the next command, which keeps the effect small.

```compare python
# modules group names: geometry.add(p, q)
```

```compare typescript
namespace Point { export function add(p: Point, q: Point) { } }
```

```compare kotlin
fun Point.add(q: Point) = Point(x + q.x, y + q.y)  // extension function
```

```compare rust
impl Point { fn add(self, q: Point) -> Point { /* ... */ } }
```

```exercise
goal: "Rename the function to `Book.isLong`, so it can be called as `book.isLong`."
code: |
  structure Book where
    pages : Nat

  def isLong (b : Book) : Bool := b.pages > 500
checks:
  - match: 'def\s+Book\.isLong\s*\(\s*b\s*:\s*Book\s*\)'
    message: "Write def Book.isLong (b : Book)"
solution: |
  structure Book where
    pages : Nat

  def Book.isLong (b : Book) : Bool := b.pages > 500
```

```quiz
question: "`xs : List Nat`. What does `xs.length` mean?"
options:
  - "`List.length xs`"
  - "A field called length stored in xs."
  - "`Nat.length xs`"
answer: 0
explain: "Dot notation looks up length in the List namespace and passes xs as the argument."
```
