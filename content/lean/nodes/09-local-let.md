---
title: Local definitions
icon: "📌"
branch: basics
requires: [functions]
summary: Name intermediate results inside a function with let.
---
Inside a definition, `let` gives a name to an intermediate value. The name exists only for the lines after it:

```lean title=Receipt.lean
def receipt (price qty : Nat) : String :=
  let subtotal := price * qty
  let discount := if subtotal > 100 then 10 else 0
  let total := subtotal - discount
  s!"subtotal {subtotal}, discount {discount}, total {total}"

#eval receipt 30 4  -- "subtotal 120, discount 10, total 110"
```

Each `let` is followed by the rest of the function, which can use the new name. The **last line** is the result.

Like top-level definitions, a `let` can't be changed later. If you need a different value, give it a new name, or shadow it:

```lean
def shout (s : String) : String :=
  let s := s.trimAscii.toString
  let s := s.toUpper
  s ++ "!"

#eval shout "  hi  "  -- "HI!"
```

Each `let s` makes a **new** `s` that hides the old one. Nothing is modified.

## Local functions

A `let` can define a function, too:

```lean
def sumOfSquares (a b : Nat) : Nat :=
  let sq (n : Nat) := n * n
  sq a + sq b

#eval sumOfSquares 3 4  -- 25
```

## where

Alternatively, put helper definitions **after** the main expression with `where`. It reads like "the answer is this, where these are the parts":

```lean
def hypotenuse (a b : Float) : Float :=
  Float.sqrt (sq a + sq b)
where
  sq (x : Float) : Float := x * x
```

```compare python
subtotal = price * qty
total = subtotal - discount
```

```compare typescript
const subtotal = price * qty;
```

```compare kotlin
val subtotal = price * qty
```

```compare rust
let subtotal = price * qty;
```

```exercise
goal: "Give `w * h` a name: add `let area := w * h` and use `area` twice."
code: |
  def describe (w h : Nat) : String :=
    s!"area {w * h}, double {w * h * 2}"
checks:
  - match: 'let\s+area\s*:=\s*w\s*\*\s*h'
    message: "Add let area := w * h"
  - match: 's!"area \{area\}, double \{area \* 2\}"'
    message: "Use {area} and {area * 2} in the string."
solution: |
  def describe (w h : Nat) : String :=
    let area := w * h
    s!"area {area}, double {area * 2}"
```

```quiz
question: "What happens when you write `let x := 1` and later `let x := 2` in the same function?"
options:
  - "The first x changes to 2."
  - "A new x is created that hides the old one."
  - "It's an error."
answer: 1
explain: "This is shadowing. Values in Lean are never modified; the second let introduces a new name."
```
