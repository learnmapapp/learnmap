---
title: Pattern matching
icon: "🧩"
branch: data
requires: [inductive]
summary: Take values apart by their constructors with match.
---
[[pattern matching|Pattern matching]] checks which constructor built a value, and gives names to the data inside it:

```lean title=Shapes.lean
inductive Shape where
  | circle (radius : Float)
  | rect (width height : Float)

def area (s : Shape) : Float :=
  match s with
  | .circle r => 3.14159 * r * r
  | .rect w h => w * h

#eval area (.circle 1.0)    -- 3.141590
#eval area (.rect 2.0 3.0)  -- 6.000000
```

Each line starting with `|` is a **case**: a pattern, `=>`, and the result. In `.rect w h`, the names `w` and `h` are bound to the rectangle's width and height.

## Lean checks every case

If you forget a constructor, Lean refuses the definition:

```lean
def describe (s : Shape) : String :=
  match s with
  | .circle _ => "round"
-- error: missing cases: (Shape.rect _ _)
```

The underscore `_` matches anything and ignores it.

## Matching numbers and more

You can match on literals and several values at once:

```lean
def fizz (n : Nat) : String :=
  match n % 3, n % 5 with
  | 0, 0 => "FizzBuzz"
  | 0, _ => "Fizz"
  | _, 0 => "Buzz"
  | _, _ => toString n
```

Cases are tried from top to bottom.

## A shorter form

When a function matches on its last argument right away, you can leave out `match` and the parameter name:

```lean
def isRound : Shape → Bool
  | .circle _ => true
  | .rect _ _ => false
```

You'll see this style a lot, especially for recursive functions.

```compare python
match s:
    case Circle(r): return 3.14 * r * r
    case Rect(w, h): return w * h
```

```compare typescript
switch (s.kind) { case "circle": return 3.14 * s.radius ** 2; case "rect": return s.width * s.height; }
```

```compare kotlin
when (s) { is Circle -> 3.14 * s.r * s.r; is Rect -> s.w * s.h }
```

```compare rust
match s { Shape::Circle(r) => 3.14 * r * r, Shape::Rect(w, h) => w * h }
```

```exercise
goal: "`toSpanish` is missing the `.blue` case. Add it, returning `\"azul\"`."
code: |
  inductive Color where
    | red | green | blue

  def toSpanish : Color → String
    | .red => "rojo"
    | .green => "verde"
checks:
  - match: '\|\s*\.blue\s*=>\s*"azul"'
    message: "Add | .blue => \"azul\""
solution: |
  inductive Color where
    | red | green | blue

  def toSpanish : Color → String
    | .red => "rojo"
    | .green => "verde"
    | .blue => "azul"
```

```quiz
question: "What happens if a match doesn't handle every constructor?"
options:
  - "The missing cases return a default value."
  - "Lean rejects the definition with a missing cases error."
  - "It crashes when a missing case is reached."
answer: 1
explain: "Lean checks that matches are exhaustive, so every function is defined for every input."
```
