---
title: Case analysis
icon: "🗂️"
branch: tactics
requires: [tactics, and-or]
summary: Split a proof into one case per constructor.
---
When a value could be one of several shapes, a proof often needs to handle each separately. The `cases` tactic does that, one goal per constructor:

```lean title=Cases.lean
theorem or_swap (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hp => exact Or.inr hp
  | inr hq => exact Or.inl hq
```

That's exactly `match`, as a tactic. It works on any inductive type:

```lean
theorem bool_cases (b : Bool) : b = true ∨ b = false := by
  cases b with
  | true => left; rfl
  | false => right; rfl
```

`;` lets you put two tactics on one line.

## Splitting numbers

On `Nat`, `cases n` gives two cases: `zero` and `succ m` (that is, `n = m + 1`):

```lean
def isZero : Nat → Bool
  | 0 => true
  | _ + 1 => false

theorem isZero_or (n : Nat) : isZero n = true ∨ n > 0 := by
  cases n with
  | zero => left; rfl
  | succ m => right; omega
```

## Other ways to split

| Tactic | Splits on |
| --- | --- |
| `cases h` | the constructors of `h`'s type |
| `rcases h with ⟨a, ⟨b, c⟩⟩` | a nested pattern, in one go |
| `obtain ⟨x, hx⟩ := h` | one pattern (no alternatives) |
| `by_cases h : P` | whether `P` is true or false |
| `split` | the branches of an `if` or `match` in the goal |

```lean
theorem abs_ok (n : Int) : (if n < 0 then -n else n) ≥ 0 := by
  split <;> omega
```

`t1 <;> t2` runs `t2` on every goal `t1` produces.

```compare python
match shape:
    case Circle(r): ...
    case Square(s): ...
```

```compare typescript
switch (shape.kind) { case "circle": ...; case "square": ... }
```

```compare kotlin
when (shape) { is Circle -> ...; is Square -> ... }
```

```compare rust
match shape { Shape::Circle(r) => ..., Shape::Square(s) => ... }
```

```exercise
goal: "The `inr` case is missing. Add `| inr hq => exact Or.inl hq`."
code: |
  theorem or_comm' (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
    cases h with
    | inl hp => exact Or.inr hp
checks:
  - match: '\|\s*inr\s+hq\s*=>\s*exact\s+Or\.inl\s+hq'
    message: "Add | inr hq => exact Or.inl hq"
solution: |
  theorem or_comm' (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
    cases h with
    | inl hp => exact Or.inr hp
    | inr hq => exact Or.inl hq
```

```quiz
question: "How many goals does `cases b` create when `b : Bool`?"
options:
  - "One"
  - "Two"
  - "None"
answer: 1
explain: "Bool has two constructors, true and false, so there's one case for each."
```
