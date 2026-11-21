---
title: Polymorphism
icon: "🧬"
branch: data
requires: [lists]
summary: Functions and types that work for any type, with implicit arguments.
---
A function like "the first item of a list" shouldn't care **what** the items are. Lean lets a function take a **type** as an argument:

```lean title=Poly.lean
def first (α : Type) (xs : List α) : Option α :=
  match xs with
  | [] => none
  | x :: _ => some x

#eval first Nat [1, 2, 3]          -- some 1
#eval first String ["a", "b"]      -- some "a"
```

`α` (alpha, typed `\a`) is a variable that stands for a type. Greek letters are the usual names, but any name works.

## Implicit arguments

Passing `Nat` every time is silly: Lean can see it from the list. Curly braces make an argument **implicit**, meaning Lean fills it in:

```lean
def first' {α : Type} (xs : List α) : Option α :=
  match xs with
  | [] => none
  | x :: _ => some x

#eval first' [1, 2, 3]       -- some 1
#eval first' ["a", "b"]      -- some "a"
```

That's how the standard library is written. Look at `List.map`:

```lean
#check @List.map
-- @List.map : {α : Type u} → {β : Type v} → (α → β) → List α → List β
```

`map` works for any `α` and `β`. You never write them, Lean works them out.

## Even shorter

You can leave out the `{α : Type}` entirely. Lean adds it for you when it sees an unknown lowercase Greek letter in the signature:

```lean
def swap (pair : α × β) : β × α := (pair.2, pair.1)

#eval swap (1, "one")  -- ("one", 1)
```

`α × β` is the type of pairs: one `α` and one `β`.

## Polymorphic types

Types take type arguments too. You've already seen `List Nat` and `Option String`. Your own structures can do the same:

```lean
structure Box (α : Type) where
  contents : α
```

```compare python
def first[T](xs: list[T]) -> T | None: ...
```

```compare typescript
function first<T>(xs: T[]): T | undefined { return xs[0]; }
```

```compare kotlin
fun <T> first(xs: List<T>): T? = xs.firstOrNull()
```

```compare rust
fn first<T>(xs: &[T]) -> Option<&T> { xs.first() }
```

```exercise
goal: "Make `α` implicit: change `(α : Type)` to `{α : Type}`."
code: |
  def duplicate (α : Type) (x : α) : List α := [x, x]

  #eval duplicate "hi"
checks:
  - match: 'def\s+duplicate\s*\{\s*α\s*:\s*Type\s*\}'
    message: "Write {α : Type} with curly braces."
solution: |
  def duplicate {α : Type} (x : α) : List α := [x, x]

  #eval duplicate "hi"
```

```quiz
question: "What do curly braces around an argument mean, like `{α : Type}`?"
options:
  - "The argument is optional and defaults to Nat."
  - "Lean fills in the argument itself, from the other arguments."
  - "The argument is a structure."
answer: 1
explain: "Implicit arguments are inferred by Lean, usually from the types of the explicit arguments."
```
