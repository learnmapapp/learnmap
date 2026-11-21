---
title: Dependent types
icon: "🧬"
branch: data
requires: [inductive, polymorphism]
summary: Types that depend on values, like a list of exactly n items.
---
In most languages, types and values live in separate worlds. In Lean, a type can **depend on a value**. That's a [[dependent type]].

The classic example is a list that carries its length in its type:

```lean title=Vec.lean
inductive Vec (α : Type) : Nat → Type where
  | nil : Vec α 0
  | cons : α → Vec α n → Vec α (n + 1)

def v3 : Vec String 3 := .cons "a" (.cons "b" (.cons "c" .nil))
```

`Vec String 3` and `Vec String 4` are **different types**. A wrong length is a type error, caught before the program runs:

```lean
def bad : Vec String 3 := .cons "a" .nil   -- error: expected length 3, got 1
```

## Functions that can't fail

Because the length is known, `head` only accepts non-empty vectors. No `Option` needed, and no crash possible:

```lean
def Vec.head : Vec α (n + 1) → α
  | .cons x _ => x

#eval v3.head  -- "a"
-- Vec.head Vec.nil is a type error: 0 is not n + 1
```

Lean knows the `nil` case can't happen, so you don't write it.

Types can even describe results precisely. Appending adds the lengths:

```lean
def Vec.append : Vec α m → Vec α n → Vec α (n + m)
  | .nil, ys => ys
  | .cons x xs, ys => .cons x (xs.append ys)
```

## Fin

`Fin n` is the type of numbers **below** `n`: a value together with a proof that it's in range. It's how arrays are indexed safely:

```lean
def colors : Array String := #["red", "green", "blue"]

def pick (i : Fin 3) : String := #["red", "green", "blue"][i]

#eval pick 2         -- "blue"
#check (5 : Fin 3)   -- numerals wrap around: this is 2
```

`(⟨1, by decide⟩ : Fin 3)` builds one explicitly: the number 1, and a proof that `1 < 3`.

## Why it matters

Dependent types are what make Lean a theorem prover: `∀ n, P n` is a function whose **result type** depends on the input `n`. Propositions are types that depend on values.

```compare typescript
// tuples have fixed lengths, but they can't depend on a runtime value
type Three = [string, string, string];
```

```compare kotlin
// no equivalent; lengths are runtime properties
```

```compare rust
let a: [String; 3] = ["a".into(), "b".into(), "c".into()]; // const generics, a limited form
```

```compare python
# no equivalent
```

```exercise
goal: "Change the type so this is a vector of two strings: `Vec String 2`."
code: |
  inductive Vec (α : Type) : Nat → Type where
    | nil : Vec α 0
    | cons : α → Vec α n → Vec α (n + 1)

  def pair : Vec String 3 := .cons "x" (.cons "y" .nil)
checks:
  - match: 'def\s+pair\s*:\s*Vec\s+String\s+2'
    message: "Write def pair : Vec String 2"
solution: |
  inductive Vec (α : Type) : Nat → Type where
    | nil : Vec α 0
    | cons : α → Vec α n → Vec α (n + 1)

  def pair : Vec String 2 := .cons "x" (.cons "y" .nil)
```

```quiz
question: "Why doesn't `Vec.head` need a case for `nil`?"
options:
  - "Because it returns a default value."
  - "Because its type requires length n + 1, which nil can never have."
  - "Because nil is not a constructor."
answer: 1
explain: "nil has length 0, and 0 never equals n + 1, so Lean knows the case is impossible."
```
