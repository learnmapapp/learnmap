---
title: Inductive types
icon: "🌳"
kind: hub
branch: data
requires: [structures]
summary: Define a type by listing every way to build its values.
---
An [[inductive type]] is defined by its **constructors**: the different ways to make a value of that type. The simplest kind just lists the options:

```lean title=Colors.lean
inductive Color where
  | red
  | green
  | blue
deriving Repr

#eval Color.red  -- Color.red
#check Color.green  -- Color.green : Color
```

A `Color` is always exactly one of those three. Nothing else is a `Color`.

## Constructors with data

A [[constructor]] can carry values. Here, a shape is either a circle with a radius, or a rectangle with a width and height:

```lean
inductive Shape where
  | circle (radius : Float)
  | rect (width height : Float)
deriving Repr

def wheel : Shape := Shape.circle 1.5
def door : Shape := .rect 0.9 2.1  -- the leading dot means "Shape."
```

When Lean knows the expected type, you can write `.rect` instead of `Shape.rect`.

## Recursive types

A constructor can contain the type being defined. That's where the word "inductive" comes from, and it's how lists and trees are built:

```lean
inductive Tree where
  | leaf
  | node (left : Tree) (value : Nat) (right : Tree)

def small : Tree := .node .leaf 5 (.node .leaf 8 .leaf)
```

Even familiar types are defined this way. `Bool` is `inductive Bool | false | true`, and `Nat` is defined like this (inside a namespace, so it doesn't clash with the real `Nat`):

```lean
namespace Example

inductive Nat where
  | zero
  | succ (n : Nat)  -- "the successor of n", that is, n + 1

end Example
```

So `3` is really `succ (succ (succ zero))`. Lean stores numbers efficiently, but for proofs, this definition is what counts.

To **use** a value of an inductive type, you take it apart with [pattern matching](node:pattern-matching).

```compare typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };
```

```compare kotlin
sealed interface Shape {
    data class Circle(val radius: Double) : Shape
    data class Rect(val width: Double, val height: Double) : Shape
}
```

```compare rust
enum Shape { Circle { radius: f64 }, Rect { width: f64, height: f64 } }
```

```compare python
Shape = Circle | Rect   # two dataclasses and a union type
```

```exercise
goal: "Define an inductive type `Size` with three constructors: `small`, `medium` and `large`."
code: |
  inductive Size where
checks:
  - match: '\|\s*small\s*\n\s*\|\s*medium\s*\n\s*\|\s*large'
    message: "List | small, | medium and | large on separate lines."
solution: |
  inductive Size where
    | small
    | medium
    | large
```

```quiz
question: "How many different values does `inductive Color | red | green | blue` have?"
options:
  - "Three."
  - "As many as you like."
  - "One, with three fields."
answer: 0
explain: "Each constructor without data is one value, and these are the only ways to build a Color."
```
